import { getAnyInputValue, setAnyInputValue } from '/static/js/utils.js'

//    _   _ _     _             _                                                  
//   | | | (_)___| |_ ___  _ __(_) __ _ _ __                                       
//   | |_| | / __| __/ _ \| '__| |/ _` | '_ \                                      
//   |  _  | \__ \ || (_) | |  | | (_| | | | |                                     
//   |_| |_|_|___/\__\___/|_|  |_|\__,_|_| |_|                                     
                                                  
export let diagnosisList = document.querySelector('#diagnosis-list')
let diagnosisSearchBox = document.querySelector('#diagnosis-search input')
let diagnosisSearchResultsList = document.querySelector('#diagnosis-results ul')
import { allDiagnoses } from '/static/data/diagnosis-data.js'

// UTILS
function escapeHTML(html) {
    // https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
    // https://stackoverflow.com/a/55081825
    return new Option(html).innerHTML
}

// Create custom element
customElements.define('clinic-diagnosis', class extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback() {
        // do not proceed if element has already been populated
        // when insertBefore() is called, connectedCallback() also gets called
        // this happens when the drag and drop logic moves an element
        // we don't want it to double-populate (or over-write) the element
        if (this.getAttribute('clinic-parameter')) return

        // set clinic-parameter so it'll be able to sync
        this.setAttribute('clinic-parameter', this.data['id'])

        // so that persistentDataProxy knows what key to use
        // it's expecting .ugly_name() because that's what <clinic-input> elements use
        this.ugly_name = this.data['id']

        // set innerHTML to boilerplate + custom template
        this.innerHTML = `
            <div class="clinic-diagnosis-top">
                <span class="draghandle"></span>
                <label>
                    <input type="text" class="diagnosis-title" diagnosis-parameter="name" value="">
                </label>
                <button class="clinic-diagnosis-edit" tabindex="3">Edit</button>
                <button class="clinic-diagnosis-close" tabindex="3" onclick="this.closest('clinic-diagnosis').unfocus()">Close</button>
            </div>
            <div class="clinic-diagnosis-body vstack">
                ${this.data['html'] || ''}
                <label>
                    Details
                    <textarea type="text" class="bigbox short" diagnosis-parameter="other-details"></textarea>
                </label>
            </div>
            <div class="clinic-diagnosis-bottom">
                <button onclick="this.closest('clinic-diagnosis')?.delete()">Delete</button>
            </div>
        `
        // set value post-hoc
        // this enables quotes in the diagnosis name to be auto-escaped
        this.querySelector('input.diagnosis-title').value = this.data['name'] || ''

        // populate data if available
        for (let key in this.data) {
            // check for a target
            let targetElement = this.querySelector(`.clinic-diagnosis-body [diagnosis-parameter="${key}"]`)

            // abort if none is found
            if (!targetElement) continue

            // attempt to re-insert it
            setAnyInputValue(targetElement, this.data[key])
        }

        // TODO: change this to a proper "clinic:diagnosis-added" event handler
        // this.dispatchEvent(new Event('clinic:user-input', {bubbles: true}))

        // save to localstorage
        this.addEventListener('input', (e) => {
            this.dispatchEvent(new Event('clinic:user-input', {bubbles: true}))
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
        output += `- ${data['name']}`

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
            output = output + `\n      - ${key}: ${value}`
        }

        // add in other details
        if (data['other-details']) {
            let otherDetails = data['other-details']
                .split('\n')
                .map((l) => '      ' + l)
                .join('\n')
            output += `\n${otherDetails}`
        }

        return output
    }

    serialise() {
        let dataDump = {
            id: this.getAttribute('clinic-parameter'),
        }
        for (let input of this.querySelectorAll('[diagnosis-parameter]')) {
            let attr = input.getAttribute('diagnosis-parameter')
            dataDump[attr] = getAnyInputValue(input)
        }
        return dataDump
    }

    delete() {
        let answer = confirm(`Delete "${this.serialise()['name']}"?`)
        if (answer) {
            // run removedCallback
            try {
                if (this.data.removedCallback) this.data.removedCallback(document.persistentDataProxy)
            } catch (err) {
                console.error(`Attempted to call removedCallback() on diagnosis with id "${this.data.id}" and failed`, err)
            }

            // delete from document.persistentDataProxy (which will trigger Beagle to re-evaulate too)
            // todo: change this to a proper clinic:diagnosis-deleted event
            delete document.persistentDataProxy[this.getAttribute('clinic-parameter')]

            let nextDiagnosis = this?.nextElementSibling
            let prevDiagnosis = this?.previousElementSibling

            // actual removal
            this.remove()

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

        }
    }

    disconnectedCallback() {
        diagnosisList.dispatchEvent(new Event('clinic:draglist-reorder', {bubbles: true}))
    }
})

export function insertClinicDiagnosis(data, target, position, focus=true) {
    // Create element
    let newDiagnosisElement = document.createElement('clinic-diagnosis')

    // Add data
    newDiagnosisElement.data = data

    // Create new diagnosis markup with data from target <li>
    target.insertAdjacentElement(position, newDiagnosisElement)

    // Set a unique transition ID
    // Each one needs its own unique ID so they can transition independently
    newDiagnosisElement.style = `view-transition-name: ${data.id};`

    // Populate synced values
    let syncedInputs = newDiagnosisElement.querySelectorAll('[clinic-parameter]')
    for (let i of syncedInputs) {
        // Get the parameter name from the 'clinic-parameter' attribute
        let parameterName = i.getAttribute('clinic-parameter')        
        // Retrieve the corresponding value from the document.persistentDataProxy
        let syncValue = document.persistentDataProxy[parameterName]
        // If no value is found, skip to the next input
        if (!syncValue) continue
        // Set the input value using the retrieved sync value
        setAnyInputValue(i, syncValue)
    }

    if (focus == true) {
        // Open it and set focus on the first non-title input element (be it a textarea or an input)
        setFocusedDiagnosis(newDiagnosisElement, true)
    }

    return newDiagnosisElement
}

// Handle expansion/shrinking of each diagnosis
function setFocusedDiagnosis(target, focusfirstelement=false) {
    // unfocus all
    for (let t of diagnosisList.querySelectorAll('clinic-diagnosis')) {
        t.removeAttribute('aria-selected')
    }
    // focus target
    if (target) {
        target.setAttribute('aria-selected', true)
        // if (!target.matches(':has(*:not(button):focus)')) {
        //     setTimeout(() => { target.querySelector('select, textarea, input:not(.diagnosis-title)').focus() }, 0)
        // }
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
diagnosisList.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        diagnosisSearchBox.focus()
    }
    if (e.key == "Backspace" && (e.metaKey || e.altKey)) {
        document.querySelector('clinic-diagnosis:focus-within')?.delete()
    }
})

// SEARCH RESULTS
function insertSearchResult(target, data) {
    // make id unique
    data['id'] = data['id']

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
        let existingDiagnosis = document.querySelector(`[clinic-parameter="${data['id']}"]`)
        if (existingDiagnosis) {
            setFocusedDiagnosis(existingDiagnosis, true)
        } else {
            // add diagnosis
            let dxElement = insertClinicDiagnosis(data, diagnosisList, "afterbegin", true)
            // TODO: should this be intrinsic to calling insertClinicDiagnosis? should there be a wrapper called insertNewClinicDiagnosis?
            dxElement.dispatchEvent(new Event('clinic:user-input', {bubbles: true}))
            
            // run callback
            try {
                if (data.addedCallback) data.addedCallback(document.persistentDataProxy)
            } catch (err) {
                console.error(`Attempted to call addedCallback() on diagnosis with id "${data.id}" and failed`, err)
            }

            // dispatch drag event
            diagnosisList.parentElement.dispatchEvent(new Event('clinic:draglist-reorder', {bubbles: true}))
        }
        // clear search
        diagnosisSearchBox.value = ''
    }
    target.insertAdjacentElement("beforeend", newResult)
}

diagnosisSearchBox.addEventListener('input', (e) => {
    // Find matches with fuzzysort
    let searchString = e.target.value.trim()
    let results = fuzzysort.go(searchString, allDiagnoses, {
        threshold: 0,
        limit: 4,
        all: false,
        key: "matchable_string",
    })

    // Clear stale results list
    diagnosisSearchResultsList.innerHTML = ''
    
    // Post new results list
    for (let r of results) {
        // send a shallow copy of the object
        // prevents ['id] from being mutated by insertSearchResults()
        // as much as rust is a pain, at least passing references vs copies is obvious
        insertSearchResult(diagnosisSearchResultsList, { ... r.obj})
    }

    // Post unedited query string as the last option
    if (searchString.length > 0) {
        insertSearchResult(diagnosisSearchResultsList, { name: escapeHTML(searchString), id: `diagnosis-user-defined-${Math.floor(Math.random() * 1000000000)}` })
    }

    // Mark first result as "selected"
    diagnosisSearchResultsList?.firstElementChild?.setAttribute('aria-selected', 'true')
})

diagnosisSearchBox.addEventListener('focusout', (e) => {
    diagnosisSearchResultsList.innerHTML = ''
    diagnosisSearchBox.value = ''

})

diagnosisSearchBox.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        if (diagnosisSearchBox.value.length == 0) {
            diagnosisSearchBox.blur()
        }
        e.target.value = ''
        // TODO: when naviable-list is a proper component, this should be a custom event handler (that resets input and deletes results, without calling a no-op search!)
        e.target.dispatchEvent(new Event('input'))
    }
})
