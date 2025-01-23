

customElements.define('clinic-navigable-list', class extends HTMLElement {
    constructor () {
        super()
        this.resultsSelector = this.getAttribute('results') || 'ul'
        this.resultsContainer = this.querySelector(this.resultsSelector)

        this.searchSelector = this.getAttribute('search') || 'input[type="search"]'
        this.searchContainer = this.querySelector(this.searchSelector)

        
        this.addEventListener("keydown", (e) => {
            // ENTER
            if (e.key == "Enter") {
                this.resultsContainer.querySelector('[aria-selected]')?.click()
            }

            // DOWN
            if (e.key == "ArrowDown") {
                e.preventDefault()
                let currentlySelected = this.resultsContainer.querySelector('[aria-selected]')
                let nextElement = currentlySelected?.nextElementSibling
                currentlySelected?.removeAttribute('aria-selected')
                if (nextElement) {
                    // go to next
                    this.setSelectedElement(nextElement)
                } else {
                    // go to top
                    this.setSelectedElement(this.resultsContainer.firstElementChild)
                }
            }

            // UP
            if (e.key == "ArrowUp") {
                e.preventDefault()
                let currentlySelected = this.resultsContainer.querySelector('[aria-selected]')
                let previousElement = currentlySelected?.previousElementSibling
                currentlySelected?.removeAttribute('aria-selected')
                if (previousElement) {
                    // go to next
                    this.setSelectedElement(previousElement)
                } else {
                    // go to top
                    this.setSelectedElement(this.resultsContainer.lastElementChild)
                }
            }
        })
    }

    setSelectedElement(el) {
        let allSelected = this.resultsContainer.querySelectorAll('[aria-selected]')
        for (let s of allSelected) {
            s.setAttribute('aria-selected', 'false')
        }
        el?.setAttribute('aria-selected', 'true')
    }
})