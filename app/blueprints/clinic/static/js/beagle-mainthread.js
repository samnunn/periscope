//    ____                   _                                                     
//   | __ )  ___  __ _  __ _| | ___     ***           ****                         
//   |  _ \ / _ \/ _` |/ _` | |/ _ \   *   ***********    *                        
//   | |_) |  __/ (_| | (_| | |  __/   ***               *                         
//   |____/ \___|\__,_|\__, |_|\___|  *    ***********    *                        
//                     |___/           ****           ****                         

document.beagle = new Worker(new URL('/app/static/js/beagle-worker.js', import.meta.url), { type: "module" })
let boneList = document.querySelector('#warnings')
let planInput = document.querySelector('[data-clinic-parameter="plan"]')
let boneInput = document.querySelector('[data-clinic-parameter="issues"]')

document.beagle.addEventListener('message', (m) => {
    // console.info(m.data['type'], m.data)

    // add bones
    if (m.data['type'] == 'beagle-bone-add') {
        let issuePillContainer = document.createElement('ul')
        issuePillContainer.classList.add('pill-list')
        issuePillContainer.setAttribute('beagle-bone-id', m.data.id)

        if (m.data.auto_hide == true) {
            issuePillContainer.classList.add('auto_hide')
        }

        let issuePill = document.createElement('li')
        issuePill.classList.add('issue-pill')
        if (m.data.id == "beagle-anonymous") {
            issuePill.innerHTML = `<span>${m.data.name}</span>`
        } else {
            issuePill.innerHTML = `<span>${m.data.name}</span><button tabindex="1">Add</button>`
            issuePill.addEventListener('click', (e) => {
                e.target.closest('li').classList.add('added')
                let label = document.querySelector(`[beagle-bone-id="${m.data.id}"] > li.issue-pill > span`)
                let oldValue = document.persistentDataProxy['issues'] || ''
                let newValue = oldValue == "" ? `- ${label.innerText}` : `${oldValue}\n- ${label.innerText}`
                document.persistentDataProxy['issues'] = newValue
            })
        }

        // add issue pill to container
        issuePillContainer.appendChild(issuePill)

        // insert nested list too
        issuePillContainer.insertAdjacentHTML('beforeend', '<ul class="pill-list"></ul>')

        // add container to boneList
        boneList.insertAdjacentElement("afterbegin", issuePillContainer)
    }

    // update bones
    if (m.data['type'] == 'beagle-bone-update') {
        let staleBone = document.querySelector(`[beagle-bone-id="${m.data.id}"] > li.issue-pill > span`)
        staleBone.innerText = m.data.name
    }

    // delete bones
    if (m.data['type'] == 'beagle-bone-delete') {
        let staleBone = document.querySelector(`[beagle-bone-id="${m.data.id}"]`)
        staleBone?.remove()
    }

    // add suggestions
    if (m.data['type'] == 'beagle-suggestion-add') {
        let targetList = document.querySelector(`ul[beagle-bone-id="${m.data.bone}"]`)?.querySelector('ul')
        let toAdd = document.createElement('li')
        toAdd.setAttribute('beagle-suggestion-name', m.data.suggestion)
        toAdd.setAttribute('clinic-text', m.data.suggestion)
        let modalButton = ''
        if (m.data.citation) {
            toAdd.setAttribute('citation-id', m.data.citation)
            modalButton = `
                <clinic-modal-popup>
                    <button class="infobutton"></button>
                    <template>
                        <clinic-citation-snippet citation-id="${m.data.citation || 'wow'}"></clinic-citation-snippet>
                    </template>
                </clinic-modal-popup>
            `
        }
        toAdd.innerHTML = `
            <span>
                ${m.data.suggestion}
                ${modalButton}
            </span>
            <button tabindex="1">Add</button>
        `
        toAdd.addEventListener('click', (e) => {
            let li = e.target.closest('li')
            li.classList.add('added')
            let citationId = li.getAttribute('citation-id')
            if (citationId) {
                // add citation but deduplicate
                let oldCitations = new Set(document.persistentDataProxy['citations'] || [])
                oldCitations.add(citationId)
                document.persistentDataProxy['citations'] = [...oldCitations]
            }
            let oldPlanValue = document.persistentDataProxy['plan'] || ""
            let newPlanValue = oldPlanValue == "" ? `- ${m.data.suggestion}` : `${oldPlanValue}\n- ${m.data.suggestion}`
            document.persistentDataProxy['plan'] = newPlanValue
        })
        targetList.appendChild(toAdd)
    }

    // delete suggestions
    if (m.data['type'] == 'beagle-suggestion-delete') {
        let staleSuggestion = document.querySelector(`[beagle-suggestion-name="${m.data.suggestion}"]`)
        staleSuggestion?.remove()
    }
})

