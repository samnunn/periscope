import { setAnyInputValue, getAnyInputValue } from './utils.js'


//    _____         _     _____    _ _ _   _                                       
//   |_   _|____  _| |_  | ____|__| (_) |_(_)_ __   __ _                           
//     | |/ _ \ \/ / __| |  _| / _` | | __| | '_ \ / _` |                          
//     | |  __/>  <| |_  | |__| (_| | | |_| | | | | (_| |                          
//     |_|\___/_/\_\\__| |_____\__,_|_|\__|_|_| |_|\__, |                          
//                                                 |___/                           


// TEXT EXPANDER
let shortcutsButton = document.querySelector('#shortcuts-button')
let shortcutsMenu = document.querySelector('#shortcuts-menu')
let shortcutsTable = document.querySelector('#shortcuts-table tbody')
let shortcutsList = [
    { shortcut: '@gas', expansion: 'no issues with anaesthesia (PONV, FHx, airway disaster, unplanned ICU admission, etc.)'},
    { shortcut: '@dent', expansion: 'own teeth, none loose, no caps/crowns/dentures'},
    { shortcut: '@met', expansion: 'walking > 2km and > 2 flights of stairs without dyspnoea or chest pain' },
    { shortcut: '@end', expansion: '- Routine fasting advice provided\n- Withhold mediations as per pharmacy letter' },
    { shortcut: '@rx', expansion: 'Withhold mediations as per pharmacy letter' },
    { shortcut: '@fast', expansion: 'Routine fasting advice provided' },
    { shortcut: '@nsr', expansion: 'normal sinus rhythm with no ischaemic features' },
    { shortcut: '@af', expansion: 'atrial fibrillation with no ischaemic features' },
]
document.body.addEventListener('input', (e) => {
    if (e.target.matches('textarea, input')) {
        let target = e.target
        let initialCursorPosition = target.selectionStart
        let precedingText = target.value.slice(0, initialCursorPosition)

        for (let s of shortcutsList) {
            let shortcut = s['shortcut']
            if (precedingText.endsWith(shortcut)) {
                // get expansion
                let expansion = s['expansion']
                // manufacture new string
                let newText = target.value.slice(0, initialCursorPosition - shortcut.length) + expansion + target.value.slice(initialCursorPosition)
                // replace old string
                target.value = newText
                // fix cursor position
                let newCursorPosition = initialCursorPosition - shortcut.length + expansion.length
                target.setSelectionRange(newCursorPosition, newCursorPosition)
                // trigger input event to trigger proxy updates
                // TODO: should this be applied to the containing <clinic-input>, or is that unncessarily restrictive?
                target.dispatchEvent(new CustomEvent('input', { bubbles: true }))
            }
        }
    }
})
shortcutsButton.addEventListener('click', (e) => {
    shortcutsMenu.showModal()
})
window.addEventListener('load', (e) => {
    for (let s of shortcutsList) {
        shortcutsTable.insertAdjacentHTML('beforeend', `<tr><td>${s['shortcut']}</td><td>${s['expansion'].charAt(0).toUpperCase() + s['expansion'].slice(1).replaceAll("\n", "<br>")}</td></tr>`)
    }
})


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