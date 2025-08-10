import { boneData } from "/app/static/data/beagle-data.js"
import { runRuleSafely } from "/app/static/js/beagle-utils.js"

//    ____                   _                                                     
//   | __ )  ___  __ _  __ _| | ___     ***           ****                         
//   |  _ \ / _ \/ _` |/ _` | |/ _ \   *   ***********    *                        
//   | |_) |  __/ (_| | (_| | |  __/   ***               *                         
//   |____/ \___|\__,_|\__, |_|\___|  *    ***********    *                        
//                     |___/           ****           ****                         

let staleBones = {}

onmessage = (m) => {
    // console.info(`beagle-message-received`, m)
    let newBones = getBones(m.data.inputData)

    // update bones
    let newBoneIDs = new Set(Object.keys(newBones))
    let staleBoneIDs = new Set(Object.keys(staleBones))
    let boneIDsToAdd = newBoneIDs.difference(staleBoneIDs)
    let boneIDsToDelete = staleBoneIDs.difference(newBoneIDs)
    let boneIDsToUpdate = [...staleBoneIDs.intersection(newBoneIDs)]
    boneIDsToUpdate = boneIDsToUpdate.filter((b) => staleBones[b].name != newBones[b].name)

    // console.info('bonesToAdd', bonesToAdd)
    // console.info('bonesToDelete', bonesToDelete)
    // console.info('bonesToUpdate', bonesToUpdate)

    // ADD BONES
    for (let b of boneIDsToAdd) {
        postMessage({
            type: 'beagle-bone-add',
            name: newBones[b].name,
            id: newBones[b].id,
            citation: newBones[b].citation,
            auto_hide: newBones[b].auto_hide,
        })
    }
    // DELETE BONES
    for (let b of boneIDsToDelete) {
        postMessage({
            type: 'beagle-bone-delete',
            id: staleBones[b].id,
            name: staleBones[b].name,
        })
    }
    // UPDATE BONES
    for (let b of boneIDsToUpdate) {
        postMessage({
            type: 'beagle-bone-update',
            id: newBones[b].id,
            name: newBones[b].name,
        })
    }


    // ADD/DELETE SUGGESTIONS
    for (let bone_id in newBones) {
        let nb = newBones[bone_id]

        let staleSuggestions = staleBones[bone_id]?.suggestions || new Set()
        let freshSuggestions = nb?.suggestions || new Set()
        let suggestionsToDelete = staleSuggestions.difference(nb?.suggestions)
        let suggestionsToAdd = freshSuggestions.difference(staleSuggestions)

        // if (bone_id == "beagle-t2dm") {
        //     console.log("stale", staleSuggestions)
        //     console.log("fresh", freshSuggestions)
        //     console.log("add", suggestionsToAdd)
        //     console.log("delete", suggestionsToDelete)
        //     // debugger
        // }

        // ADD SUGGESTIONS
        for (let s of suggestionsToAdd) {
            postMessage({
                type: 'beagle-suggestion-add',
                bone: nb.id,
                suggestion: s.name,
                citation: s.citation,
            })
        }

        // DELETE SUGGESTIONS
        for (let s of suggestionsToDelete) {
            postMessage({
                type: 'beagle-suggestion-delete',
                bone: nb.id,
                suggestion: s.name,
            })
        }
    }

    // save state
    staleBones = newBones
}

// takes data, returns bones
function getBones(inputData) {
    let newBones = {}
    for (let b of bones) {
        let boneDoesMatch = b.test(inputData)
        if (boneDoesMatch == true) {
            let conditionalSuggestions = b.getConditionalSuggestions(inputData)
            let allSuggestions = b.defaultSuggestions.concat(conditionalSuggestions)
            let name
            name = b.static_name
            if (b.dynamic_name) try {
                name = b.dynamic_name(inputData)
            } catch (e) {
                console.debug(`Failed to execute dynamic_name for "${b.id}". Falling back to static_name.`, e)
            }

            let foundBone = {
                name: name,
                id: b.id,
                citation: b.citation,
                suggestions: new Set(allSuggestions),
                auto_hide: b.auto_hide,
            }
            newBones[b.id] = foundBone
        }
    }
    return newBones
}

class Bone {
    constructor(dynamic_name, static_name, id, auto_hide, matchStrategy, matchRules, defaultSuggestions, conditionalSuggestions, severityGrades) {
        this.dynamic_name = dynamic_name
        this.static_name = static_name
        this.id = id
        this.auto_hide = auto_hide == true
        this.matchStrategy = matchStrategy
        this.matchRules = matchRules
        this.defaultSuggestions = defaultSuggestions
        this.conditionalSuggestions = conditionalSuggestions
        this.severityGrades = severityGrades
    }

    test(inputData) {
        if (this.matchStrategy == "all") {
            if (this.matchRules.every((r) => runRuleSafely(r, inputData))) return true
        } else {
            if (this.matchRules.some((r) => runRuleSafely(r, inputData))) return true
        }
        return false
    }

    getSeverity(inputData) {
        if (!this.severityGrades) return null

        for (let severityGrade of this.severityGrades) {
            if (severityGrade?.matchStrategy == "all") {
                if (severityGrade.matchRules.every((r) => runRuleSafely(r, inputData))) return severityGrade.name
            } else {
                if (severityGrade.matchRules.some((r) => runRuleSafely(r, inputData))) return severityGrade.name
            }
        }
        return null
    }

    getConditionalSuggestions(inputData) {
        let conditionalSuggestions = []
        for (let conditionalGroup of this.conditionalSuggestions) {
            if (conditionalGroup?.matchStrategy == "all") {
                if (conditionalGroup.matchRules.every((r) => runRuleSafely(r, inputData))) {
                    conditionalSuggestions = conditionalSuggestions.concat(conditionalGroup.suggestions)
                }
            } else {
                if (conditionalGroup.matchRules.some((r) => runRuleSafely(r, inputData))) {
                    conditionalSuggestions = conditionalSuggestions.concat(conditionalGroup.suggestions)
                }
            }
        }
        return conditionalSuggestions
    }
}

let bones = []
for (let b of boneData) {
    // provide default empty array from non-essential items
    bones.push(new Bone(
        b.dynamic_name,
        b.static_name,
        b.id,
        b.auto_hide,
        b.matchStrategy,
        b.matchRules,
        b.defaultSuggestions || [],
        b.conditionalSuggestions || [],
        b.severityGrades || []
    ))
}