async function checkAuth(sitecode) {
    let url = "/auth"
    let data = new FormData()
    data.append("tenant_name", sitecode)
    let response = await fetch(url, {
        body: data,
        method: "POST",
    })
    if (response.status == 200) {
        return true
    }
    return false
}

async function fetchAllSecrets() {
}

async function implementDeeplinks() {
    let deeplinkData = await import("/deeplinks.js")
    
    // enable ID field
    
    
    // add links to DOM
    let deeplinkContainer = document.querySelector("#deeplinks")
    for (let scheme of deeplinkData.urlSchemes) {
        let menuItem = document.createElement('a')
        menuItem.href = "#"
        menuItem.classList.add("invisible-link")
        menuItem.onclick = (e) => {
            e.target.href = "http://google.com"
        }
        menuItem.innerHTML = `
            <li title="Link to ${scheme.pretty_name}">
                <span class="icon"><img src="/static/icons/colour_bookmark.svg"></span>
                <span class="left">${scheme.pretty_name}</span>
            </li>
        `
        deeplinkContainer.appendChild(menuItem)
    }

}

function removeDeeplinks() {

}

function fetchAnyJS() {

}

//     ____  __________  ______                      
//    / __ \/ ____/ __ \/ ____/___ _____             
//   / /_/ / __/ / / / / /   / __ `/ __ \            
//  / _, _/ /___/ /_/ / /___/ /_/ / /_/ /            
// /_/ |_/_____/_____/\____/\__,_/ .___/             
//                              /_/                  

let connectButton = document.querySelector("#connect-button")
connectButton.addEventListener("click", async (e) => {
    if (await checkAuth('RPHPAAS')) {
        await implementDeeplinks()
    }
})