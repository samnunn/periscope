import { sendToBeagle } from '/app/static/js/beagle-utils.js'
import { insertClinicDiagnosis } from '/app/static/js/historian.js'

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
document.persistentDataProxy = new Proxy(persistentDataStore, {
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
        let interestedInputs = document.querySelectorAll(`[data-clinic-parameter="${key}"]`)
        for (let ip of interestedInputs) {
            // skip the input that triggered this refresh (avoid infinite loop)
            if (ip.matches(':focus, :focus-within')) continue

            // set value
            ip.setValue(value)
        }

        if (oldValue != value) {
            // Dispatch event
            // debugger
            document.dispatchEvent(new CustomEvent('clinic:value-changed', {
                detail: {
                    oldValue: oldValue,
                    newValue: value,
                    key: key,
                }
            }))
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



// restore data on load
window.addEventListener("DOMContentLoaded", async () => {
    // restore nested data in diagnoses
    for (let id of document.persistentDataProxy['diagnoses-order'] || []) {
        let storedData = document.persistentDataProxy[id]
        if (storedData) {
            insertClinicDiagnosis(id, false)
        } else {
            console.error(`Failed to re-instate diagnosis "${id}": no data in persistentDataProxy`)
        }
    }

    // give Beagle its intial sniff (to generate issues/suggestions)
    // worked API can't deep clone proxies, so passing underlying object
    sendToBeagle(document.persistentDataStore)
})

// listen for input events on any element with clinic-parameter
document.body.addEventListener('clinic:user-input', (e) => {
    if (e.target.tagName == 'CLINIC-DIAGNOSIS') {
        document.persistentDataProxy[e.target.dataset.diagnosisId] = e.target.serialise()
    } else {
        document.persistentDataProxy[e.target.dataset.clinicParameter] = e.target.getValue()
    }
})

// listen for list reordering
document.querySelector('#diagnosis-draglist')?.addEventListener('clinic:draglist-reorder', (e) => {
    console.log('Updating `diagnoses-order`')
    document.persistentDataProxy['diagnoses-order'] = [...document.querySelectorAll('#diagnosis-draglist clinic-diagnosis[data-diagnosis-id]')]
        .reverse()
        .map((dx) => dx.dataset.diagnosisId)
})