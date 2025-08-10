export function getAnyInputValue(target) {
    // unrwap <clinic-input>'s internal <input> (or <select>, etc)
    if (target.inputElement) target = target.inputElement

    if (target.tagName == 'select' && target.selectedIndex > 0) {
        return target.value
    } else if (target.tagName == 'INPUT' && target.getAttribute('type') == 'checkbox') {
        return target.checked
    } else if (target.tagName == 'P' || target.tagName == 'SPAN') {
        return target.innerText
    } else {
        return target.value
    }
}

export function setAnyInputValue(target, value) {
    // unrwap <clinic-input>'s internal <input> (or <select>, etc)
    if (target.inputElement) target = target.inputElement

    if (target.tagName == 'select' && target.selectedIndex > 0) {
        target.value = value
    } else if (target.tagName == 'INPUT' && target.getAttribute('type') == 'checkbox') {
        target.checked = value
    } else if (target.tagName == 'P' || target.tagName == 'SPAN') {
        target.innerText = value
    } else {
        target.value = value
    }
}