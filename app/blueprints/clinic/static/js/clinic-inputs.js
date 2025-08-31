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
            if (storedValue) this.setValue(storedValue)
        } else {
            console.error(`document.persistentDataProxy was not available when connectedCallback() was called on <clinic-input> named "${this.dataset.clinicParameter}"`)
        }
    }

    renderText() {
        let body = document.persistentDataProxy[this.dataset.clinicParameter]
        if (!body) {
            return ""
        }

        let prefix = this.dataset.clinicOutputPrefix
        if (prefix == "self")
            return body
        else {
            let suffix = this.dataset.clinicOutputSuffix || ""
            return `${prefix}: ${body}${suffix}`
        }
    }

    setValue(value) {
        if (this.inputElement.tagName == 'select' && this.inputElement.selectedIndex > 0) {
            this.inputElement.value = value
        } else if (this.inputElement.tagName == 'INPUT' && this.inputElement.getAttribute('type') == 'checkbox') {
            this.inputElement.checked = value
        } else if (this.inputElement.tagName == 'P' || this.inputElement.tagName == 'SPAN') {
            this.inputElement.innerText = value
        } else {
            this.inputElement.value = value
        }
    }

    getValue() {
        if (this.inputElement.tagName == 'select' && this.inputElement.selectedIndex > 0) {
            return this.inputElement.value
        } else if (this.inputElement.tagName == 'INPUT' && this.inputElement.getAttribute('type') == 'checkbox') {
            return this.inputElement.checked
        } else if (this.inputElement.tagName == 'P' || this.inputElement.tagName == 'SPAN') {
            return this.inputElement.innerText
        } else {
            return this.inputElement.value
        }
    }
})