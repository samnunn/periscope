export function runRuleSafely(rule, inputData) {
    try {
        if (rule(inputData) == true) return true
    } catch {
        return false
    }
    return false
}

// used in beagle-data.js
export function diagnosisExists(inputData, diagnosis) {
    return Object.keys(inputData).some( (k) => k.includes(diagnosis))
}

// used in beagle-data.js
export function gradeOSA(inputData) {
    let score = inputData['stopbang-score']
    let risk
    if (score >= 0 && score <=2) risk = 'low'
    if (score >= 3 && score <=4) risk = 'intermediate'
    if (score >= 5) risk = 'high'


    let stopCriteria = [inputData['stopbang-snorer'], inputData['stopbang-tiredness'], inputData['stopbang-apnoea'], inputData['stopbang-hypertensive']]
    let highRiskCriteria = [inputData['stopbang-bmi-35'], inputData['stopbang-neck'], inputData['stopbang-male']] // BANG criteria minus age
    stopCriteria = stopCriteria.filter((v) => v == true)
    highRiskCriteria = highRiskCriteria.filter((v) => v == true)
    if (stopCriteria.length >= 2 && highRiskCriteria.length >= 1) risk = 'high'

    return risk
}