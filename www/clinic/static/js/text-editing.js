import { setAnyInputValue, getAnyInputValue } from '/static/js/utils.js'

// AUTO DOT POINTS
let validDotPoints = ['- ', '--> ']
document.body.addEventListener('keydown', (e) => {
    if (!e.target.matches('textarea')) return

    if (e.key == "Enter") {
        let textarea = e.target
        let cursorPosition = textarea.selectionStart
        let currentLine = textarea.value.substring(0, cursorPosition).split('\n').pop().trim()
        let dotPoint
        for (let d of validDotPoints) {
            if (currentLine.startsWith(d)) {
                dotPoint = d
                break
            }
        }
    
        if (dotPoint) {
            let newLineText = `\n${dotPoint}`
            let oldValue = getAnyInputValue(textarea)
            let newValue = oldValue.substring(0, cursorPosition) + newLineText + oldValue.substring(cursorPosition)
            setAnyInputValue(textarea, newValue)
            // TODO: should this be applied to the containing <clinic-input>, or is that unncessarily restrictive?
            textarea.dispatchEvent(new CustomEvent('input', { bubbles: true }))

            textarea.selectionStart = cursorPosition + newLineText.length
            textarea.selectionEnd = cursorPosition + newLineText.length
            
            e.preventDefault() // suppresses duplicate newline
        }
    }

})