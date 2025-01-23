//    ____                 _ _                                                     
//   / ___|  ___ _ __ ___ | | |___ _ __  _   _                                     
//   \___ \ / __| '__/ _ \| | / __| '_ \| | | |                                    
//    ___) | (__| | | (_) | | \__ \ |_) | |_| |                                    
//   |____/ \___|_|  \___/|_|_|___/ .__/ \__, |                                    
//                                |_|    |___/                                     

document.body.addEventListener('click', (e) => {
    // any click on a tab selector should open that tab
    // adding a 'click' event listener to the li itself doesn't pick up click that landed on text or icons
    // hence the fancy selector
    if (e.target.matches('#tab-picker li[scroll-target], #tab-picker li[scroll-target] *')) {
        // find target <section>
        let id = e.target.closest('li').getAttribute('scroll-target')
        let targetElement = document.querySelector(`#${id}`)

        // die if element doesn't exist
        if (!targetElement) {
            console.error(`tab-picker clicked but its target doesn't exist (ID: ${id})`, e.target.closest('li'))
            return
        }

        // move focus to first input
        let firstInput = targetElement.querySelector('input, textarea')
        firstInput?.focus()

        // scroll into view
        targetElement.scrollIntoView({behavior: "instant", block: "center"})
        document.dispatchEvent(new Event('scroll'))
    }

    // any clicks on a <section> that don't land on something focus-able should put focus the first input
    // if (e.target.matches('section, section *:not(:focus, button.section-copy)')) {
    //     e.target?.closest('section')?.querySelector('input, select, textarea, label')?.focus({preventScroll: true})
    // }
})

let allTabs = document.querySelectorAll('#tab-picker li[scroll-target]')
let allSections = document.querySelectorAll('section')

document.addEventListener('scroll', (e) => {
    scrollSpyHandler()
})
document.addEventListener('focusin', (e) => {
    scrollSpyHandler()
})

function scrollSpyHandler() {
    let currentScrollPosition = window.scrollY

    // highlight section:focus-within if it's inside the viewport anywhere
    let sectionsWithFocus = document.querySelectorAll('section:focus-within')
    for (let swf of sectionsWithFocus) {
        if (swf.offsetTop >= currentScrollPosition && swf.offsetTop + swf.offsetHeight <= currentScrollPosition + window.innerHeight) {
            setScrollSpySelection(swf.id)
            return
        }
    }

    // highlight final section if scrolled within 30px of the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 30) {
        let id = Array.from(allSections)?.at(-1)?.id
        setScrollSpySelection(id)
        return
    }

    // otherwise highlight topmost element whose top edge is within the viewport
    for (let s of allSections) {
        let offsetTop = s.offsetTop
        let height = s.offsetHeight
        let id = s.id

        if ((s.offsetTop + 30) >= currentScrollPosition) {
            setScrollSpySelection(id)
            return
        }
    }
}

document.dispatchEvent(new Event('scroll'))

function setScrollSpySelection(id) {
    let buttonToHighlight = document.querySelector(`li[scroll-target="${id}"]`)
    if (!buttonToHighlight) return
    for (let t of allTabs) {
        t.removeAttribute('aria-selected')
    }
    buttonToHighlight.setAttribute('aria-selected', true)

}