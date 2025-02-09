import { setAnyInputValue } from './utils.js'

//     ____      _            _       _                                            
//    / ___|__ _| | ___ _   _| | __ _| |_ ___  _ __ ___                            
//   | |   / _` | |/ __| | | | |/ _` | __/ _ \| '__/ __|                           
//   | |__| (_| | | (__| |_| | | (_| | || (_) | |  \__ \                           
//    \____\__,_|_|\___|\__,_|_|\__,_|\__\___/|_|  |___/                           
   
let scoreInterpretationFunctions = {
    'apfel': (score) => {
        let risk
        if (score == 0) risk = '10'
        if (score == 1) risk = '21'
        if (score == 2) risk = '39'
        if (score == 3) risk = '61'
        if (score == 4) risk = '79'
        return `${risk}% 24-hour PONV risk`
    },
    'rcri': (score) => {
        let risk
        if (score == 0) risk = '3.9'
        if (score == 1) risk = '6.0'
        if (score == 2) risk = '10.1'
        if (score >= 3) risk = '15'
        return `${risk}% 30-day MACE risk`
    },
    'stopbang': (score) => {
        let risk
        if (score >= 0 && score <=2) risk = 'Low'
        if (score >= 3 && score <=4) risk = 'Intermediate'
        if (score >= 5) risk = 'High'
        return `${risk} OSA risk`
    },
}

function updateCalculator(c) {
    // get score
    let score = 0
    for (let b of c.checkboxes) {
        score += b.checked ? 1 : 0
    }

    // save score
    document.persistentDataProxy[c.output_parameter] = score

    // get interpretation
    if (c.interpreter && c.interpretation) {
        setAnyInputValue(c.interpretation, c.interpreter(score))
    }
}

let allCalculators = document.querySelectorAll('[clinic-calculator]')
window.addEventListener("DOMContentLoaded", (e) => {
    for (let c of allCalculators) {
        // set up element handles
        c.checkboxes = c.querySelectorAll('input[type="checkbox"]')
        c.output_parameter = c.getAttribute('clinic-calculator-parameter')
        c.interpretation = c.querySelector('[clinic-calculator-interpretation]')

        // find interpreter
        let interpreter = c.getAttribute('clinic-calculator-interpreter') || false
        if (interpreter && Object.keys(scoreInterpretationFunctions).includes(interpreter)) {
            c.interpreter = scoreInterpretationFunctions[interpreter]
        }

        // HACK: update checkboxes when clinic:value-changed is fired
        // TODO: fix this awful hack
        let parametersOfInterest = []
        for (let b of c.checkboxes) {
            let input = b.closest('[clinic-parameter]')
            let parameter = input.getAttribute('clinic-parameter')
            parametersOfInterest.push(parameter)
        }
    
        // update score and interpretation on input
        
        updateCalculator(c) // inital

        document.addEventListener('clinic:value-changed', (e) => {
            if (!parametersOfInterest.includes(e.detail.key)) return
            updateCalculator(c)
        })

        // trigger initial update
        c.dispatchEvent(new CustomEvent('clinic:user-input'))
    }
})