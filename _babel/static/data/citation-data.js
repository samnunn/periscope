export let citationSnippets = [
    {
        id: 'stopbang-interpretation',
        body: `
            <p>The STOP-BANG questionnaire is a concise and easy-to-use screening tool for OSA. It has been developed and validated in surgical patients at preoperative clinics.</p>
            <table>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>OSA Risk</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-2</td>
                        <td>Low</td>
                    </tr>
                    <tr>
                        <td>2-4</td>
                        <td>Intermediate</td>
                    </tr>
                    <tr>
                        <td>≥ 5</td>
                        <td rowspan="2">High</td>
                    </tr>
                    <tr>
                        <td>≥ 2 STOP criteria<br><strong>and</strong><br>≥ 1 BNG criteria</td>
                    </tr>
                </tbody>
            </table>
        `,
        publication: 'chung-stopbang-2008'
    },
    {
        id: 'apfel-interpretation',
        body: `
            <p>The Apfel score is a simplified risk score for PONV that uses four independent predictors: female gender, history of motion sickness or PONV, non-smoking status, and expected use of postoperative opioids.</p>
            <table>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>24-hour PONV Risk</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21%</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>39%</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>61%</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>79%</td>
                    </tr>
                </tbody>
            </table>
        `,
        publication: 'fourthconsensus-ponv'
    },
    {
        id: 'esc-2022',
        body: ``,
        publication: 'esc-2022'
    },
    {
        id: 'esc-2022-severity',
        body: `
            Surgical risk estimate is a broad approximation of <b>30 day risk of CV death, MI, and stroke</b> that takes into account only the specific surgical intervention, without considering the patient's comorbidities.
            <h3>Low Risk (<1%)</h3>
            <ul>
                <li>Breast</li>
                <li>Dental</li>
                <li>Endocrine: thyroid</li>
                <li>Eye</li>
                <li>Gynaecological: minor</li>
                <li>Orthopaedic minor (meniscectomy)</li>
                <li>Reconstructive</li>
                <li>Super cial surgery</li>
                <li>Urological minor: (transurethral resection of the prostate)</li>
                <li>VATS minor lung resection</li>
            </ul>
            <h3>Intermediate Risk (1-5%)</h3>
            <ul>
                <li>Carotid asymptomatic (CEA or CAS)</li>
                <li>Carotid symptomatic (CEA)</li>
                <li>Endovascular aortic aneurysm repair</li>
                <li>Head or neck surgery</li>
                <li>Intraperitoneal: splenectomy, hiatal hernia repair, cholecystectomy</li>
                <li>Intrathoracic: non-major</li>
                <li>Neurological or orthopaedic: major (hip and spine surgery)</li>
                <li>Peripheral arterial angioplasty</li>
                <li>Renal transplants</li>
                <li>Urological or gynaecological: major</li>
            </ul>
            <h3>High Risk (>5%)</h3>
            <ul>
                <li>Adrenal resection</li>
                <li>Aortic and major vascular surgery</li>
                <li>Carotid symptomatic (CAS)</li>
                <li>Duodenal-pancreatic surgery</li>
                <li>Liver resection, bile duct surgery</li>
                <li>Oesophagectomy</li>
                <li>Open lower limb revascularization for acute limb ischaemia or amputation</li>
                <li>Pneumonectomy (VATS or open surgery)</li>
                <li>Pulmonary or liver transplant</li>
                <li>Repair of perforated bowel</li>
                <li>Total cystectomy</li>
            </ul>
        `,
        publication: 'esc-2022'
    },
    {
        id: 'ads-anzca-2022',
        body: ``,
        publication: 'ads-anzca-2022'
    },
    {
        id: 'ads-anzca-2022-referral-advice',
        body: `<p>The 2022 ADA-ANZCA guidelines recommend endocrinology referral for patients with:</p>
        <ul>
            <li>HbA1c > 9.0%</li>
            <li>Hypoglycaemia unawareness</li>
        </ul>`,
        publication: 'ads-anzca-2022'
    },
    {
        id: 'sort-calculator-explanation',
        body: `<p>The Surgical Outcome Risk Tool (SORT) is designed to estimate 30-day mortality after surgery.</p>
        <p>It was created using 16,788 cases from the <a href="https://www.ncepod.org.uk/">NCEPOD</a> database and later validated by <a href="https://doi.org/10.1371/journal.pmed.1003253">Wong et al.</a> against 22,631 cases from Australia, New Zealand, and the United Kinddom.</p>`,
        publication: 'sort-original-paper'
    },
    {
        id: 'mets-and-functional-capacity-assessment-methods',
        body: `
            <p>There are no reliable methods of subjective functional status assessment. The most commonly-used techniques are:</p>
            <ul>
                <li>Stair-climbing</p>
                <li>ADL assessment</p>
                <li>The Duke Activity Status Index (DASI)</p>
            </ul>
            - All measures used to approximate four METS (definition)
            - Even the utility of four METS is dubious
            - The attached BJA Education article has a useful overview of the topic
        `,
        publication: 'bjaed-functional-capacity-assessment-methods'
    },
    {
        id: 'rcri-interpretation',
        body: `
            <p>The Revised Cardiac Risk Index (RCRI) was originally published by <a href="https://doi.org/10.1056/nejm197710202971601">Goldman et al. (1977)</a>, though the original publication is widely understood to have under-estimated 30-day MACE risk. A more modern meta-analysis by <a href="https://doi.org/10.1016/j.cjca.2016.09.008">Duceppe et al. (2017)</a> has provided updated risk estimates:</a></p>
            <table>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>30-day MACE Risk</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>3.9% (2.8-5.4%)</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>6.0% (4.9-7.4%)</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>10.1% (8.1-12.6%)</td>
                    </tr>
                    <tr>
                        <td>≥ 3</td>
                        <td>15% (11.1-20.0%)</td>
                    </tr>
                </tbody>
            </table>
        `,
        publication: 'duceppe-2017'
    },
]