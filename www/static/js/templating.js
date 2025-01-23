import { citationSnippets } from '/static/data/citation-data.js'
import { allPublications } from '/static/data/publication-data.js'

//    / ___|___  _ __  ___  ___ _ __ | |_                                          
//   | |   / _ \| '_ \/ __|/ _ \ '_ \| __|                                         
//   | |__| (_) | | | \__ \  __/ | | | |_                                          
//    \____\___/|_| |_|___/\___|_| |_|\__|                                         
                                 

const consentSnippets = {
    'consent-ga': `Discussed risks and benefits of GA by prevalence.  

- VERY COMMON: sore throat (45% ETT, 20% LMA), PONV
- COMMON: minor lip/tongue injury (1 in 100)
- RARE: damage to teeth, severe allergy, nerve damage
- VERY RARE: awareness, death (1 in 100,000 ASA 1, 1 in 50,000 for all ASAs)

Specific risks including aspiration, LRTI, post op confusion, covert CVA with possible cognitive changes, temporary memory loss, myocardial infarction also discussed.`,
    'consent-sedation': `Consented for sedation, with risks discussed including death, failure, allergy, awareness, pain and need to progress to GA with its associated risks.`,
    'consent-regional': `Regional risks discussed - superficial skin infection, bleeding, nerve damage (parasthesia and/or paralysis), failure of block, damage to surrounding structures, adverse drug reactions.`,
    'consent-neuraxial': `Discussed risks and benefits of neuraxial anaesthesia. Specifically, nausea and vomiting, backache, headache, prolonged numbness or tingling, hypotension, urinary retention, nerve injury (1 in 500 temporary, ~1 in 25,000 permanent) and failure of regional technique.`,
    'consent-blood': `Consented to blood products.`,
    'consent-artline': `Consented to arterial line placement. Risks discussed include infection, bleeding, nerve damage (parasthesia and/or paralysis, damage to surrounding structures, adverse drug reactions, compartment syndrome, distal ischaemia.`,
    'consent-cvc': `Consented to central line placement. Risks discussed include infection, bleeding, arterial puncture, pneumothorax, thrombosis, air embolism, pain, vessel damage, arrhythmia.`,
}

//    _____                    _       _   _                                       
//   |_   _|__ _ __ ___  _ __ | | __ _| |_(_)_ __   __ _                           
//     | |/ _ \ '_ ` _ \| '_ \| |/ _` | __| | '_ \ / _` |                          
//     | |  __/ | | | | | |_) | | (_| | |_| | | | | (_| |                          
//     |_|\___|_| |_| |_| .__/|_|\__,_|\__|_|_| |_|\__, |                          
//                      |_|                        |___/                                     

let outputTemplates = {
'details': `# Patient Details
- Name: {{patient-fullname}}
- UMRN: {{patient-hospital-id}}
- Age: {{patient-age}}
- Sex: {{patient-sex}}
- Appointment type: {{appointment-mode}}
- Height: {{patient-height}}
- Weight: {{patient-weight}}
- BMI: {{bmi}}
- Operation: {{freetext-operation}}`,

'medicalhx': `# PMHx
{{pmhx}}

# Fitness
- Achieving {{patient-mets}} METs
- {{patient-flat}}
- Exercise tolerance: {{patient-mets-details}}
- Clinical frailty score: {{rockwood-cfs}}

# SHx
- Smoking: {{smoking-status}}
--> {{smoking-details}}
- etOH: {{alcohol-freetext}}
- Illicit drugs: {{drugs-freetext}}
- Occupation: {{occupation-freetext}}
- Functional status: {{functional-freetext}}
{{other-shx}}`,

'rx': `# Medications
{{medications-freetext}}

# Supplements
{{supplements-freetext}}

# Allergies
{{allergies-freetext}}`,

'gashx': `# Previous Anaesthesia
{{previous-anaesthesia-freetext}}

## Anaesthesia Summary
- BVM: {{previous-bvm}}
- LMA: {{previous-lma}}
- ETT: {{previous-ett}}
- Complications: {{previous-anaesthesia-complications}}
- {{previous-anaesthesia-fhx}}
--> {{previous-anaesthesia-fhx-details}}

# Airway Assessment
- Dentition: {{airway-dentition}}
- Mallampati: {{airway-mallampati}}
- Mouth opening: {{airway-mouth-opening}} cm
- Thyromental distance: {{airway-tmd}} cm
- Cricothyroid: {{airway-cricothyroid}}
- Neck ROM: {{airway-neckrom}}
- Bearded: {{airway-beard}}
- Jaw protrusion: {{airway-jaw-protrusion}}
- Vein quality: {{vein-quality}}

# Other Findings
- Heart sounds: {{examination-heart}}
- Lung sounds: {{examination-lungs}}
{{examination-freetext}}`,

'ix': `# Investigations
- Source: {{investigations-source}}
- FBC: {{investigations-fbc}}
- UEC: {{investigations-uec}}
- LFT: {{investigations-lft}}
- HbA1c: {{investigations-hba1c}}%
- Iron studies: {{investigations-haematinics}}
- Coags: {{investigations-coags}}
- ECG: {{investigations-ecg}}
{{investigations-other}}`,

'consent': `# Informed Consent
{{consent-output}}

## Special Notes
{{consent-notes}}`,

'risk': `# Risk Assessment
- ASA: {{asa}}
- STOP-BANG: {{stopbang-score}}/8
--> {{stopbang-interpretation}}
- Apfel: {{apfel-score}}/4
--> {{apfel-interpretation}}
- RCRI: {{rcri-score}}/6
--> {{rcri-interpretation}}
- SORT
--> {{sort-score}}% 30-day mortality`,

'plan': `# Key Issues
{{issues}}

# Anaesthetic Plan
{{plan}}

# Medications and Fasting
{{medication}}

# Cited Guidelines
{{citations}}`
}

// RENDER
export function getRenderedSection(id) {
    let template = outputTemplates[id]

    // special case: consent
    if (id == 'consent') {
        let consentSwitches = document.querySelectorAll('section#consent clinic-input:has(input[type="checkbox"]:checked)')
        
        let consent = ''
        for (let s of consentSwitches) {
            let consentType = s.getAttribute('clinic-parameter')
            let consentSnippet = consentSnippets[consentType]
            consent += consentSnippet
            consent += '\n\n'
        }
        consent = consent.trim()
        template = template.replace('{{consent-output}}', consent)
    }

    // special case: pmhx
    if (id == 'medicalhx') {
        let output = ""

        for (let d of document.querySelectorAll('clinic-diagnosis')) {
            output += d.renderText()
            output += '\n'
        }

        output = output.trim()

        template = template.replace('{{pmhx}}', output)
    }

    // special case: citations
    if (id == 'plan' && document.persistentDataProxy['citations']?.length > 0) {
        let output = ""
        let count = 1

        let publications = []
        for (let c of document.persistentDataProxy['citations']) {
            let citation = citationSnippets.find(s => s.id == c)
            if (!citation) continue
            let publication = allPublications.find((p) => p.id == citation.publication)
            if (!publication) continue
            if (!publications.includes(publication)) publications.push(publication)
        }
        for (let p of publications) {
            output += `${count}. ${p.ugly}\n`
            count += 1
        }

        template = template.replace('{{citations}}', output)
    }

    // general case
    for (let c of template.matchAll(/\{\{(.*?)\}\}/gmi)) {
        let stringToReplace = c[0]
        let dataKey = c[1]
        let dataValue = document.persistentDataProxy[dataKey]
        if (!dataValue) continue
        template = template.replace(stringToReplace, dataValue)
    }

    // delete lines containing unreplaced values
    for (let l of template.matchAll(/^.*({{.*?}}).*$\n?/gm)) {
        template = template.replace(l[0], '')
    }

    // remove ## headers with nothing under them
    for (let h of template.matchAll(/^#* .+(?=\n*$)(?!\n[^#\s])\n*/gm)) {
        template = template.replace(h[0], '')
    }
    
    return template
}

export function renderEntireDocument() {
    // Create a text dump
    let textDump = ''
    for (let s of document.querySelectorAll('section')) {
        let renderedTemplate = getRenderedSection(s.id)
        textDump += renderedTemplate.trim() + '\n\n'
    }
    return textDump
}
document.renderEntireDocument = () => renderEntireDocument() // make available from main thread

document.addEventListener('mousedown', (e) => {
    if (e.target.matches('div.section-topper, div.section-topper *')) {
        // prevent stealing focus
        e.preventDefault()
        
        // copy contents
        let output = getRenderedSection(e.target.closest('section').id)
        navigator.clipboard.writeText(output.trim())
    }
})