{% load clinic_tags %}
window.allDiagnoses = [
    {
        matchable_string: "T2DM type two 2 II insulin dependent diabetes mellitus IDDM",
        name: "T2DM",
        id: "diagnosis-t2dm",
        html: `
            <div class="hstack">
                <label>
                    Insulin Dependent
                    <div class="selectbox">
                        <select diagnosis-parameter="Insulin dependent">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Hypo Aware
                    <div class="selectbox">
                        <select diagnosis-parameter="Hypoglycaemia awareness">
                            <option value="" selected></option>
                            <option value="intact">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
                {% input "investigations-hba1c" %}
            </div>
            <label>
                Microvascular Complications
                <input type="text" diagnosis-parameter="Microvascular complications">
            </label>
            <label>
                Macrovascular Complications
                <input type="text" diagnosis-parameter="Macrovascular complications">
            </label>`
    },
    {
        matchable_string: "T1DM type one 1 I insulin dependent diabetes mellitus IDDM",
        name: "T1DM",
        id: "diagnosis-t1dm",
        html: `
            <div class="hstack">
                <label>
                    Year Diagnosed
                    <input type="text" diagnosis-parameter="Diagnosed">
                </label>
                <label>
                    Hypo Aware
                    <div class="selectbox">
                        <select diagnosis-parameter="Hypoglycaemia awareness">
                            <option value="" selected></option>
                            <option value="intact">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
                {% input "investigations-hba1c" %}
            </div>
            <label>
                Microvascular Complications
                <input type="text" diagnosis-parameter="Microvascular complications">
            </label>
            <label>
                Microvascular Complications
                <input type="text" diagnosis-parameter="Macrovascular complications">
            </label>`
    },
    {
        matchable_string: "HF HFpEF HFrEF congestive cardiac heart failure",
        name: "Heart failure",
        id: "diagnosis-ccf",
        addedCallback: (inputData) => { inputData['rcri-ccf'] = true },
        removedCallback: (inputData) => { inputData['rcri-ccf'] = false },
        html: `
            <div class="vstack">
                <label>
                    Aetiology
                    <input type="text" diagnosis-parameter="Aetiology">
                </label>
                <div class="hstack">
                    {% input "hf-nyha" %}
                    {% input "hf-lvef" %}
                </div>
            </div>
        `
    },
    {
        matchable_string: "essential hypertension htn",
        name: "Hypertension",
        id: "diagnosis-hypertension",
        addedCallback: (inputData) => { inputData['stopbang-hypertensive'] = true },
        removedCallback: (inputData) => { inputData['stopbang-hypertensive'] = false },
        html: `
            <div class="hstack">
                <label>
                    Baseline BP
                    <input type="text" diagnosis-parameter="Baseline BP">
                </label>
                <label>
                    End Organ Damage
                    <div class="selectbox">
                        <select diagnosis-parameter="End-organ damage">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "lipid dyslipiaemia hyperlipidaemia hypercholesterolaemia",
        name: "Dyslipidaemia",
        id: "diagnosis-dyslipidaemia",
        html: ``
    },
    {
        matchable_string: "depression low mood",
        name: "Depression",
        id: "diagnosis-depression",
        html: ``
    },
    {
        matchable_string: "social anxiety gad",
        name: "Anxiety",
        id: "diagnosis-anxiety",
        html: ``
    },
    {
        matchable_string: "post traumatic stress disorder",
        name: "PTSD",
        id: "diagnosis-ptsd",
        html: ``
    },
    {
        matchable_string: "borderline emotionally unstable personality disorder",
        name: "EUPD",
        id: "diagnosis-eupd",
        html: ``
    },
    {
        matchable_string: "bipolar affective disorder",
        name: "Bipolar affective disorder",
        id: "diagnosis-bpad",
        html: ``
    },
    {
        matchable_string: "schizophrenia",
        name: "Schizophrenia",
        id: "diagnosis-schizophrenia",
        html: ``
    },
    {
        matchable_string: "post-operative nausea and vomiting",
        name: "PONV",
        id: "diagnosis-ponv",
        addedCallback: (inputData) => { inputData['apfel-ponv'] = true },
        removedCallback: (inputData) => { inputData['apfel-ponv'] = false },
        html: ``
    },
    {
        matchable_string: "rheumatoid arthritis",
        name: "Rheumatoid arthritis",
        id: "diagnosis-rheumatoid-arthritis",
        html: `
            <div class="hstack">
                <label>
                    C-Spine Involvement
                    <div class="selectbox">
                        <select diagnosis-parameter="C-Spine involvement">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Immune Suppressed
                    <div class="selectbox">
                        <select diagnosis-parameter="Immune suppressed">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "copd chronic obstructive pulmonary airways disease",
        name: "COPD",
        id: "diagnosis-copd",
        html: `
            <div class="hstack">
                <label>
                    GOLD Class
                    <div class="selectbox">
                        <select diagnosis-parameter="GOLD classification">
                            <option value="" selected></option>
                            <option value="mild (FEV1 ≥ 80% predicted)">Mild – FEV1 ≥ 80% predicted</option>
                            <option value="moderate (FEV1 50-79% predicted)">Moderate – FEV1 50-79% predicted</option>
                            <option value="severe (FEV1 &lt; 49% predicted)">Severe – FEV1 &lt; 49% predicted</option>
                            <option value="very severe (FEV1 &lt; 30% predicted)">Very severe – FEV1 &lt; 30% predicted</option>
                        </select>
                    </div>
                </label>
                {% input "smoking-status" %}
            </div>
            <div class="hstack">
                <label>
                    pHTN or RV Failure
                    <div class="selectbox">
                        <select diagnosis-parameter="PHTN/RV failure" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    <span>Home <span>O<sub>2</sub></span>
                    <div class="selectbox">
                        <select diagnosis-parameter="Home O2" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>
            <label>
                mMRC Dyspnoea Scale
                <div class="selectbox">
                    <select diagnosis-parameter="mMRC dyspnoea" autocomplete="off">
                        <option value="" selected></option>
                        <option value="0">0 – Dyspnea only with strenuous exercise</option>
                        <option value="1">1 – Dyspnea when hurrying or walking up a slight hill</option>
                        <option value="2">2 – Walks slower than people of the same age because of dyspnea or has to stop for breath when walking at own pace</option>
                        <option value="3">3 – Stops for breath after walking 100 yards (91 m) or after a few minutes</option>
                        <option value="4">4 – Too dyspneic to leave house or breathless when dressing</option>
                    </select>
                </div>
            </label>
            <label>
                Recent Exacerbations
                <input type="text" diagnosis-parameter="Recent exacerbations">
            </label>
            `
    },
    {
        matchable_string: "asthma",
        name: "Asthma",
        id: "diagnosis-asthma",
        html: `
            <div class="hstack">
                <label>
                    NSAID Reactive
                    <div class="selectbox">
                        <select diagnosis-parameter="NSAID reactive">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Admissions
                    <div class="selectbox">
                        <select diagnosis-parameter="Previous admissions">
                            <option value="" selected></option>
                            <option value="has been admitted to ICU for asthma">ICU admissions</option>
                            <option value="ward-based admissions only">Ward-based admissions only</option>
                            <option value="none, but flares have been managed in community">Community-managed flares only</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </label>
            </div>
            <hr>
            <span>In the past <b>four weeks</b>, has the patient had:</span>
            <div class="hstack">
                <label>
                    Day Symptoms
                    <div class="selectbox">
                        <select diagnosis-parameter="Daytime symptoms">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Night Symptoms
                    <div class="selectbox">
                        <select diagnosis-parameter="Night symptoms">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>
            <div class="hstack">
                <label>
                    Used SABA ≥ 2x Weekly
                    <div class="selectbox">
                        <select diagnosis-parameter="Heavy reliever use">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Activity Limitation
                    <div class="selectbox">
                        <select diagnosis-parameter="Activity limitation">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>
            <hr>`
    },
    {
        matchable_string: "AS aortic stenosis",
        name: "Aortic stenosis",
        id: "diagnosis-aortic-stenosis",
        html: `
            <label>
                Radiographic Severity
                <input type="text" diagnosis-parameter="Radiographic severity">
            </label>
            <label>
                Symptom Burden
                <input type="text" diagnosis-parameter="Symptoms">
            </label>`
    },
    {
        matchable_string: "AF atrial fibrillation",
        name: "Atrial fibrillation",
        id: "diagnosis-atrial-fibrillation",
        html: `
            <div class="hstack">
                <label>
                    Type
                    <div class="selectbox">
                        <select diagnosis-parameter="Type" autocomplete="off">
                            <option value="" selected></option>
                            <option value="paroxysmal">Paroxysmal (≥ 7 days)</option>
                            <option value="persistent">Persistent (≥ 7 days)</option>
                            <option value="longstanding">Longstanding (≥ 1 year)</option>
                            <option value="permanent">Permanent (cardioversion-resistant)</option>
                        </select>
                    </div>
                </label>
                <label>
                    <span>CHA<sub>2</sub>DS<sub>2</sub>-VASc</span>
                    <input type="number" step="1" min="0" max="8" diagnosis-parameter="CHADS-VASc">
                </label>
            </div>
            <div class="hstack">
                <label>
                    Rate Control
                    <input type="text" step="1" min="0" max="8" diagnosis-parameter="Rate control">
                </label>
                <label>
                    Rhythm Control
                    <input type="text" step="1" min="0" max="8" diagnosis-parameter="Rhythm control">
                </label>
            </div>
            <label>
                Anticoagulated
                <div class="selectbox">
                    <select diagnosis-parameter="Anticoagulated" autocomplete="off">
                        <option value="" selected></option>
                        <option value="YES">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </label>`
    },
    {
        matchable_string: "hypothyroidism low T4 T3",
        name: "Hypothyroidism",
        id: "diagnosis-hypothyroidism",
        html: ``
    },
    {
        matchable_string: "hyperthyroidism high T4 T3",
        name: "Hyperthyroidism",
        id: "diagnosis-hyperthyroidism",
        html: `
            <div class="hstack">
                <label>
                    Symptomatic
                    <div class="selectbox">
                        <select diagnosis-parameter="Symptomatic" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Aetiology
                    <input type="text" diagnosis-parameter="Aetiology">
                </label>
            </div>`
    },
    {
        matchable_string: "ischaemic heart disease NSTEMI",
        name: "Ischaemic heart disease",
        id: "diagnosis-ihd",
        addedCallback: (inputData) => { inputData['rcri-ihd'] = true },
        removedCallback: (inputData) => { inputData['rcri-ihd'] = false },
        html: `
            <div class="hstack">
                <label>
                    Stable Disease
                    <div class="selectbox">
                        <select diagnosis-parameter="Stable disease" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
                {% input "antiplatelet-use" %}
            </div>
            <label>
                Last Stress Test
                <input type="text" diagnosis-parameter="Last stress test" placeholder="Date and findings">
            </label>`
    },
    {
        matchable_string: "carotid stenosis peripheral vascular disease claudication",
        name: "Peripheral vascular disease",
        id: "diagnosis-pvd",
        // addedCallback: (inputData) => { inputData['rcri-ihd'] = true },
        // removedCallback: (inputData) => { inputData['rcri-ihd'] = false },
        html: `
            <div class="hstack">
                <label>
                    Stable Disease
                    <div class="selectbox">
                        <select diagnosis-parameter="Stable disease" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
                {% input "antiplatelet-use" %}
            </div>
        `
    },
    {
        matchable_string: "chronic pain CRPS",
        name: "Chronic pain",
        id: "diagnosis-chronic-pain",
        html: `
            <div class="hstack">
                <label>
                    Opioid Tolerance
                    <div class="selectbox">
                        <select diagnosis-parameter="Opioid tolerance" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    CRPS Features
                    <div class="selectbox">
                        <select diagnosis-parameter="CRPS features" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>
            <div class="hstack">
                <label>
                    Pain Specialist
                    <input type="text" diagnosis-parameter="Treating specialist">
                </label>
            </div>`
    },
    {
        matchable_string: "cva stroke transient ischaemic attack cerebrovascular accident",
        name: "Cerebrovascular accident",
        id: "diagnosis-cva",
        addedCallback: (inputData) => { inputData['rcri-cva'] = true },
        removedCallback: (inputData) => { inputData['rcri-cva'] = false },
        html: `
            <div class="hstack">
                <label>
                    Details of Infarct(s)
                    <input type="text" diagnosis-parameter="Infarct details">
                </label>
            </div>
            <div class="hstack">
                <label>
                    Motor Weakness
                    <div class="selectbox">
                        <select diagnosis-parameter="Residual motor weakness" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Pharyngeal Symptoms
                    <div class="selectbox">
                        <select diagnosis-parameter="Residual pharyngeal symptoms" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "epilepsy seizure",
        name: "Seizure disorder",
        id: "diagnosis-seizures",
        html: `
            <label>
                Triggers
                <input type="text" diagnosis-parameter="Triggers">
            </label>
            <label>
                Seizure Frequency
                <input type="text" diagnosis-parameter="Frequency">
            </label>
            <div class="hstack">
                <label>
                    AED Compliant
                    <div class="selectbox">
                        <select diagnosis-parameter="Compliant with AEDs" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Previous Status Epilepticus
                    <div class="selectbox">
                        <select diagnosis-parameter="Previous status epilepticus" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "ckd chronic kidney disease",
        name: "CKD",
        id: "diagnosis-ckd",
        html: `
            <div class="hstack">
                <label>
                    KDIGO Stage
                    <div class="selectbox">
                        <select diagnosis-parameter="KDIGO stage" autocomplete="off">
                            <option value="" selected></option>
                            <option value="1">1 (GFR ≥ 90)</option>
                            <option value="2">2 (GFR 60–89)</option>
                            <option value="3a">3a (GFR 45–59)</option>
                            <option value="3b">3b (GFR 30–44)</option>
                            <option value="4">4 (GFR 15–29)</option>
                            <option value="5">5 (GFR ≤ 14 or on dialysis)</option>
                        </select>
                    </div>
                </label>
                <label>
                    Aetiology
                    <input type="text" diagnosis-parameter="Aetiology">
                </label>
            </div>
            <div class="hstack">
                <label>
                    Dialysis Dependent
                    <div class="selectbox">
                        <select diagnosis-parameter="Dialysis-dependent" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                     
                    <input type="text" diagnosis-parameter="Dialysis details" placeholder="Details">
                </label>
            </div>
            <label>
                Renal Physician
                <input type="text" diagnosis-parameter="Renal physician">
            </label>`
    },
    {
        matchable_string: "iron deficiency anaemia",
        name: "Anaemia",
        id: "diagnosis-anaemia",
        html: `
            <label>
                Aetiology
                <input type="text" diagnosis-parameter="Aetiology">
            </label>
            <label>
                Treatment
                <input type="text" diagnosis-parameter="Treatment">
            </label>`
    },
    {
        matchable_string: "OA osteoarthritis",
        name: "Osteoarthritis",
        id: "diagnosis-osteoarthritis",
        html: `
            <label>
                Affected Joints
                <input type="text" diagnosis-parameter="Affected joints">
            </label>
            <div class="hstack">
                <label>
                    Opioid Dependent
                    <div class="selectbox">
                        <select diagnosis-parameter="Opioid dependent" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "human immunodeficiency virus",
        name: "HIV",
        id: "diagnosis-hiv",
        html: `
            <div class="hstack">
                <label>
                    CD4 Count
                    <input type="text" diagnosis-parameter="CD4 count">
                </label>
                <label>
                    Viral Load
                    <input type="text" diagnosis-parameter="Viral load">
                </label>
            </div>
            <label>
                Infectious Complications
                <input type="text" diagnosis-parameter="Viral load">
            </label>
            <label>
                Antiviral Regimen
                <input type="text" diagnosis-parameter="Antiviral regimen">
            </label>`
    },
    {
        matchable_string: "child pugh liver cirrhosis",
        name: "Cirrhosis",
        id: "diagnosis-cirrhosis",
        html: `
            <label>
                Aetiology
                <input type="text" diagnosis-parameter="Aetiology">
            </label>
            <div class="hstack">
                <label>
                    Child-Pugh Class
                    <div class="selectbox">
                        <select diagnosis-parameter="Child-Pugh" autocomplete="off">
                            <option value="" selected></option>
                            <option value="A (100% one-year survival)">A (100% one-year survival)</option>
                            <option value="B (80% one-year survival)">B (80% one-year survival)</option>
                            <option value="C (45% one-year survival)">C (45% one-year survival)</option>
                        </select>
                    </div>
                </label>
                <label>
                    MELD Score
                    <input type="number" min="0" max="100" step="1" diagnosis-parameter="MELD">
                </label>
            </div>
            <div class="hstack">
                <label>
                    Varices
                    <div class="selectbox">
                        <select diagnosis-parameter="Varices" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Coagulopathy
                    <div class="selectbox">
                        <select diagnosis-parameter="Coagulopathy" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>
            <label>
                Ascites Management
                <input type="text" diagnosis-parameter="Ascites management">
            </label>`
    },
    {
        matchable_string: "obstructive sleep apnoea",
        name: "OSA",
        id: "diagnosis-osa",
        html: `
            <div class="hstack">
                <label>
                    AHI
                    <input type="number" min="0" max="300" step="1" diagnosis-parameter="AHI">
                </label>
                <label>
                    CPAP User
                    <div class="selectbox">
                        <select diagnosis-parameter="CPAP" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "alzheimer's cognitive impairment dementia",
        name: "Cognitive impairment",
        id: "diagnosis-alzheimers",
        html: `
            <label>
                Type
                <input type="text" diagnosis-parameter="Type">
            </label>
            <label>
                Aetiology
                <input type="text" diagnosis-parameter="Aetiology">
            </label>
            <div class="hstack">
                <label>
                    Baseline MoCA/MMSE
                    <input type="number" min="0" max="30" step="1" diagnosis-parameter="Baseline MoCA/MMSE">
                </label>
                <label>
                    Can Lay Still
                    <div class="selectbox">
                        <select diagnosis-parameter="Can lay still" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "steatohepatitis nonalcoholic fatty liver disease",
        name: "Steatohepatitis",
        id: "diagnosis-steatohepatitis",
        html: ``
    },
    {
        matchable_string: "peptic gastric ulcers disease",
        name: "Peptic ulcer disease",
        id: "diagnosis-pud",
        html: ``
    },
    {
        matchable_string: "cataracts",
        name: "Cataracts",
        id: "diagnosis-cataracts",
        html: ``
    },
    {
        matchable_string: "glaucoma",
        name: "Glaucoma",
        id: "diagnosis-glaucoma",
        html: ``
    },
    {
        matchable_string: "gastro-oesophageal reflux disease",
        name: "GORD",
        id: "diagnosis-gord",
        html: `
            <div class="hstack">
                <label>
                    Medicated
                    <div class="selectbox">
                        <select diagnosis-parameter="Medicated">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Ongoing Symptoms
                    <div class="selectbox">
                        <select diagnosis-parameter="Ongoing symptoms">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "anaphylaxis",
        name: "Anaphylaxis",
        id: "diagnosis-anaphylaxis",
        html: `
            <div class="hstack">
                <label>
                    Confirmed Diagnosis
                    <div class="selectbox">
                        <select diagnosis-parameter="Confirmed diagnosis">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
            </div>
            <label>
                Triggers
                <input type="text" diagnosis-parameter="Triggers">
            </label>`
    },
    {
        matchable_string: "permanent pacemaker",
        name: "Pacemaker in situ",
        id: "diagnosis-pacemaker",
        html: `
            <div class="hstack">
                <label>
                    Indication
                    <input type="text" diagnosis-parameter="Indication">
                </label>
                <label>
                    Last Checked
                    <input type="text" diagnosis-parameter="Last checked">
                </label>
            </div>
            <div class="hstack">
                <label>
                    Mode
                    <input type="text" diagnosis-parameter="Mode">
                </label>
                <label>
                    Manufacturer
                    <input type="text" diagnosis-parameter="Manufacturer">
                </label>
            </div>
            <label>
                Pacing Dependence
                <input type="text" diagnosis-parameter="Pacing dependence">
            </label>`
    },
    {
        matchable_string: "internal cardiac defibrillator",
        name: "ICD in situ",
        id: "diagnosis-icd",
        html: `
            <div class="hstack">
                <label>
                    Indication
                    <input type="text" diagnosis-parameter="Indication">
                </label>
                <label>
                    Last Checked
                    <input type="text" diagnosis-parameter="Last checked">
                </label>
            </div>
            <div class="hstack">
                <label>
                    Diathermy in Use
                    <div class="selectbox">
                        <select diagnosis-parameter="Diathermy in use" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
                <label>
                    Manufacturer
                    <input type="text" diagnosis-parameter="Manufacturer">
                </label>
            </div>
            <label>
                Trigger Frequency
                <input type="text" diagnosis-parameter="Trigger frequency">
            </label>`
    },
    {
        matchable_string: "abdominal aortic aneurysm",
        name: "AAA",
        id: "diagnosis-aaa",
        html: `
            <div class="hstack">
                <label>
                    Size (cm)
                    <input type="number" min="0" max="30" step="0.1" diagnosis-parameter="Size">
                </label>
                <label>
                    Stable
                    <div class="selectbox">
                        <select diagnosis-parameter="Stable" autocomplete="off">
                            <option value="" selected></option>
                            <option value="yes">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "osteoporosis",
        name: "Osteoporosis",
        id: "diagnosis-osteoporosis",
        html: ``
    },
    {
        matchable_string: "transcatheter aortic valve implant replacment",
        name: "TAVI",
        id: "diagnosis-tavi",
        html: `
            <div class="hstack">
                <label>
                    Year Implanted
                    <input type="text" diagnosis-parameter="Year implanted">
                </label>
                <label>
                    Known Leak
                    <div class="selectbox">
                        <select diagnosis-parameter="Known leak" autocomplete="off">
                            <option value="" selected></option>
                            <option value="YES">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "benign prostatic hypertrophy",
        name: "BPH",
        id: "diagnosis-bph",
    },
    {
        matchable_string: "barrett's oesophagus",
        name: "Barrett's oesophagus",
        id: "diagnosis-barretts",
    },
    {
        matchable_string: "Ehlers-Danlos syndrome",
        name: "Ehlers-Danlos syndrome",
        id: "diagnosis-ehlers-danlos",
        html: `
            <div class="hstack">
                <label>
                    Beighton score
                    <input type="number" min="0" max="9" step="1" diagnosis-parameter="Beighton score">
                </label>
                <label>
                    Manifestations
                    <div class="selectbox">
                        <select diagnosis-parameter="Manifestations" autocomplete="off">
                            <option value="" selected></option>
                            <option value="hypermobility only">Hypermobility only</option>
                            <option value="gastroparesis only">Gastroparesis only</option>
                            <option value="BOTH gastroparesis and hypermobility">Both</option>
                        </select>
                    </div>
                </label>
            </div>`
    },
    {
        matchable_string: "fibromyalgia",
        name: "Fibromyalgia",
        id: "diagnosis-fibromyalgia",
    },
    {
        matchable_string: "pots postural orthostatic tachycardia syndrome",
        name: "POTS",
        id: "diagnosis-pots",
    },
    {
        matchable_string: "PCOS polycystic ovarian syndrome",
        name: "PCOS",
        id: "diagnosis-pcos",
    },
    {
        matchable_string: "pulmonary lung nodules",
        name: "Pulonary nodule(s)",
        id: "diagnosis-pumonary-nodules",
    },
    {
        matchable_string: "diverticular diverticulosis disease",
        name: "Diverticular disease",
        id: "diagnosis-diverticular-disease",
    },
    {
        matchable_string: "benign paroxysmal positional vertigo",
        name: "BPPV",
        id: "diagnosis-bppv",
    },
    {
        matchable_string: "haemorrhoids piles",
        name: "Haemorrhoids",
        id: "diagnosis-haemorrhoids",
    },
    {
        matchable_string: "monoclonal gammopathy of undetermined significance paraproteinaemia",
        name: "MGUS",
        id: "diagnosis-mgus",
    },
    {
        matchable_string: "gout crystal arthropathy",
        name: "Gout",
        id: "diagnosis-gout",
    },
    {
        matchable_string: "pseudogout crystal arthropathy",
        name: "Pseudogout",
        id: "diagnosis-pseudogout",
    },
    {
        matchable_string: "gallstones cholelithiasis",
        name: "Cholelithiasis",
        id: "diagnosis-cholelithiasis",
    },
    {
        matchable_string: "kindey renal stones",
        name: "Kidney stones",
        id: "diagnosis-kidney-stones",
    },
    {
        matchable_string: "cerebral palsy",
        name: "Cerebral palsy",
        id: "diagnosis-cp",
    },
    {
        matchable_string: "pregnancy pregnant",
        name: "Pregnant",
        id: "diagnosis-pregnant",
        html: `
            <div class="hstack">
                <label>
                    Due Date
                    <input type="date" diagnosis-parameter="Current gestational age">
                </label>
            </div>`
    },
]