import { setAnyInputValue } from '/app/static/js/utils.js'

customElements.define('clinic-input', class extends HTMLElement {
    constructor() {
        // boilerplate
        super()
    }

    connectedCallback() {
        // identify input element
        this.inputElement = this.querySelector("input, select, textarea, span")

        if (!this.inputElement) {
            console.error(`<clinic-input> for "${this.dataset.clinicParameter}" does not contain and input element`)
            debugger
        }

        // input handling
        this.addEventListener('input', (e) => {
            this.dispatchEvent(new CustomEvent("clinic:user-input", { bubbles: true }))
        })
        this.addEventListener('change', (e) => {
            this.dispatchEvent(new CustomEvent("clinic:user-input", { bubbles: true }))
        })

        // restore stored data
        if (document.persistentDataProxy) {
            let storedValue = document.persistentDataProxy[this.dataset.clinicParameter]
            if (storedValue) setAnyInputValue(this.inputElement, storedValue)
        } else {
            console.error(`document.persistentDataProxy was not available when connectedCallback() was called on <clinic-input> named "${this.dataset.clinicParameter}"`)
        }
    }
})