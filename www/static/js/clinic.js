import { renderEntireDocument } from '/static/js/templating.js'

// COMPONENTS
// import "./clinic-inputs.js"
import "/static/js/components/draggable-list.js"
import "/static/js/components/navigable-list.js"
import "/static/js/components/cmd-k.js"

import "/static/js/historian.js"
import "/static/js/text-editing.js"
import "/static/js/beagle-mainthread.js"
import "/static/js/citations.js"
import "/static/js/templating.js"
import "/static/js/data-persistence.js"
import "/static/js/scrollspy.js"
import "/static/js/calculators.js"



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
        document.persistentDataProxy['patient-bmi'] = (w / (h/100)**2).toFixed(1)
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
})

//    ____                      _                 _                                
//   |  _ \  _____      ___ __ | | ___   __ _  __| | ___ _ __                      
//   | | | |/ _ \ \ /\ / / '_ \| |/ _ \ / _` |/ _` |/ _ \ '__|                     
//   | |_| | (_) \ V  V /| | | | | (_) | (_| | (_| |  __/ |                        
//   |____/ \___/ \_/\_/ |_| |_|_|\___/ \__,_|\__,_|\___|_|                        

function downloadDocument() {
    let formattedDate = new Date().toISOString().slice(0,10)

    // Fabricate a filename (date + UMRN)
    let filename = `${formattedDate} Clinic Patient.txt`

    let textDump = renderEntireDocument()

    // Create sham download link
	let downloadLink = document.createElement('a')
	downloadLink.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(textDump))
    downloadLink.setAttribute('download', filename)
	downloadLink.style.display = "none"
	document.body.appendChild(downloadLink)

    // Pull the lever, Kronk
	downloadLink.click()
}

document.querySelector('#download')?.addEventListener('click', (e) => {
    downloadDocument()
})

// RESET
document.querySelector('#reset')?.addEventListener('click', (e) => {
    if (confirm('Are you sure you want to reset the page?')) {
        downloadDocument()
        localStorage.setItem('clinic-data', '{}')
        window.location.reload()
    }
})

//   __        __   _                            _____         _                   
//   \ \      / /__| | ___ ___  _ __ ___   ___  |_   _|____  _| |_                 
//    \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \   | |/ _ \ \/ / __|                
//     \ V  V /  __/ | (_| (_) | | | | | |  __/   | |  __/>  <| |_                 
//      \_/\_/ \___|_|\___\___/|_| |_| |_|\___|   |_|\___/_/\_\\__|                
                                                                                
let welcomeDialog = document.querySelector('#big-welcome')
window.addEventListener('load', (e) => {
    let todayDate = new Date().toISOString().slice(0,10)
    let storedDate = localStorage.getItem('clinic-last-welcome-date') || ''
    if (todayDate != storedDate) {
        welcomeDialog.showModal()
    }
    localStorage.setItem('clinic-last-welcome-date', todayDate)
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


// WINDOW RESIZING
let tabPicker = document.querySelector("#sidebar")
localStorage.setItem('sidebar-overridden', 'false')

function autoCollapseTabPicker() {
    if (localStorage.getItem('sidebar-overridden') == 'true') {
        return
    }

    if (window.innerWidth < 800) {
        tabPicker.expanded = false
    } else {
        tabPicker.expanded = true
    }

    tabPicker.setAttribute("aria-expanded", tabPicker.expanded)
}
window.addEventListener("resize", (e) => {
    autoCollapseTabPicker()
})
document.addEventListener("DOMContentLoaded", (e) => {
    autoCollapseTabPicker()
})
document.querySelector("#tab-bar-collapse-button")?.addEventListener("click", (e) => {
    tabPicker.expanded = !tabPicker.expanded
    localStorage.setItem('sidebar-overridden', 'true')
    tabPicker.setAttribute("aria-expanded", tabPicker.expanded)
})