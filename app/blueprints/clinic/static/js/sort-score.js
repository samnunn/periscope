//    ____   ___  ____ _____   ____                                                
//   / ___| / _ \|  _ \_   _| / ___|  ___ ___  _ __ ___                            
//   \___ \| | | | |_) || |   \___ \ / __/ _ \| '__/ _ \                           
//    ___) | |_| |  _ < | |    ___) | (_| (_) | | |  __/                           
//   |____/ \___/|_| \_\|_|   |____/ \___\___/|_|  \___|                           

// Rig up UI
let sortContainer = document.querySelector('#sort-container')
let sortMainGroup = document.querySelector('[data-clinic-parameter="sort-group"]')
let sortSubGroup = document.querySelector('[data-clinic-parameter="sort-subgroup"]')
let sortOperation = document.querySelector('[data-clinic-parameter="sort-operation"]')
let sortScoreOutput = document.querySelector('[data-clinic-parameter="sort-score"]')

sortMainGroup.addEventListener('clinic:user-input', (e) => {
    // filter operations
    let subGroups = window.procedures.filter((p) => {
        return p['MainGroup'] == sortMainGroup.inputElement.value
    })
    subGroups = subGroups.map((g) => g['SubGroup'])
    subGroups = subGroups.sort()
    subGroups = new Set(subGroups)

    // reset sub-group
    sortSubGroup.inputElement.innerHTML = ""

    // add non-option
    let nonOption = document.createElement('option')
    nonOption.value = ""
    nonOption.setAttribute('selected', true)
    sortSubGroup.inputElement.appendChild(nonOption)

    // render an <option> for each of the subgroups
    for (let g of subGroups) {
        let optionElement = document.createElement('option')
        optionElement.value = g
        optionElement.innerText = g
        sortSubGroup.inputElement.appendChild(optionElement)
    }
})

sortSubGroup.addEventListener('clinic:user-input', (e) => {
    // filter operations
    let operations = window.procedures.filter((p) => {
        return p['SubGroup'] == sortSubGroup.inputElement.value
    })
    operations = operations.map((g) => g['SurgeryProcedure'])
    operations = operations.sort()
    operations = new Set(operations)

    // reset sub-group
    sortOperation.inputElement.innerHTML = ""

    // add non-option
    let nonOption = document.createElement('option')
    nonOption.value = ""
    nonOption.setAttribute('selected', true)
    sortOperation.inputElement.appendChild(nonOption)

    // render an <option> for each of the operations
    for (let o of operations) {
        let optionElement = document.createElement('option')
        optionElement.value = o
        optionElement.innerText = o
        sortOperation.inputElement.appendChild(optionElement)
    }
})

function calculateSortScore(data) {
    // requires: asa urgency tgv severity malignancy age
    // unless all keys are present, log error and return empty string
    let requiredKeys = ['patient-asa', 'patient-age', 'sort-urgency', 'sort-tgv', 'sort-operation', 'sort-malignancy']
    let hasRequiredKeys = requiredKeys.every((i) => { return data.hasOwnProperty(i) })
    if (hasRequiredKeys == false) {
        console.debug('SORT not calculated due to incomplete data:', data)
        return ""
    } else {
        console.info(`SORT Calculator ran with data: \n${JSON.stringify(data, undefined, "    ")}`)
    }

    // get operation severity
    let operationData = window.procedures.filter((p) => { return p['SurgeryProcedure'] == data['sort-operation'] })
    let severity = operationData[0]['SurgeryProcedureSeverity']

    let sortlogit = (
        (data['patient-asa'] == "3") * 1.411 +
        (data['patient-asa'] == "4") * 2.388 +
        (data['patient-asa'] == "5") * 4.081 +
        (data['sort-urgency'] == "Expedited") * 1.236 +
        (data['sort-urgency'] == "Urgent") * 1.657 +
        (data['sort-urgency'] == "Immediate") * 2.452 +
        (data['sort-tgv'] == "Yes") * 0.712 +
        (["Xma", "Com"].includes(severity)) * 0.381 +
        (data['sort-malignancy'] == "Yes") * 0.667 +
        (parseInt(data['patient-age']) >= 65 && parseInt(data['patient-age']) <= 79) * 0.777 +
        (parseInt(data['patient-age']) >= 80) * 1.591 -
        7.366
    )

    // if (data['asa'] == "3") console.debug('asa 3 -> 1.411')
    // if (data['asa'] == "4") console.debug('asa 4 -> 2.388')
    // if (data['asa'] == "5") console.debug('asa 5 -> 4.081')
    // if (data['urgency'] == "Expedited") console.debug('expedited -> 1.236')
    // if (data['urgency'] == "Urgent") console.debug('urgent -> 1.657')
    // if (data['urgency'] == "Immediate") console.debug('immediate -> 2.452')
    // if (data['tgv'] == "Yes") console.debug('tgv -> 0.712')
    // if (["Xma", "Com"].includes(severity)) console.debug('xmaj/complex -> 0.381')
    // if (data['malignancy'] == "Yes") console.debug('malignancy -> 0.667')
    // if (parseInt(data['age']) >= 65 && parseInt(data['age']) <= 79) console.debug('age 65-79 -> 0.777')
    // if (parseInt(data['age']) >= 80) console.debug('age ≤ 80 -> 1.591')
    // console.debug('-7.366')

    let sortScore = 100 / (1 + Math.E ** (0 - sortlogit))

    return sortScore.toFixed(2)
}

// Listen for input and run calculator if needed parameters are present
sortContainer?.addEventListener('input', (e) => {
    let requiredData = { 'patient-asa': null, 'patient-age': null, 'sort-urgency': null, 'sort-tgv': null, 'sort-operation': null, 'sort-malignancy': null }
    for (let k in requiredData) {
        let targetElement = sortContainer.querySelector(`[data-clinic-parameter="${k}"]`)
        // TODO: change to persistentDataProxy method once sort-operation is in the proxy
        let value = targetElement.getValue()

        if (value != "") {
            requiredData[k] = value
        } else {
            sortScoreOutput.setValue("")
            return
        }
    }

    let score = calculateSortScore(requiredData)
    document.persistentDataProxy['sort-score'] = score
})

//    ____                      _                                                  
//   / ___|  ___  __ _ _ __ ___| |__                                               
//   \___ \ / _ \/ _` | '__/ __| '_ \                                              
//    ___) |  __/ (_| | | | (__| | | |                                             
//   |____/ \___|\__,_|_|  \___|_| |_|                                             

let brightspot = new Worker(new URL('/app/static/js/brightspot.js', import.meta.url))

brightspot.postMessage({
    'type': 'data_in',
    'procedures': window.procedures,
})

let searchForm = document.querySelector('#smart-search')
let searchResults = document.querySelector('#smart-results')
searchForm.addEventListener('input', (e) => {
    e.preventDefault()
    let query = searchForm.querySelector('input[type="search"]')?.value
    if (!query) return
    brightspot.postMessage({
        'type': 'search',
        'query': query,
    })
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
})

searchForm.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        searchResults.innerHTML = ''
    }
})

brightspot.addEventListener('message', (m) => {
    console.log("BS message", m)

    let results = m.data

    if (results.length == 0) {
        searchResults.innerHTML = '<p style="text-align: center; font-weight: bold;">No results 🥺</p>'
        return
    }

    let newHTML = ''
    for (let r of results) {
        newHTML += `<li maingroup="${r.obj['MainGroup']}" subgroup="${r.obj['SubGroup']}"><span>${r.obj['SurgeryProcedure']}</span><button>Pick</button></li>\n`
    }
    searchResults.innerHTML = newHTML

    searchResults.firstChild.setAttribute('aria-selected', 'true')
})
searchResults.addEventListener('mousedown', (e) => {
    e.preventDefault() // stop focus stealing
})
searchResults.addEventListener('click', (e) => {
    let target = e.target.closest('li')
    if (!target) return

    let mainGroup = target.getAttribute('maingroup')
    let subGroup = target.getAttribute('subgroup')
    let operationName = target.querySelector('span').innerText

    if (!mainGroup || !subGroup || !operationName) return

    try {
        sortMainGroup.inputElement.value = mainGroup
        sortMainGroup.dispatchEvent(new Event("clinic:user-input", { bubbles: true }))
        sortSubGroup.inputElement.value = subGroup
        sortSubGroup.dispatchEvent(new Event("clinic:user-input", { bubbles: true }))
        sortOperation.inputElement.value = operationName
        sortOperation.dispatchEvent(new Event("clinic:user-input", { bubbles: true }))

        searchForm.reset()

        document.querySelector('[data-clinic-parameter="patient-asa"]').focus()

        searchResults.innerHTML = ''

    } catch (err) {
        console.error('failed to set operation using beagle result')
        console.error(err)
    }
})