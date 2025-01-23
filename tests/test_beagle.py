from playwright.sync_api import Page, expect


def test_beagle_ecg(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#details").get_by_label("Age").fill("50")
    expect(page.locator("#warnings")).to_contain_text("ECG")


def test_beagle_sort(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("SORT Search").click()
    page.get_by_label("SORT Search").fill("thr")
    page.get_by_text("Primary total hip replacement with or without cement").click()
    page.get_by_label("ASA").select_option("4")
    page.get_by_label("Malignancy").select_option("No")
    page.get_by_label("Thoracics, GI").select_option("No")
    page.locator("#sort-container").get_by_label("Age").fill("80")
    expect(page.locator("#warnings")).to_contain_text("HDU")


def test_beagle_sort_hdu(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("SORT Search").click()
    page.get_by_label("SORT Search").fill("thr")
    page.get_by_text("Primary total hip replacement with or without cement").click()
    page.get_by_label("ASA").select_option("4")
    page.get_by_label("Malignancy").select_option("No")
    page.get_by_label("Thoracics, GI").select_option("No")
    page.locator("#sort-container").get_by_label("Age").fill("80")  # should be 4.72
    expect(page.locator("#warnings")).to_contain_text("HDU")


def test_beagle_sort_monitored_bed(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("SORT Search").click()
    page.get_by_label("SORT Search").fill("thr")
    page.get_by_text("Primary total hip replacement with or without cement").click()
    page.get_by_label("ASA").select_option("4")
    page.get_by_label("Malignancy").select_option("No")
    page.get_by_label("Thoracics, GI").select_option("No")
    page.locator("#sort-container").get_by_label("Age").fill("20")  # should be 0.45
    expect(page.locator("#warnings")).to_contain_text("monitored")


def test_beagle_mace_1(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.locator("#details").get_by_label("Age").fill("65")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.locator("label").filter(has_text="Risk").get_by_role("combobox").select_option(
        "high"
    )
    expect(page.get_by_text("High MACE risk")).to_be_visible()


def test_beagle_mace_2(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.locator("#details").get_by_label("Age").fill("65")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").fill("ihd")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.locator("label").filter(has_text="Risk").get_by_role("combobox").select_option(
        "high"
    )
    expect(page.get_by_text("High MACE risk")).to_be_visible()


def test_beagle_mace_3(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#details").get_by_label("Age").fill("65")
    page.get_by_placeholder("Search for a condition").fill("htn")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.get_by_placeholder("Search for a condition").fill("dyslipid")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.get_by_placeholder("Search for a condition").fill("dyslipid")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.get_by_label("Smoking").select_option("active smoker")
    page.locator("label").filter(has_text="Risk").get_by_role("combobox").select_option(
        "high"
    )
    expect(page.get_by_text("High MACE risk")).to_be_visible()


def test_beagle_mace_4(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#details").get_by_label("Age").fill("65")
    page.get_by_placeholder("Search for a condition").fill("htn")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.get_by_placeholder("Search for a condition").fill("dyslipid")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.get_by_placeholder("Search for a condition").fill("dyslipid")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.get_by_label("Smoking").select_option("active smoker")
    page.locator("label").filter(has_text="Risk").get_by_role("combobox").select_option(
        "low"
    )
    expect(page.get_by_text("High MACE risk")).not_to_be_visible()


def test_ponv(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#risk").get_by_text("Female", exact=True).click()
    page.locator("#risk").get_by_text("Prior PONV").click()
    page.locator("#risk").get_by_text("Postop opioids").click()
    expect(page.get_by_text("High PONV risk")).to_be_visible()


def test_beagle_t2dm_bsl(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_placeholder("Search for a condition").press("Enter")
    expect(page.locator("#warnings").get_by_text("check BSL")).to_be_visible()


def test_beagle_t2dm_hba1c(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_placeholder("Search for a condition").press("Enter")
    expect(page.locator("#warnings").get_by_text("hba1c")).to_be_visible()


def test_beagle_t2dm_referral(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_placeholder("Search for a condition").press("Enter")
    page.locator("#ix").get_by_label("HbA1c").fill("10")
    expect(
        page.locator("#warnings").get_by_text("Endocrinology referral")
    ).to_be_visible()


def test_beagle_sglt2(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("Current Medications").fill("Dapagliflozin")
    expect(page.locator("#warnings").get_by_text("ketones")).to_be_visible()


def test_beagle_anaphylaxis(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("Adverse Drug Reactions").fill("Anaphylaxis to penicillin")
    expect(page.locator("#warnings").get_by_text("anaphylaxis")).to_be_visible()


def test_beagle_osa_1(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#risk").get_by_label("Snorer").check()
    page.locator("#risk").get_by_label("Tiredness").check()
    page.locator("#risk").get_by_label("BMI").check()
    expect(page.locator("#warnings").get_by_text("high osa risk")).to_be_visible()


def test_beagle_osa_2(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#risk").get_by_label("Snorer").check()
    page.locator("#risk").get_by_label("Tiredness").check()
    page.locator("#risk").get_by_label("Observed apnoea").check()
    expect(
        page.locator("#warnings").get_by_text("intermediate osa risk")
    ).to_be_visible()
