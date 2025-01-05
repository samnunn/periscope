//     ____  __________  ______                      
//    / __ \/ ____/ __ \/ ____/___ _____             
//   / /_/ / __/ / / / / /   / __ `/ __ \            
//  / _, _/ /___/ /_/ / /___/ /_/ / /_/ /            
// /_/ |_/_____/_____/\____/\__,_/ .___/             
//                              /_/                  

import { diagnosisExists } from '/beagle.js'

let redCapButton = document.querySelector('#redcap-button')
redCapButton.addEventListener('click', (e) => {
    // serialise data
    let data = {
        'patient_ihd': (inputData) => diagnosisExists(inputData, 'diagnosis-ihd') ? 1 : 0,
        'patient_ccf': (inputData) => diagnosisExists(inputData, 'diagnosis-ccf') ? 1 : 0,
        'patient_diabetes': (inputData) => {
            if (diagnosisExists(inputData, 'diagnosis-t2dm')) {
                return 1
            } else if (diagnosisExists(inputData, 'diagnosis-t1dm')) {
                return 2
            } else {
                return 3
            }
        },
    }

    let queryString = ''
    for (let key in data) {
        let result = ''
        try {
            result = data[key](persistentDataProxy)
        } catch (err) {
            console.error(err)
            continue
        }
        queryString += '&'
        queryString += key
        queryString += '='
        queryString += result
    }

    // assemble url
    let url = `https://datalibrary-rc.health.wa.gov.au/surveys/?s=M8PADXXDYW3DN9JM${queryString}`
    window.open(url)
})

// <li title="RedCap" role="button" id="redcap-button">
// <span class="icon"><img src="/icons/colour_bookmark.svg"></span>
// <span class="left">REDCap</span>
// </li>