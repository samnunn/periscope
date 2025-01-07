import { gradeOSA, diagnosisExists} from '/static/beagle-utils.js'

export let boneData = [
    {
        static_name: "Additional Suggestions",
		id: "beagle-anonymous",
        auto_hide: true,
        matchStrategy: "any",
        matchRules: [
            (inputData) => true,
        ],
        defaultSuggestions: [
            // {
            //     'name': "foobar",
            // }
        ],
        conditionalSuggestions: [
            // {
            //     matchStrategy: "any",
            //     matchRules: [
            //         (inputData) => parseFloat(inputData['sort-score']) > 1.5,
            //     ],
            //     suggestions: [
            //         {
            //             name: "Generic suggestion",
            //         }
            //     ],
            // },
        ],
    },
    {
        // name: "High predicted mortality",
        dynamic_name: (inputData) => {
            let sort = parseFloat(inputData['sort-score']).toFixed(2)
            return `High predicted mortality (SORT ${sort}%)`
        },
        static_name: "High predicted mortality",
		id: "sort-high",
        matchStrategy: "any",
        matchRules: [
            (inputData) => parseFloat(inputData['sort-score']) >= 0.80,
        ],
        defaultSuggestions: [
            // "foobar",
        ],
        conditionalSuggestions: [
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => parseFloat(inputData['sort-score']) > 1.5,
                ],
                suggestions: [
                    {
                        name: "Admit to HDU/ICU bed",
                    }
                ],
            },
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => {
                        let sort = parseFloat(inputData['sort-score'])
                        if (0.80 <= sort && sort <= 1.5) return true
                    },
                ],
                suggestions: [
                    {
                        name: "Admit to monitored bed",
                    }
                ],
            },
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "High MACE risk",
		id: "beagle-mace-risk",
        auto_hide: true,
        matchStrategy: "any",
        matchRules: [
            (inputData) => true,
        ],
        defaultSuggestions: [
            // "foobar",
        ],
        conditionalSuggestions: [
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => {
                        // preamble
                        let age = parseInt(inputData['age'])
                        let risk = inputData['operation-risk']
                        let riskFactorCount = 0
                        let riskyDiagnoses = [
                            'diagnosis-t1dm',
                            'diagnosis-t2dm',
                            'diagnosis-hypertension',
                            'diagnosis-dyslipidaemia',
                        ]
                        for (let dx of riskyDiagnoses) {
                            if (diagnosisExists(inputData, dx)) riskFactorCount += 1
                        }
                        if (inputData['smoking'] == 'active smoker') riskFactorCount += 1

                        let existingCVD = ['diagnosis-ccf', 'diagnosis-pvd', 'diagnosis-ihd'].some((dx) => diagnosisExists(inputData, dx))
                        
                        // low risk
                        if (risk == 'low') return false

                        // intermediate risk
                        if (risk == 'intermediate') {
                            // and over 65
                            if (age >= 65) return true

                            // and has risk factors
                            if (riskFactorCount >= 3) return true

                            // and has established CVD
                            if (existingCVD == true) return true
                        }

                        // high risk
                        if (risk == 'high') {
                            // and over 45
                            if (age > 45) return true

                            // and over 65
                            if (age >= 65) return true // redundant

                            // and has risk factors
                            if (riskFactorCount >= 3) return true

                            // and has established CVD
                            if (existingCVD == true) return true
                        }
                    },
                ],
                suggestions: [
                    {
                        name: "Pre-operative cardiac biomarker testing",
                        citation: 'esc-2022',
                    },
                    {
                        name: "Pre-operative ECG",
                        citation: 'esc-2022',
                    },
                ],
            },
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => {
                        // preamble
                        let age = parseInt(inputData['age'])
                        let risk = inputData['operation-risk']
                        let riskFactorCount = 0
                        let riskyDiagnoses = [
                            'diagnosis-t1dm',
                            'diagnosis-t2dm',
                            'diagnosis-hypertension',
                            'diagnosis-dyslipidaemia',
                        ]
                        for (let dx of riskyDiagnoses) {
                            if (diagnosisExists(inputData, dx)) riskFactorCount += 1
                        }
                        if (inputData['smoking'] == 'active smoker') riskFactorCount += 1

                        let existingCVD = ['diagnosis-ccf', 'diagnosis-pvd', 'diagnosis-ihd'].some((dx) => diagnosisExists(inputData, dx))
                        
                        // low risk
                        if (risk == 'low') return false

                        // intermediate risk
                        if (risk == 'intermediate') {
                            // and over 65
                            if (age >= 65) return true

                            // and has risk factors
                            if (riskFactorCount >= 3) return true

                            // and has established CVD
                            if (existingCVD == true) return true
                        }

                        // high risk
                        if (risk == 'high') {
                            // and over 65
                            if (age >= 65) return true

                            // and has risk factors
                            if (riskFactorCount >= 3) return true

                            // and has established CVD
                            if (existingCVD == true) return true
                        }
                    },
                ],
                suggestions: [
                    {
                        name: "Pre-operative cardiac functional testing",
                        citation: 'esc-2022',
                    },
                ],
            },

        ]
    },
    {
        static_name: "High PONV risk",
        dynamic_name: (inputData) => {
            return `High PONV risk (Apfel ${parseInt(inputData['apfel-score'])}/4)`
        },
		id: "beagle-ponv",
        citation: "https://www.ashp.org/-/media/assets/policy-guidelines/docs/endorsed-documents/endorsed-documents-fourth-consensus-guidelines-postop-nausea-vomiting.pdf",
        matchStrategy: "any",
        matchRules: [
            (inputData) => parseInt(inputData['apfel-score']) > 2,
        ],
        defaultSuggestions: [
            // "Minimise use of nitrous oxide, volatile anaesthetics, and high-dose neostigmine",
            // "Utilise regional anaesthesia if possible",
            {
                name: "Maximise opioid-sparing analgesia",
                citation: 'apfel-interpretation',
            },
        ],
        conditionalSuggestions: [
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => [1,2].includes(parseInt(inputData['apfel-score'])),
                ],
                suggestions: [
                    {
                        name: "Give two anti-emetics",
                        citation: 'apfel-interpretation',
                    },
                ],
            },
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => [3,4].includes(parseInt(inputData['apfel-score'])),
                ],
                suggestions: [
                    {
                        name: "Give 3-4 anti-emetics",
                        citation: 'apfel-interpretation',
                    },
                ],
            },
        ],
        severityGrades: [],
    },
    {
        static_name: "T2DM",
		id: "beagle-t2dm",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-t2dm'),
            // (inputData) => /sulin|metf|iclaz|glipin|glargine|janu|floz|xig|jardia/i.test(inputData['rx']),
            // (inputData) => inputData['rcri-insulin'] == true,
        ],
        defaultSuggestions: [
            // "Default suggestion for diabetic patients",
            {
                name: "Check BSL on arrival",
                citation: 'ads-anzca-2022',
            },
        ],
        conditionalSuggestions: [
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => parseFloat(inputData['hba1c']) > 9.0,
                    (inputData) => /no/i.test(inputData['diagnosis-t2dm']['Hypoglycaemia awareness']),
                ],
                suggestions: [
                    {
                        name: "Endocrinology referral for pre-operative optimisation",
                        citation: 'ads-anzca-2022-referral-advice',
                    },
                ],
            },
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => {
                        if (inputData['hba1c'] == '' || inputData['hba1c'] == undefined) {
                            return true 
                        } else {
                            return false
                        }
                    },
                ],
                suggestions: [
                    {
                        name: "Check HbA1c",
                    },
                ],
            },
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "T1DM",
		id: "beagle-t1dm",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-t1dm'),
        ],
        defaultSuggestions: [
            {
                name: "Check BSL and ketones on arrival",
                citation: 'ads-anzca-2022',
            },
        ],
        conditionalSuggestions: [
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => parseFloat(inputData['hba1c']) > 9.0,
                    (inputData) => /no/i.test(inputData['diagnosis-t1dm']['Hypoglycaemia awareness']),
                ],
                suggestions: [
                    {
                        name: "Endocrinology referral for pre-operative optimisation",
                        citation: 'ads-anzca-2022-referral-advice',
                    },
                ],
            },
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => {
                        if (inputData['hba1c'] == '' || inputData['hba1c'] == undefined) {
                            return true 
                        } else {
                            return false
                        }
                    },
                ],
                suggestions: [
                    {
                        name: "Check HbA1c",
                    },
                ],
            },
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "SGTL2i in use",
		id: "beagle-flozin",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /floz|xig|jard/i.test(inputData['rx']),
        ],
        defaultSuggestions: [
            // "Default suggestion for patients on SGLT2i",
            {
                name: "Check ketones on arrival",
                citation: 'ads-anzca-2022',
            },
        ],
        conditionalSuggestions: [
        ],
    },
    {
        static_name: "Potentially challenging airway",
		id: "beagle-difficult-airway",
        matchStrategy: "any",
        matchRules: [
            (inputData) => parseInt(inputData['mallampati']) >= 3,
            (inputData) => parseInt(inputData['mouth-opening']) <= 3,
            (inputData) => parseInt(inputData['tmd']) <= 6,
            (inputData) => inputData['jaw-protrusion'].toLowerCase() == "c",
            (inputData) => /diff|2|two|gued|opa|npa|naso|oro|fail/i.test(inputData['bvm']),
            (inputData) => /diff|seal|poor|fail/i.test(inputData['lma']),
            (inputData) => /diff|3|4|AFO|CICO|FONA|fail/i.test(inputData['ett']),
            (inputData) => /moderate|severe|immobile/i.test(inputData['neckrom']),
            (inputData) => /won/i.test(inputData['beard']),
            (inputData) => /y/i.test(inputData['diagnosis-rheumatoid-arthritis']['C-Spine involvement'])
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Possible difficult FONA",
		id: "beagle-difficult-fona",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /diff|impalpable/i.test(inputData['cricothyroid']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
    },
    {
        static_name: "Known analphylaxis",
		id: "beagle-analphylaxis",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-anaphylaxis'),
            (inputData) => /anaph|(?<!pro.+)ylaxis|(?<!pro.+)ylact/i.test([inputData['pmhx'], inputData['rx'], inputData['allergies']].join(' ')),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Antibiotic allergy",
		id: "beagle-antibiotic-allergy",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /cilli|illin|cefa|cepha|mycin|ocin/i.test(inputData['allergies']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Obesity",
		id: "beagle-obesity",
        matchStrategy: "any",
        matchRules: [
            (inputData) => parseFloat(inputData['bmi']) >= 30,
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "GORD",
		id: "beagle-gord",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-gord'),
            (inputData) => /yes/i.test(inputData['gord']),
            (inputData) => /prazol|somac|nexium|pariet|esopre|sozol/i.test(inputData['rx']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "OSA",
        dynamic_name: (inputData) => {
            if (diagnosisExists(inputData, 'diagnosis-osa')) {
                if (/y/i.test(inputData['diagnosis-osa']['CPAP'])) {
                    return "Diagnosed OSA (on CPAP)"
                } else {
                    return "Diagnosed OSA (not on CPAP)"
                }
            }
            let risk = gradeOSA(inputData)
            return `${risk.charAt(0).toUpperCase() + risk.slice(1)} OSA risk`
        },
		id: "beagle-osa-stopabang-risk",
        matchStrategy: "any",
        matchRules: [
            (inputData) => {
                let risk = gradeOSA(inputData)
                if (risk == 'intermediate' || risk == 'high') return true
            },
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Impaired renal function",
		id: "beagle-renal-function",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-ckd'),
            (inputData) => /\d{3}/i.test(inputData['uec']),
            (inputData) => inputData['rcri-creatinine'] == true,
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Active smoker",
		id: "beagle-active-smoker",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /active/i.test(inputData['smoking']),
        ],
        defaultSuggestions: [
            {
                name: "Advised to cease smoking before surgery",
            },
            {
                name: "Offered referral smoking cessation assistance",
            },
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Anticoagulated",
		id: "beagle-anticoagulated",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /y/i.test(inputData['diagnosis-atrial-fibrillation']['Anticoagulated']),
            (inputData) => /xab|atran|warf|couma|eliq|xera|pradax/i.test(inputData['rx']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Poor cardiorespiratory fitness",
		id: "beagle-unfit",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /less/i.test(inputData['mets']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Unable to lay flat",
		id: "beagle-noflat",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /unable/i.test(inputData['flat']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Opioid tolerance",
		id: "beagle-opioid-tolerance",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /morph|trama|tapen|lexi|bupr|adone|targin|oxyc/i.test(inputData['rx']),
            (inputData) => /y/i.test(inputData['diagnosis-chronic-pain']['Opioid tolerance']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Chronic pain",
		id: "beagle-chronic-pain",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /morph|trama|tapen|lexi|bupr|adone|targin|oxyc/i.test(inputData['rx']),
            (inputData) => diagnosisExists(inputData, 'diagnosis-chronic-pain'),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Vasculopath",
		id: "beagle-ihd",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-ihd'),
            (inputData) => diagnosisExists(inputData, 'diagnosis-pdv'),
            (inputData) => inputData['rcri-ihd'] == true,
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Heart failure",
		id: "beagle-heart-failure",
        matchStrategy: "any",
        matchRules: [
            // (inputData) => /hf|hfref|hfpef|heart failure|ccf|chf/i.test(inputData['pmhx']),
            (inputData) => diagnosisExists(inputData, 'diagnosis-ccf'),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Recent illness",
		id: "beagle-recent-illness",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /y/i.test(inputData['recently-ill']),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "Asthmatic",
        dynamic_name: (inputData) => {
            let parenthetical = []

            // check control
            if (
                /n/i.test(inputData['diagnosis-asthma']['Daytime symptoms']) &&
                /n/i.test(inputData['diagnosis-asthma']['Night symptoms']) &&
                /n/i.test(inputData['diagnosis-asthma']['Heavy reliever use']) &&
                /n/i.test(inputData['diagnosis-asthma']['Activity limitation'])
            ) {
                parenthetical.push("well controlled")
            }

            // check NSAID reactivity
            if (/y/i.test(inputData['diagnosis-asthma']['NSAID reactive'])) {
                parenthetical.push("NSAID-reactive")
            }

            if (parenthetical.length == 0) {
                return "Asthmatic"
            }

            return `Asthmatic (${parenthetical.join(", ")})`
        },
		id: "beagle-asthmatic",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-asthma'),
        ],
        defaultSuggestions: [
        ],
        conditionalSuggestions: [
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => /y/i.test(inputData['diagnosis-asthma']['NSAID reactive']),
                ],
                suggestions: [
                    {
                        name: "Avoid NSAIDs",
                    },
                ],
            },
            {
                matchStrategy: "any",
                matchRules: [
                    (inputData) => {
                        if (/y/i.test(inputData['diagnosis-asthma']['Daytime symptoms'])) return true
                        if (/y/i.test(inputData['diagnosis-asthma']['Night symptoms'])) return true
                        if (/y/i.test(inputData['diagnosis-asthma']['Heavy reliever use'])) return true
                        if (/y/i.test(inputData['diagnosis-asthma']['Activity limitation'])) return true
                        return false
                    },
                ],
                suggestions: [
                    {
                        name: "Referral for optimisation of asthma control",
                    },
                ],
            },
        ],
        severityGrades: [
        ],
    },
    {
        static_name: "ICD in situ",
		id: "beagle-icd",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-icd'),
        ],
    },
    {
        static_name: "Pacemaker in situ",
		id: "beagle-pacemaker",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-pacemaker'),
        ],
    },
    {
        static_name: "Immune-suppressed",
		id: "beagle-immune-suppressed",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /y/i.test(inputData['diagnosis-rheumatoid-arthritis']['Immune suppressed']),
        ],
    },
    {
        static_name: "COPD",
		id: "beagle-copd",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-copd'),
        ],
    },
    {
        static_name: "Aortic stenosis",
		id: "beagle-aortic-stenosis",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-aortic-stenosis'),
        ],
    },
    {
        static_name: "Malignant Hyperthermia",
		id: "beagle-malignant-hyperthermia",
        matchStrategy: "any",
        matchRules: [
            (inputData) => /malig/i.test(inputData['fhx-anaesthesia-details']),
            (inputData) => /mh/i.test(inputData['fhx-anaesthesia-details']),
        ],
    },
    {
        static_name: "Cirrhosis",
        dynamic_name: (inputData) => {
            let cp = inputData['diagnosis-cirrhosis']['Child-Pugh']
            if (!cp) return "Cirrhosis"
            return `Child-Pugh ${cp.slice(0,2)} Cirrhosis`
        },
		id: "beagle-cirrhosis",
        matchStrategy: "any",
        matchRules: [
            (inputData) => diagnosisExists(inputData, 'diagnosis-cirrhosis'),
        ],
    },
    // {
    //     name: "Cardiovascular Disease",
    //     citation: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines",
    //     matchStrategy: "any",
    //     matchRules: [
    //         (inputData) => true,
    //     ],
    //     defaultSuggestions: [
    //         // "foobar",
    //     ],
    //     conditionalSuggestions: [
    //         {
    //             matchStrategy: "all",
    //             matchRules: [
    //                 (inputData) => inputData['operation-risk'] == 'high',
    //                 (inputData) => parseInt(inputData['age']) > 45,
    //             ],
    //             suggestions: [
    //                 "Recommendations: over 45 and high risk",
    //             ],
    //         },
    //     ],
    //     severityGrades: [
    //     ],
    // },
]