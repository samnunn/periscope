// DRAGGABLE LISTS
customElements.define('clinic-draglist', class extends HTMLElement {
    constructor () {
        super()
        this.hoveringElement = null
        this.hoverBoxOffset = 0
        this.hoverBoxHeight = 0
        this.list = this.querySelector(this.getAttribute('list-selector')) || this.querySelector('ul, ol')
        this.staleTarget = null
    }
    connectedCallback() {
        // add 'draggable' to an element only when grabbed by the handle
        this.addEventListener('mousedown', (e) => {
            if (e.target.matches('.draghandle')) {
                e.target.closest('clinic-diagnosis').setAttribute('draggable', true)
            }
        })

        // add "dragging" class when picked up
        this.addEventListener('dragstart', (e) => {
            if (this.getItems().includes(e.target)) {
                this.hoveringElement = e.target

                // weird setTimeout() workaround
                setTimeout(() => e.target.classList.add('dragging'), 0)
            }
        })

        // remove "dragging" class when put down
        this.addEventListener('dragend', (e) => {
            if (this.getItems().includes(e.target)) {
                this.hoveringElement.setAttribute('draggable', false)
                this.hoveringElement = null
                e.target.classList.remove('dragging')
            }
        })

        // prevents cursor flickering
        this.addEventListener('dragenter', (e) => e.preventDefault() )

        // applying this listener to `document` prevents the browser-default "float back" animation on dragend
        // doesn't work when the item is dragged outside the document completely, unfortunately
        // only calls `e.preventDefault()` when there is an active hover element
        document.addEventListener('dragover', (e) => {
            if (this.hoveringElement != null) {
                e.preventDefault()

                let nextIntersectingElement = this.getNextIntersectingElement(e.clientY)

                // fire an update event if a change is planned
                if (nextIntersectingElement != this.staleTarget && nextIntersectingElement != this.hoveringElement) {
                    // insert above nextIntersectingElement (if it exists), or append to
                    if (!document.startViewTransition) {
                        if (nextIntersectingElement) {
                            this.list.insertBefore(this.hoveringElement, nextIntersectingElement)
                        } else {
                            this.list.appendChild(this.hoveringElement)
                        }
                        this.dispatchEvent(new Event('clinic:draglist-reorder', {bubbles: true}))
                    } else {
                        document.startViewTransition(() => {
                            if (nextIntersectingElement) {
                                this.list.insertBefore(this.hoveringElement, nextIntersectingElement)
                            } else {
                                this.list.appendChild(this.hoveringElement)
                            }
                            this.dispatchEvent(new Event('clinic:draglist-reorder', {bubbles: true}))
                        })
                    }

                }
                
                this.staleTarget = nextIntersectingElement

            }

        })
    }

    getItems() {
        let elements = this.list.querySelectorAll(this.getAttribute('item-selector')) || this.list.querySelectorAll('li')
        return [...elements]
    }

    getNextIntersectingElement(cursorY) {
        let elementToInsertHoverItemAfter = this.getItems().reduce((previousElement, targetElement) => {
            let targetBox = targetElement.getBoundingClientRect()

            // find mid-point of the target box
            let targetBoxMidpoint = targetBox.top + targetBox.height * 0.5

            // calculate the height delta bewtween midpoint and the cursor
            // when hoverBox is further down than targetBox, offset will be NEGATIVE
            let offset = cursorY - targetBoxMidpoint

            // adjust offset (just seems to look nicer)
            offset = offset - this.hoverBoxHeight * 1

            // select element with smallest negative
            if (offset < 0 && offset > previousElement.offset) {
                return { offset: offset, element: targetElement }
            } else {
                // when there are no elements with a negative offset, no element will be returned
                return { offset: previousElement.offset, element: previousElement.element }
                // going with the more verbose option to make the code more explicit
                // equivalent to `return previousElement`
            }
        }, { offset: Number.NEGATIVE_INFINITY })

        // when there are no elements with a negative offset, no element will be returned
        return elementToInsertHoverItemAfter.element
    }
})