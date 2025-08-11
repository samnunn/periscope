import { renderEntireDocument } from '/app/static/js/templating.js'

//    ____                  _       _    ____                                      
//   / ___| _ __   ___  ___(_) __ _| |  / ___|__ _ ___  ___  ___                   
//   \___ \| '_ \ / _ \/ __| |/ _` | | | |   / _` / __|/ _ \/ __|                  
//    ___) | |_) |  __/ (__| | (_| | | | |__| (_| \__ \  __/\__ \                  
//   |____/| .__/ \___|\___|_|\__,_|_|  \____\__,_|___/\___||___/                  
//         |_|                                                                     

document.addEventListener("clinic:value-changed", (e) => {
    // BMI -> STOPBANG
    if (e.detail.key == "patient-bmi") {
        let bmi = parseFloat(e.detail.newValue)
        document.persistentDataProxy['stopbang-bmi-35'] = bmi > 35
    }

    // WEIGHT + HEIGHT -> BMI
    if (e.detail.key == "patient-height" || e.detail.key == "patient-weight") {
        let w = parseInt(document.persistentDataProxy['patient-weight'] || 0)
        let h = parseInt(document.persistentDataProxy['patient-height'] || 0)
        if (w <= 0 || h <= 0) return // sanity check
        document.persistentDataProxy['patient-bmi'] = (w / (h / 100) ** 2).toFixed(1)
    }

    // HEIGHT -> IBW/ABW
    if (e.detail.key == "patient-height") {
        let proposedIBW = (parseFloat(e.detail.newValue) - 100).toFixed(1)

        let nominatedSex = document.persistentDataProxy["patient-sex"]
        if (nominatedSex == "F") {
            proposedIBW = proposedIBW * 0.9
        }

        document.persistentDataProxy["patient-weight-ideal"] = proposedIBW
    }

    if (e.detail.key == "patient-weight-ideal") {
        let proposedABW = (parseFloat(e.detail.newValue) * 1.4).toFixed(1)
        proposedABW = Math.max(0, proposedABW)

        let actualWeight = document.persistentDataProxy["patient-weight"] || 0

        let finalABW = Math.min(proposedABW, actualWeight)

        if (finalABW != 0) {
            document.persistentDataProxy["patient-weight-adjusted"] = finalABW
        }
    }

    // SEX -> STOPBANG
    if (e.detail.key == "patient-sex") {
        document.persistentDataProxy['stopbang-male'] = e.detail.newValue == 'M'
    }

    // SEX -> APFEL
    if (e.detail.key == "patient-sex") {
        document.persistentDataProxy['apfel-sex'] = e.detail.newValue == 'F'
    }

    // AGE -> STOPBANG
    if (e.detail.key == "patient-age") {
        document.persistentDataProxy['stopbang-age'] = parseInt(e.detail.newValue) > 50
    }

    // SMOKING -> APFEL
    if (e.detail.key == "smoking-status") {
        document.persistentDataProxy['apfel-smoking'] = !/active/i.test(e.detail.newValue)
    }

    // SORT-TGV -> RCRI
    if (e.detail.key == "sort-tgv") {
        document.persistentDataProxy['rcri-risky'] = /y/i.test(e.detail.newValue)
    }

    // RCRI-TGV -> SORT
    if (e.detail.key == "rcri-risky") {
        document.persistentDataProxy['sort-tgv'] = e.detail.newValue ? "Yes" : "No"
    }
})

//    ____                      _                 _                                
//   |  _ \  _____      ___ __ | | ___   __ _  __| | ___ _ __                      
//   | | | |/ _ \ \ /\ / / '_ \| |/ _ \ / _` |/ _` |/ _ \ '__|                     
//   | |_| | (_) \ V  V /| | | | | (_) | (_| | (_| |  __/ |                        
//   |____/ \___/ \_/\_/ |_| |_|_|\___/ \__,_|\__,_|\___|_|                        

function downloadDocument() {
    let formattedDate = new Date().toISOString().slice(0, 10)

    // Fabricate a filename (date + UMRN)
    let filename = `${formattedDate} Clinic Patient.txt`

    let textDump = renderEntireDocument()

    // Create sham download link
    let downloadLink = document.createElement('a')
    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textDump))
    downloadLink.setAttribute('download', filename)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)

    // Pull the lever, Kronk
    downloadLink.click()
}
document.querySelector('#download')?.addEventListener('click', (e) => {
    try {
        downloadDocument()
        document.displayToast("Note downloaded", "success")
    } catch (e) {
        console.error(`Failed to render and download a markdown copy of the assessment:\n${e}`)
        document.displayToast("Download failed", "error")
    }
})

function downloadPrettyDocument() {
    // let formattedDate = new Date().toISOString().slice(0, 10)

    // Fabricate a filename (date + UMRN)
    // let filename = `${formattedDate} Clinic Patient.txt`

    let textDump = document.renderPrettyDocument()
    console.log(textDump)

    // Create sham download link
    // let downloadLink = document.createElement('a')
    // downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textDump))
    // downloadLink.setAttribute('download', filename)
    // downloadLink.style.display = "none"
    // document.body.appendChild(downloadLink)

    // // Pull the lever, Kronk
    // downloadLink.click()
    let w = window.open()
    w.document.write(textDump)
    w.document.close()
    w.print()
    w.close()
}
document.querySelector('#copy-all')?.addEventListener('click', (e) => {
    // downloadPrettyDocument()
    try {
        let text = renderEntireDocument()
        navigator.clipboard.writeText(text)
        document.displayToast("Copied to clipboard", "success")
    } catch (e) {
        console.log('bad')
    }
})


// RESET
document.querySelector('#reset')?.addEventListener('click', (e) => {
    if (confirm('Are you sure you want to reset the page?')) {
        downloadDocument()
        localStorage.setItem('clinic-data', '{}')
        window.location.reload()
    }
})

// DIALOGS

document.addEventListener("click", (e) => {
    let clickTarget = e.target.closest("[dialog]")
    if (clickTarget) {
        let dialog = document.querySelector(`#${clickTarget.getAttribute("dialog")}`)
        if (dialog) dialog.showModal()
    }

})

// close when backdrop clicked
document.addEventListener('click', (e) => {
    if (!document.querySelector('dialog[open]')) return
    if (!e.target.matches('dialog')) return

    let rect = e.target.getBoundingClientRect()
    if (
        e.clientY < rect.top ||
        e.clientY > rect.top + rect.height ||
        e.clientX < rect.left ||
        e.clientX > rect.left + rect.width
    ) { e.target.close() }
})

// dialog close buttons
document.addEventListener("click", (e) => {
    if (!e.target.matches(".dialog-close")) return
    e.target.closest("dialog").close()
})