let sidebar = document.querySelector("nav#sidebar")

function setSidebarState(targetState) {
    // true = open, false = closed
    let ariaExpanded
    if (targetState) {
        // open
        ariaExpanded = "true"
    } else {
        // close
        ariaExpanded = "false"
    }
    sidebar.setAttribute("aria-expanded", ariaExpanded)
    localStorage.setItem("clinic-sidebar-open", ariaExpanded)
}

document.querySelector("#sidebar-toggle").addEventListener("click", (e) => {
    let initialState = sidebar.getAttribute("aria-expanded")
    setSidebarState(initialState == "false")
})

window.addEventListener("DOMContentLoaded", (e) => {
    let storedState = localStorage.getItem('clinic-sidebar-open') || 'true'
    storedState = storedState == 'true' ? true : false

    setSidebarState(storedState)
})