// /    ___                   _                                                      
//   |_ _|_ __  _ __  _   _| |_ ___                                                
//    | || '_ \| '_ \| | | | __/ __|                                               
//    | || | | | |_) | |_| | |_\__ \                                               
//   |___|_| |_| .__/ \__,_|\__|___/                                               
//             |_|                                                                 

// import { allInputs } from '../data/input-data.js'

customElements.define('clinic-input', class extends HTMLElement {
    constructor() {
        // boilerplate
        super()

        // data setup
        this.ugly_name = this.getAttribute("clinic-parameter")
        this.label_enabled = this.getAttribute("label") != "false" // true by default
        this.data = allInputs.find((i) => i.ugly_name == this.ugly_name)

        // boilerplate
        this.setAttribute("autocomplete", "off")

        // insert HTML
        let html
        if (this.label_enabled) {
            if (this.data.citation) {
                html = `
                <label>
                    <span>
                        ${this.data.pretty_name}
                        <clinic-modal-popup>
                            <button class="infobutton" tabindex="-1"></button>
                            <template>
                                <clinic-citation-snippet citation-id="${this.data.citation}"></clinic-citation-snippet>
                            </template>
                        </clinic-modal-popup>
                    </span>
                    ${this.data.html}
                </label>`
            } else {
                html = `
                <label>
                    ${this.data.pretty_name}
                    ${this.data.html}
                </label>`
            }
        } else {
            html = this.data.html
        }
        this.innerHTML = html

        // identify input element
        this.inputElement = this.querySelector("input, select, textarea")

        // input handling
        this.addEventListener('input', (e) => {
            // e.stopPropagation()
            this.dispatchEvent(new CustomEvent("clinic:user-input", {bubbles: true}))
        })

        // focus handling
        this.addEventListener('focus', (e) => {
            this.inputElement.focus()
        })
    }

    connectedCallback() {
    }

	attributeChangedCallback (name, oldValue, newValue) {

	}

	static get observedAttributes () {
		return []
	}
    
    setValue(newValue) {
        target = this

        if (target.inputElement) target = target.inputElement
    
        if (target.tagName == 'select' && target.selectedIndex > 0) {
            target.value = newValue
        } else if (target.tagName == 'INPUT' && target.getAttribute('type') == 'checkbox') {
            target.checked = newValue
        } else if (target.tagName == 'P' || target.tagName == 'SPAN') {
            target.innerText = newValue
        } else {
            target.value = newValue
        }

        return newValue
    }

    focus() {
        this.inputElement.focus()
    }
})

