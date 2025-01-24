import { getAnyInputValue, setAnyInputValue } from '/static/js/utils.js'
//    ___                   _                                                      
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
        this.default_render = () => `${this.data.output_name}: ${this.getValue()}`

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
    
    getValue() {
        return getAnyInputValue(this)
    }
    
    setValue(newValue) {
        return setAnyInputValue(this, newValue)
    }

    render() {
        if (this.data.render) {
            return this.data.render(this)
        } else {
            return this.default_render()
        }
    }

    focus() {
        this.inputElement.focus()
    }
})

