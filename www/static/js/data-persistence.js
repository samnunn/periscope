import { getAnyInputValue, setAnyInputValue } from '/static/js/utils.js'
import { sendToBeagle } from '/static/js/beagle-mainthread.js'
import { allDiagnoses } from '/static/data/diagnosis-data.js'
import { insertClinicDiagnosis, diagnosisList } from '/static/js/historian.js'

//    ____        _          ____               _     _                            
//   |  _ \  __ _| |_ __ _  |  _ \ ___ _ __ ___(_)___| |_ ___ _ __   ___ ___       
//   | | | |/ _` | __/ _` | | |_) / _ \ '__/ __| / __| __/ _ \ '_ \ / __/ _ \      
//   | |_| | (_| | || (_| | |  __/  __/ |  \__ \ \__ \ ||  __/ | | | (_|  __/      
//   |____/ \__,_|\__\__,_| |_|   \___|_|  |___/_|___/\__\___|_| |_|\___\___|      

// get from localStorage at startup
let persistentDataStore
try {
    persistentDataStore = JSON.parse(localStorage.getItem('clinic-data') || '') // JSON parser chokes on empty string if clinic-data isn't stored
} catch {
    persistentDataStore = {}
}

// establish proxy
let persistentDataProxy = new Proxy(persistentDataStore, {
    get(object, key, receiver) {
        return object[key]
    },
    set(object, key, value) {
        let oldValue = object[key]

        // Update underlying model
        object[key] = value

        // Persist data to localStorage
        localStorage.setItem('clinic-data', JSON.stringify(object))

        // Send to beagle for sniffing
        sendToBeagle(object)

        // Update UI
        let interestedInputs = document.querySelectorAll(`[clinic-parameter="${key}"]`)
        for (let ip of interestedInputs) {
            // skip the input that triggered this refresh (avoid infinite loop)
            if (ip.matches(':focus, :focus-within')) continue

            // set value
            setAnyInputValue(ip, value)
        }

        if (oldValue != value) {
            // Dispatch event
            // debugger
            document.dispatchEvent(new CustomEvent('clinic:value-changed', { detail: {
                oldValue: oldValue,
                newValue: value,
                key: key,
            }}))
        }

        return true
    },
    deleteProperty(object, key) {
        // Remove the property from the object
        delete object[key]

        // Update the localStorage with the modified object
        localStorage.setItem('clinic-data', JSON.stringify(object))

        // Notify the beagle service about the change
        sendToBeagle(object)

        // Return true to indicate successful deletion
        // This is required for the Proxy trap to work correctly
        return true
    }
})
document.persistentDataProxy = persistentDataProxy // make accessible from the main thread



// restore data on load
window.addEventListener("load", () => {
    // restore top-level data
    for (let p in persistentDataProxy) {
        // Get the stored data for the current property
        let storedData = persistentDataProxy[p]
        
        // Find all input elements that have a 'clinic-parameter' attribute matching the current property
        let targetInputs = document.querySelectorAll(`[clinic-parameter="${p}"]`)
        
        // For each matching input element
        for (let i of targetInputs) {
            // Set the value of the input element to the stored data
            setAnyInputValue(i, storedData)
        }
    }

    // restore nested data in diagnoses
    for (let id of persistentDataProxy['diagnoses-order'] || []) {
        let storedData = persistentDataProxy[id]
        if (!storedData) {
            console.error(`Attempted to re-populate diagnosis with id "${id}" but underlying data was not found in persistentDataProxy`)
            continue
        }
        let genericDiagnosisData = allDiagnoses.find((d) => d['id'] == storedData['id'])
    
        storedData['html'] = genericDiagnosisData?.html || ''
        insertClinicDiagnosis(storedData, diagnosisList, "afterbegin", false)
    }

    // give Beagle its intial sniff
    document.beagle.postMessage({
        inputData: persistentDataStore,
    })
})

// listen for input events on any element with clinic-parameter
document.body.addEventListener('clinic:user-input', (e) => {
    persistentDataProxy[e.target.ugly_name] = getAnyInputValue(e.target)

    if (e.target.tagName == 'CLINIC-DIAGNOSIS') {
        persistentDataProxy[e.target.getAttribute('clinic-parameter')] = e.target.serialise()
    }
})

// listen for list reordering
document.querySelector('#diagnosis-draglist')?.addEventListener('clinic:draglist-reorder', (e) => {
    console.log('Updating `diagnoses-order`')
    persistentDataProxy['diagnoses-order'] = [...document.querySelectorAll('#diagnosis-draglist clinic-diagnosis[clinic-parameter]')]
        .reverse()
        .map((dx) => dx.getAttribute('clinic-parameter'))
})