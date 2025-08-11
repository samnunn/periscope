import { getAnyInputValue, setAnyInputValue } from '/app/static/js/utils.js'

//    _   _ _     _             _                                                  
//   | | | (_)___| |_ ___  _ __(_) __ _ _ __                                       
//   | |_| | / __| __/ _ \| '__| |/ _` | '_ \                                      
//   |  _  | \__ \ || (_) | |  | | (_| | | | |                                     
//   |_| |_|_|___/\__\___/|_|  |_|\__,_|_| |_|                                     

export let diagnosisList = document.querySelector('#diagnosis-list')
let diagnosisSearchBox = document.querySelector('#diagnosis-search input')
let diagnosisSearchResultsList = document.querySelector('#diagnosis-results ul')

// UTILS
function escapeHTML(html) {
    // https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
    // https://stackoverflow.com/a/55081825
    return new Option(html).innerHTML
}

// Create custom element
customElements.define('clinic-diagnosis', class extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        // do not proceed if element has already been populated
        // when the drag and drop logic moves an element, insertBefore() is called
        // annoyingly, connectedCallback() also gets called
        // we don't want it to double-populate (or over-write) the element
        // if (this.getAttribute('clinic-parameter')) return

        // set diagnosis title
        this.querySelector('input.diagnosis-title').value = this.dataset.diagnosisDefaultName || ''

        // populate with stored data

        // call addedCallback()
        try {
            let callback = new Function('inputData', this.dataset.diagnosisAddedCallback)
            callback(document.persistentDataProxy)
        } catch (e) {
            console.error(`Failed to execute diagnosis-added-callback for ${this.dataset.diagnosisId}:\n`, e)
        }

        // Populate stored values
        let storedData = document.persistentDataProxy[this.dataset.diagnosisId]
        if (storedData) {
            for (let key in storedData) {
                let targetInput = this.querySelector(`[diagnosis-parameter="${key}"]`)
                if (!targetInput) continue

                targetInput.value = storedData[key]
            }
        } else {
            console.error(`Attempted to re-populate diagnosis with id "${this.dataset.diagnosisId}" but underlying data was not found in persistentDataProxy`)
        }

        // save to localstorage (now and on future input events)
        this.dispatchEvent(new Event('clinic:user-input', { bubbles: true }))
        this.addEventListener('input', (e) => {
            this.dispatchEvent(new Event('clinic:user-input', { bubbles: true }))
        })
    }

    unfocus() {
        setFocusedDiagnosis(null)
    }

    renderText() {
        // return text
        let data = this.serialise()
        let output = ""

        // get name
        output += `1. ${data['name']}`

        // delete surplus keys
        delete data['name']
        delete data['id']

        // add regular details
        for (let key in data) {
            if (key == 'other-details') continue

            // skip blank lines
            let value = data[key]
            if (`${value}`.length == 0) continue

            // append to output
            output = output + `\n    - ${key}: ${value}`
        }

        // add in <clinic-input> elements
        // TODO: eliminate the need for this hack
        for (let input of this.querySelectorAll('clinic-input')) {
            try {
                let pre = input?.data?.pretty_name
                let post = document.persistentDataProxy[input.dataset.clinicParameter]
                output = output + `\n    - ${pre}: ${post}`
            } catch (e) {
                console.error(`Failed to render text for <clinic-input> embedded in <clinic-diagnosis>`, e)
            }

        }

        // add in other details
        if (data['other-details']) {
            let otherDetails = data['other-details']
                .split('\n')
                .map((l) => '\t' + l)
                .join('\n')
            output += `\n${otherDetails}`
        }

        return output
    }

    serialise() {
        let dataDump = {
            id: this.dataset.diagnosisId,
        }
        for (let input of this.querySelectorAll('[diagnosis-parameter]')) {
            let attr = input.getAttribute('diagnosis-parameter')
            dataDump[attr] = getAnyInputValue(input)
        }
        return dataDump
    }

    delete() {
        // confirm with user
        let answer = confirm(`Delete "${this.serialise()['name']}"?`)
        if (!answer) return

        // call removedCallback()
        try {
            let callback = new Function('inputData', this.dataset.diagnosisRemovedCallback)
            callback(document.persistentDataProxy)
        } catch (e) {
            console.warn(`Failed to execute diagnosis-removed-callback for ${this.dataset.diagnosisId}:\n`, e)
        }

        // delete from document.persistentDataProxy (which will trigger Beagle to re-evaulate too)
        // todo: change this to a proper clinic:diagnosis-deleted event
        delete document.persistentDataProxy[this.dataset.diagnosisId]

        let nextDiagnosis = this?.nextElementSibling
        let prevDiagnosis = this?.previousElementSibling

        // move focus
        if (nextDiagnosis?.matches('clinic-diagnosis')) {
            // Plan A: focus next sibling
            setFocusedDiagnosis(nextDiagnosis, true)
        } else if (prevDiagnosis?.matches('clinic-diagnosis')) {
            // Plan B: focus previous sibling
            setFocusedDiagnosis(prevDiagnosis, true)
        } else {
            // Plan C: focus search box
            diagnosisSearchBox.focus()
        }

        // actual removal
        this.remove()
    }

    disconnectedCallback() {
        diagnosisList.dispatchEvent(new Event('clinic:draglist-reorder', { bubbles: true }))
    }
})

export function insertClinicDiagnosis(data, target, focus = true) {
    let template = document.querySelector(`template#${data["id"]}`)
    let customName
    if (!template) {
        template = document.querySelector("template#diagnosis-blank")
        customName = data["name"]
    }
    let newDiagnosisNode = template.content.cloneNode(true)

    // Set a unique transition ID
    // Each one needs its own unique ID so they can transition independently
    newDiagnosisNode.style = `view-transition-name: ${data["id"]};`
    newDiagnosisNode.querySelector("clinic-diagnosis").setAttribute("data-diagnosis-id", data["id"])

    // handle custom-named diagnoses
    if (customName) {
        newDiagnosisNode.querySelector("clinic-diagnosis").setAttribute("data-diagnosis-default-name", data["name"])
    }

    // Create new diagnosis markup with data from target <li>
    target.prepend(newDiagnosisNode)
    let newDiagnosisElement = diagnosisList.querySelector("clinic-diagnosis")

    if (focus == true) {
        // Open it and set focus on the first non-title input element (be it a textarea or an input)
        setFocusedDiagnosis(newDiagnosisElement, true)
    }

    return newDiagnosisElement
}

// Handle expansion/shrinking of each diagnosis
function setFocusedDiagnosis(target, focusfirstelement = false) {
    // unfocus all
    for (let t of diagnosisList.querySelectorAll('clinic-diagnosis')) {
        t.removeAttribute('aria-selected')
    }
    // focus target
    if (target) {
        target.setAttribute('aria-selected', true)
    }

    if (focusfirstelement) {
        setTimeout(() => { target.querySelector('select, textarea, input:not(.diagnosis-title)').focus() }, 0)
    }
}

document.addEventListener('focusin', (e) => {
    let targetDiagnosis = e.target.closest('clinic-diagnosis')
    setFocusedDiagnosis(targetDiagnosis)
})

// ESCAPE to go back to search
diagnosisList?.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        diagnosisSearchBox.focus()
    }
    if (e.key == "Backspace" && (e.metaKey || e.altKey)) {
        document.querySelector('clinic-diagnosis:focus-within')?.delete()
    }
})

// SEARCH RESULTS
function insertSearchResult(target, data) {

    let newResult = document.createElement('li')
    newResult.innerHTML = `<span>${data['name']}</span><button tabindex="-1">Add</button></li>`
    newResult.data = data
    newResult.onmousedown = (e) => {
        e.preventDefault() // don't steal focus
        let containingResultsList = e.target.closest('clinic-navigable-list')
        if (containingResultsList) {
            containingResultsList.setSelectedElement(e.target)
        }
    }
    newResult.onclick = (e) => {
        // insert new diagnosis
        // or focus existing version
        let existingDiagnosis = document.querySelector(`[data-diagnosis-id="${data['id']}"]`)
        if (existingDiagnosis) {
            setFocusedDiagnosis(existingDiagnosis, true)
        } else {
            // add diagnosis
            insertClinicDiagnosis(data, diagnosisList, true)

            // dispatch drag event
            diagnosisList.parentElement.dispatchEvent(new Event('clinic:draglist-reorder', { bubbles: true }))
        }
        // clear search
        diagnosisSearchBox.value = ''
    }
    target.insertAdjacentElement("beforeend", newResult)
}

// diagnosis search setup
window.addEventListener("DOMContentLoaded", (e) => {
    let allDiagnosisTemplates = document.querySelectorAll("div#diagnosis-templates template")
    let allDiagnosisInformation = []
    for (let t of allDiagnosisTemplates) {
        let content = t.content.querySelector("clinic-diagnosis")
        let data = {
            "id": content.dataset.diagnosisId,
            "name": content.dataset.diagnosisDefaultName,
            "search_keywords": content.dataset.diagnosisSearchKeywords,
        }
        allDiagnosisInformation.push(data)
    }
    window.allDiagnosisInformation = allDiagnosisInformation
})

diagnosisSearchBox?.addEventListener('input', (e) => {
    // Find matches with fuzzysort
    let searchString = e.target.value.trim()
    let results = fuzzysort.go(searchString, window.allDiagnosisInformation, {
        threshold: 0,
        limit: 4,
        all: false,
        key: "search_keywords",
    })

    // Clear stale results list
    diagnosisSearchResultsList.innerHTML = ''

    // Post new results list
    for (let r of results) {
        // send a shallow copy of the object
        // prevents ['id] from being mutated by insertSearchResults()
        // as much as rust is a pain, at least passing references vs copies is obvious
        console.log()
        insertSearchResult(diagnosisSearchResultsList, { ...r.obj })
    }
    // Post unedited query string as the last option
    if (searchString.length > 0) {
        insertSearchResult(diagnosisSearchResultsList, { name: escapeHTML(searchString), id: `diagnosis-user-defined-${Math.floor(Math.random() * 1000000000)}` })
    }

    // Mark first result as "selected"
    diagnosisSearchResultsList?.firstElementChild?.setAttribute('aria-selected', 'true')
})

diagnosisSearchBox?.addEventListener('focusout', (e) => {
    diagnosisSearchResultsList.innerHTML = ''
    diagnosisSearchBox.value = ''

})

diagnosisSearchBox?.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        if (diagnosisSearchBox.value.length == 0) {
            diagnosisSearchBox.blur()
        }
        e.target.value = ''
        // TODO: when naviable-list is a proper component, this should be a custom event handler (that resets input and deletes results, without calling a no-op search!)
        e.target.dispatchEvent(new Event('input'))
    }
})
