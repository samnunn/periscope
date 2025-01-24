//     ____ _ _        _   _                                                       
//    / ___(_) |_ __ _| |_(_) ___  _ __  ___                                       
//   | |   | | __/ _` | __| |/ _ \| '_ \/ __|                                      
//   | |___| | || (_| | |_| | (_) | | | \__ \                                      
//    \____|_|\__\__,_|\__|_|\___/|_| |_|___/                                      
        
import { citationSnippets } from '../data/citation-data.js'
import { allPublications } from '../data/publication-data.js'

function placeBelow(anchor, follower) {
    let anchorBox = anchor.getBoundingClientRect()
    let anchorX = anchorBox.left + anchorBox.width / 2 - 250

    // Math.min(maximum, Math.max(minimum, variable))
    let leftMin = 16
    let leftMax = window.innerWidth - 500 - 16
    anchorX = Math.min(leftMax, Math.max(leftMin, anchorX))
    

    let anchorY = window.scrollY + anchorBox.top + anchorBox.height

    follower.style.left = `${anchorX}px`
    follower.style.top = `${anchorY}px`
}


// defines a popup-style dingus
customElements.define('clinic-modal-popup', class extends HTMLElement {
    constructor() {
        super()
        this.uniqueID = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')
        this.setAttribute('popovertarget', this.uniqueID)
    }

    connectedCallback() {
        // create a <dialog> element for each citation
        let citationDialog = document.createElement('dialog')
        // clone the content of the <template> element inside this custom element
        // and append it to the dialog
        citationDialog.appendChild(this.querySelector('template')?.content.cloneNode(true))
        // set a unique id for the dialog
        citationDialog.id = this.uniqueID
        // add a class to the dialog for styling purposes
        citationDialog.classList.add('clinic-modal-popup-dialog')
        // set the position anchor for the dialog using a custom property
        citationDialog.style = `position-anchor: --${this.uniqueID};`
        // insert the dialog at the end of the document body
        document.body.insertAdjacentElement("beforeend", citationDialog)
        // document.querySelector('#tab-display').insertAdjacentElement("beforeend", citationDialog)
        // this.insertAdjacentElement("beforeend", citationDialog)
        // set the anchor name for this custom element
        this.style = `anchor-name: --${this.uniqueID};`
        // add a click event listener to this custom element
        // when clicked, it will show the modal dialog
        this.onclick = (e) => {
            e.stopPropagation()
            placeBelow(this, citationDialog)
            citationDialog.showModal()
        }
    }
})


// defines a smart citation handler
customElements.define('clinic-citation-snippet', class extends HTMLElement {
    constructor() {
        super()
        this.snippetID = this.getAttribute('citation-id')
        this.snippetInfo = citationSnippets.find(snippet => snippet.id == this.snippetID)
    }

    connectedCallback() {
        if (this.snippetInfo.body) this.innerHTML = this.snippetInfo.body
        let publicationInfo = allPublications.find(p => p.id == this.snippetInfo.publication)
        if (publicationInfo) {
            let cite = document.createElement('cite')
            cite.innerHTML = `<a target="_blank" href="${publicationInfo.url}" target="_blank">${publicationInfo.pretty}</a>`
            this.appendChild(cite)
        }
    }
})