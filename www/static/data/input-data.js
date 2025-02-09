let allInputs = [
    // TODO: remove the need for 'autofocus' in patient-age
    {
        'ugly_name': 'patient-age',
        'pretty_name': 'Age',
        'output_name': 'Age',
        'search_name': 'Age',
        'html': `
            <input autofocus type="number" min="0" max="125" step="1">
        `,
    },
    {
        'ugly_name': 'patient-sex',
        'pretty_name': 'Sex',
        'output_name': 'Sex',
        'search_name': 'Sex / Gender',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option selected value=""></option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'patient-asa',
        'pretty_name': 'ASA',
        'output_name': 'ASA',
        'search_name': 'ASA Physical Status Score',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'patient-height',
        'pretty_name': 'Height (cm)',
        'output_name': 'Height',
        'search_name': 'Height',
        'html': `
            <input type="number" step="0.1" min="0" max="300">
        `,
    },
    {
        'ugly_name': 'patient-weight',
        'pretty_name': 'Weight (kg)',
        'output_name': 'Weight',
        'search_name': 'Weight',
        'html': `
            <input type="number" step="0.1" min="0" max="400">
        `,
    },
    {
        'ugly_name': 'patient-bmi',
        'pretty_name': 'BMI (auto)',
        'output_name': 'BMI',
        'search_name': 'BMI',
        'html': `
            <input type="text" readonly tabindex="-1">
        `,
    },
    {
        'ugly_name': 'appointment-mode',
        'pretty_name': 'Mode',
        'output_name': 'Appointment mode',
        'search_name': 'Mode (telephone/face-to-face)',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="face-to-face">Face-to-face</option>
                    <option value="telephone">Telephone</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'operation-freetext',
        'pretty_name': 'Operation',
        'output_name': 'Operation',
        'search_name': 'Operation Name',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'operation-risk',
        'pretty_name': 'Risk',
        'output_name': 'Operation risk',
        'search_name': 'Operation Risk',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="low">Low</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="high">High</option>
                </select>
            </div>
        `,
        'citation': 'esc-2022-severity',
    },
    {
        'ugly_name': 'patient-mets',
        'pretty_name': 'METs',
        'output_name': 'METs',
        'search_name': 'Metabolic Equivalents (METs)',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="LESS than 4">&lt; 4</option>
                    <option value="approximately 4">~ 4</option>
                    <option value="more than 4">&gt; 4</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'patient-flat',
        'pretty_name': 'Can Lie Flat',
        'output_name': 'Can lie flat',
        'search_name': 'Can Lie Flat',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="Able to lay flat comfortably">Yes</option>
                    <option value="UNABLE to lay flat comfortably">No</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'patient-mets-details',
        'pretty_name': 'Exercise Tolerance',
        'output_name': 'Exercise tolerance',
        'search_name': 'Exercise Tolerance',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'rockwood-cfs',
        'pretty_name': 'Frailty Score',
        'output_name': 'Rockwood CFS',
        'search_name': 'Rockwood Clinical Frailty Score',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="1 (very fit)">1 – Very Fit</option>
                    <option value="2 (well)">2 – Well</option>
                    <option value="3 (managing well)">3 – Managing Well</option>
                    <option value="4 (vulnerable)">4 – Vulnerable</option>
                    <option value="5 (mildly frail)">5 – Mildly Frail</option>
                    <option value="6 (moderately frail)">6 – Moderately Frail</option>
                    <option value="7 (severely frail)">7 – Severely Frail</option>
                    <option value="8 (very severely frail)">8 – Very Severely Frail</option>
                    <option value="9 (terminally ill)">9 – Terminally Ill</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'antiplatelet-use',
        'pretty_name': 'Antiplatelets',
        'output_name': 'Antiplatelet use',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="single">Single</option>
                    <option value="dual">Dual</option>
                    <option value="none">None</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'smoking-status',
        'pretty_name': 'Smoking',
        'output_name': 'Smoking status',
        'search_name': 'Smoking Status',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="active smoker">Active smoker</option>
                    <option value="ex-smoker">Ex-smoker</option>
                    <option value="never smoked">Never smoked</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'smoking-details',
        'pretty_name': 'Smoking Details',
        'output_name': 'Smoking details',
        'html': `<input type="text" placeholder="Details">`,
    },
    {
        'ugly_name': 'alcohol-freetext',
        'pretty_name': 'Alcohol',
        'output_name': 'Alcohol',
        'search_name': 'Alcohol (etOH) Use',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'drugs-freetext',
        'pretty_name': 'Drugs',
        'output_name': 'Drugs',
        'search_name': 'Substance Use (Drugs)',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'occupation-freetext',
        'pretty_name': 'Occupation',
        'output_name': 'Occupation',
        'search_name': 'Employment / Occupation',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'functioning-freetext',
        'pretty_name': 'Functioning',
        'output_name': 'Functioning',
        'search_name': 'Functioning and ADLs',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'other-shx',
        'pretty_name': 'Other',
        'output_name': 'Other',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'medications-freetext',
        'pretty_name': 'Current Medications',
        'output_name': 'Current medications',
        'search_name': 'Current Medications (Rx)',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'supplements-freetext',
        'pretty_name': 'Supplements',
        'output_name': 'Supplements',
        'search_name': 'Supplements',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'allergies-freetext',
        'pretty_name': 'Adverse Drug Reactions',
        'output_name': 'Allergies',
        'search_name': 'Adverse Drug Reactions (Allergies)',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'previous-bvm',
        'pretty_name': 'BVM',
        'output_name': 'BVM',
        'search_name': 'Bag Valve Mask (BVM)',
        'html': `<input type="text" placeholder="Difficulty, adjuncts">`,
    },
    {
        'ugly_name': 'previous-lma',
        'pretty_name': 'LMA',
        'output_name': 'LMA',
        'search_name': 'Laryngeal Mask Airway (LMA)',
        'html': `<input type="text" placeholder="Size, type">`,
    },
    {
        'ugly_name': 'previous-ett',
        'pretty_name': 'ETT',
        'output_name': 'ETT',
        'search_name': 'Endotracheal Intubation (ETT)',
        'html': `<input type="text" placeholder="Scope, view, BURP">`,
    },
    {
        'ugly_name': 'previous-anaesthesia-freetext',
        'pretty_name': 'Previous Anaesthesia',
        'output_name': 'Previous anaesthesia',
        'search_name': 'Surgical and Anaesthetic History',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'previous-anaesthesia-complications',
        'pretty_name': 'Complications',
        'output_name': 'Complications',
        'search_name': 'Complications from Anaesthesia',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'previous-anaesthesia-fhx',
        'pretty_name': 'Family Issues with Anaesthesia',
        'output_name': 'Complications',
        'search_name': 'Family History (FHx) of Issues with Anaesthesia',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="Has a FHx of issues with anaesthesia">Yes</option>
                    <option value="No known FHx of issues with anaesthesia">No</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'previous-anaesthesia-fhx-details',
        'pretty_name': 'Details of Family Issues with Anaesthesia',
        'output_name': 'Details of Family Issues with Anaesthesia',
        'html': `<input type="text" placeholder="Details">`,
    },
    {
        'ugly_name': 'airway-dentition',
        'pretty_name': 'Dentition',
        'output_name': 'Dentition',
        'search_name': 'Dentition/Teeth Assessment',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'airway-mallampati',
        'pretty_name': 'Mallampati',
        'output_name': 'Mallampati',
        'search_name': 'Mallampati Score',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'airway-mouth-opening',
        'pretty_name': 'Mouth Opening (cm)',
        'output_name': 'Mouth opening',
        'search_name': 'Mouth Opening',
        'html': `<input type="number" min="0" max="7" step="1">`,
    },
    {
        'ugly_name': 'airway-tmd',
        'pretty_name': 'TMD (cm)',
        'output_name': 'Thyromental distance',
        'search_name': 'Thyromental Distance',
        'html': `<input type="number" min="0" max="12" step="1">`,
    },
    {
        'ugly_name': 'airway-cricothyroid',
        'pretty_name': 'Cricothyroid',
        'output_name': 'Cricothyroid membrane',
        'search_name': 'Cricothyroid Membrane',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="easily palpable">Easily palpable</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="difficult">Difficult to locate</option>
                    <option value="IMPALPABLE">Impalpable</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'airway-jaw-protrusion',
        'pretty_name': 'Jaw Protrusion',
        'output_name': 'Jaw protrusion',
        'search_name': 'Jaw Protrusion Class',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="A">A</option>
                    <option value="B">B</option>No
                    <option value="C">C</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'airway-neckrom',
        'pretty_name': 'Neck ROM',
        'output_name': 'Neck ROM',
        'search_name': 'Neck Range of Motion (ROM)',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="normal">Normal</option>
                    <option value="mildly limited">Mildly limited</option>
                    <option value="moderately limited">Moderately limited</option>
                    <option value="severely limited">Severely limited</option>
                    <option value="immobile">Immobile</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'airway-beard',
        'pretty_name': 'Beard',
        'output_name': 'Beard',
        'search_name': 'Beard',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="YES, will trim">Will trim</option>
                    <option value="YES, won't trim">Won't trim</option>
                    <option value="no">No</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'vein-quality',
        'pretty_name': 'Vein Quality',
        'output_name': 'Vein Quality',
        'search_name': 'Vein Quality',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                    <option value="very poor">Very poor</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'examination-heart',
        'pretty_name': 'Heart',
        'output_name': 'Heart sounds',
        'search_name': 'Heart Sounds',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'examination-lungs',
        'pretty_name': 'Lungs',
        'output_name': 'Lung sounds',
        'search_name': 'Lung Sounds',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'examination-freetext',
        'pretty_name': 'Other Findings',
        'output_name': 'Other examination findings',
        'search_name': 'Other Examination Findings',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'investigations-source',
        'pretty_name': 'Source',
        'output_name': 'Source',
        'search_name': 'Investigations Source',
        'html': `<input type="text" placeholder="When and where were these tests done?">`,
    },
    {
        'ugly_name': 'investigations-fbc',
        'pretty_name': 'FBC',
        'output_name': 'FBC',
        'search_name': 'Full Blood Count (FBC)',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'investigations-uec',
        'pretty_name': 'UEC',
        'output_name': 'UEC',
        'search_name': 'Urea and Electrolytes (UEC)',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'investigations-lft',
        'pretty_name': 'LFT',
        'output_name': 'LFT',
        'search_name': 'Liver Function Tests (LFTs)',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'investigations-hba1c',
        'pretty_name': 'HbA1c',
        'output_name': 'HbA1c',
        'search_name': 'Glycosylated Haemoglobin (HbA1c)',
        'html': `<input type="number" min="4" max="30" step="0.1">`,
    },
    {
        'ugly_name': 'investigations-haematinics',
        'pretty_name': 'Iron Studies',
        'output_name': 'Iron studies',
        'search_name': 'Iron Studies (Haematinics)',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'investigations-coags',
        'pretty_name': 'Coags',
        'output_name': 'Coagulation profile',
        'search_name': 'Coagulation Profile',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'investigations-ecg',
        'pretty_name': 'ECG',
        'output_name': 'ECG',
        'search_name': 'Electrocardiogram (ECG)',
        'html': `<input type="text">`,
    },
    {
        'ugly_name': 'investigations-other',
        'pretty_name': 'Other Investigations',
        'output_name': 'Other investigations',
        'search_name': 'Other Investigations',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'consent-ga',
        'pretty_name': 'General Anaesthesia',
        'output_name': 'General anaesthesia',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-sedation',
        'pretty_name': 'Sedation',
        'output_name': 'Sedation',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-regional',
        'pretty_name': 'Regional',
        'output_name': 'Regional',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-neuraxial',
        'pretty_name': 'Neuraxial',
        'output_name': 'Neuraxial',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-artline',
        'pretty_name': 'Arterial Line',
        'output_name': 'Arterial Line',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-cvc',
        'pretty_name': 'Central Venous Access',
        'output_name': 'Central Venous Access',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-blood',
        'pretty_name': 'Blood Products',
        'output_name': 'Blood Products',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-notes',
        'pretty_name': 'Special Notes',
        'output_name': 'Special notes',
        'search_name': 'Special Notes on Consent',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'airway-beard',
        'pretty_name': 'Beard',
        'output_name': 'Beard',
        'search_name': 'Beard',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="YES, will trim">Will trim</option>
                    <option value="YES, won't trim">Won't trim</option>
                    <option value="no">No</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'stopbang-snorer',
        'pretty_name': 'Snorer',
        'output_name': 'Snorer',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-tiredness',
        'pretty_name': 'Tiredness',
        'output_name': 'Tiredness',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-apnoea',
        'pretty_name': 'Observed Apnoea',
        'output_name': 'Observed Apnoea',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-hypertensive',
        'pretty_name': 'Hypertensive',
        'output_name': 'Hypertensive',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-bmi-35',
        'pretty_name': 'BMI > 35',
        'output_name': 'BMI > 35',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-age',
        'pretty_name': 'Age > 50',
        'output_name': 'Age > 50',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-neck',
        'pretty_name': 'Neck Circumference ≥ 40cm',
        'output_name': 'Neck Circumference ≥ 40cm',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'stopbang-male',
        'pretty_name': 'Male',
        'output_name': 'Male',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-risky',
        'pretty_name': 'Elevated Risk*',
        'output_name': 'Elevated Risk',
        'search_name': 'Elevated Risk',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-ihd',
        'pretty_name': 'IHD',
        'output_name': 'IHD',
        'search_name': 'IHD',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-ccf',
        'pretty_name': 'CCF',
        'output_name': 'CCF',
        'search_name': 'CCF',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-cva',
        'pretty_name': 'CVA',
        'output_name': 'CVA',
        'search_name': 'CVA',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-insulin',
        'pretty_name': 'In insulin',
        'output_name': 'In insulin',
        'search_name': 'In insulin',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-creatinine',
        'pretty_name': 'Cr > 176.8 μmol/L',
        'output_name': 'Cr > 176.8 μmol/L',
        'search_name': 'Cr > 176.8 μmol/L',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'rcri-score',
        'pretty_name': 'RCRI Score',
        'output_name': 'RCRI score',
        'html': `<span></span>`,
    },
    {
        'ugly_name': 'apfel-sex',
        'pretty_name': 'Female',
        'output_name': 'Female',
        'search_name': 'Female',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'apfel-smoking',
        'pretty_name': 'Non-smoker',
        'output_name': 'Non-smoker',
        'search_name': 'Non-smoker',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'apfel-ponv',
        'pretty_name': 'Prior PONV',
        'output_name': 'Prior PONV',
        'search_name': 'Prior PONV',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'apfel-opioids',
        'pretty_name': 'Postop opioids',
        'output_name': 'Postop opioids',
        'search_name': 'Postop opioids',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'apfel-score',
        'pretty_name': 'Apfel Score',
        'output_name': 'Apfel score',
        'html': `<span></span>`,
    },
    {
        'ugly_name': 'sort-urgency',
        'pretty_name': 'Urgency',
        'output_name': 'Urgency',
        'search_name': 'Urgency (SORT)ge',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="Elective" selected>Elective</option>
                    <option value="Expedited">Expedited</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Immediate">Immediate</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'sort-malignancy',
        'pretty_name': 'Malignancy',
        'output_name': 'Malignancy',
        'search_name': 'Known Malignancy (SORT)',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'sort-tgv',
        'pretty_name': 'Thoracics, GI, or vascular?',
        'output_name': 'Thoracics, GI, or vascular',
        'search_name': 'Thoracics, GI, or Vascular (SORT)',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
        `,
    },
    {
        'ugly_name': 'sort-score',
        'pretty_name': 'SORT Score',
        'output_name': 'SORT score',
        'html': `<span></span>`,
    },
    {
        'ugly_name': 'issues',
        'pretty_name': 'Key Issues',
        'output_name': 'Key Issues',
        'search_name': 'Key Issues',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'plan',
        'pretty_name': 'Anaesthetic Plan',
        'output_name': 'Anaesthetic Plan',
        'search_name': 'Anaesthetic Plan',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'plan-medications',
        'pretty_name': 'Medications and Fasting',
        'output_name': 'Medications and Fasting',
        'search_name': 'Medications and Fasting',
        'html': `<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder=""></textarea>`,
    },
    {
        'ugly_name': 'cataract-already-done',
        'pretty_name': 'Previous Cataract',
        'output_name': 'Previous cataract',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-language-barrier',
        'pretty_name': 'Language Barrier',
        'output_name': 'Language Barrier',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-deaf',
        'pretty_name': 'Hard of Hearing',
        'output_name': 'Hard of Hearing',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-ppmicd',
        'pretty_name': 'Has a Pacemaker or ICD',
        'output_name': 'Has a Pacemaker or ICD',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-unable-to-communicate',
        'pretty_name': 'Unable to Communicate',
        'output_name': 'Unable to Communicate',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-cognitive-impairment',
        'pretty_name': 'Cognitive Impairment',
        'output_name': 'Cognitive Impairment',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-known-difficult-airway',
        'pretty_name': 'Known Difficult Airway',
        'output_name': 'Known Difficult Airway',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-known-mh',
        'pretty_name': 'FHx Malignant Hyperthermia',
        'output_name': 'FHx Malignant Hyperthermia',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-recent-respiratory-illness',
        'pretty_name': 'Recent Respiratory Illness',
        'output_name': 'Recent Respiratory Illness',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-recent-cardiac-event',
        'pretty_name': 'Recent Cardiac Event',
        'output_name': 'Recent Cardiac Event',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-recent-pe',
        'pretty_name': 'Recent PE',
        'output_name': 'Recent PE',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-recent-stroke',
        'pretty_name': 'Recent Stroke',
        'output_name': 'Recent Stroke',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-public-guardian',
        'pretty_name': 'Public Guardian',
        'output_name': 'Public Guardian',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'patient-cataract-lay-flat',
        'pretty_name': 'Unable to Lay Flat',
        'output_name': 'Unable to Lay Flat',
        'html': `<input type="checkbox" tabindex=0>`,
    },
    {
        'ugly_name': 'consent-source',
        'pretty_name': 'Consent Source',
        'output_name': 'Consent Source',
        'search_name': 'Consent Source',
        'html': `
            <div class="selectbox">
                <select autocomplete="off">
                    <option value="" selected></option>
                    <option value="patient">Patient</option>
                    <option value="next of kin">Next of Kin</option>
                    <option value="enduring guardian">Enduring Guardian</option>
                    <option value="state-appointed (public) guardian">State-Appointed Guardian</option>
                </select>
            </div>
        `,
    },
]