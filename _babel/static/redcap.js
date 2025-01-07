
//     ____  __________  ______                      
//    / __ \/ ____/ __ \/ ____/___ _____             
//   / /_/ / __/ / / / / /   / __ `/ __ \            
//  / _, _/ /___/ /_/ / /___/ /_/ / /_/ /            
// /_/ |_/_____/_____/\____/\__,_/ .___/             
//                              /_/                  

// let redCapButton = document.querySelector('#redcap-button')
// let authDialogue = document.querySelector('#auth-connect')
// let authTestForm = document.querySelector('form#auth-check')

// async function uploadToREDCap() {
//     let redcap_url = document.redcap_data.url
//     let redcap_params = document.redcap_data.parameters

//     // make turn
//     for (let param in redcap_params) {
//         try {
//             let rule = redcap_params[param]
//             let result = rule(persistentDataStore)
//             redcap_url += `&${param}=${result}`
//         } catch (e) {
//             console.error(`Failed to calculate REDCap parameter "${param}`, e)
//         }
//     }
    
//     // open REDCap
//     let linkTag = document.createElement('a')
//     linkTag.href = redcap_url
//     linkTag.target = "_blank"
//     document.body.appendChild(linkTag)
//     linkTag.click()
// }

// async function downloadREDCapData() {
//     let redCapData = await import('/redcap.js')
//     return redCapData
// }

// async function addREDCapListener(fn) {
//     document.addEventListener('input', (e) => {
//         let ruling = fn(persistentDataStore)
//         if (ruling == true) {
//             redCapButton.classList.add('warning')
//         } else {
//             redCapButton.classList.remove('warning')
//         }
//     })
// }

// async function downloadServerData(sitecode) {
//     let url = "/auth"
//     let data = new FormData()
//     data.append("tenant_name", sitecode)
//     let response = await fetch(url, {
//         body: data,
//         method: "POST",
//     })
//     if (response.status == 200) {
//         localStorage.setItem("sitecode", sitecode)
//         let response = await downloadREDCapData()
//         document.redcap_data = response.surveys[0]
//         addREDCapListener(document.redcap_data.rule)
//         return true
//     }
//     document.redcap_data = null
//     localStorage.removeItem("sitecode")
//     return false
// }

// window.addEventListener("load", (e) => {
//     let stored_sitecode = localStorage.getItem("sitecode") || ""
//     if (stored_sitecode) {
//         downloadServerData(stored_sitecode)
//     }
// })

// redCapButton.addEventListener('click', async (e) => {
//     if (document.redcap_data) {
//         // if authenticated, upload
//         let result = await uploadToREDCap()
//     } else {
//         // if not authenticated, show auth dialogue
//         authDialogue.showModal()
//     }
// })

// authTestForm.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     let siteCode = e.target.querySelector('input[name="tenant_name"').value
//     let authenticated = await downloadServerData(siteCode)
//     if (authenticated) {
//         authDialogue.close()
//         redCapButton.click()
//     }
// })