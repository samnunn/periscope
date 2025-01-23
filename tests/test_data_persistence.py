from playwright.sync_api import Page, expect


def test_data_persistence_top_level_dropdown(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#details").get_by_label("Sex").select_option("M")
    page.reload()
    expect(page.get_by_label("Sex Male Female")).to_have_value("M")


def test_data_persistence_top_level_textbox(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#details").get_by_role("textbox", name="Operation").fill(
        "Left ectomy"
    )
    page.reload()
    expect(
        page.locator("#details").get_by_role("textbox", name="Operation")
    ).to_have_value("Left ectomy")


def test_data_persistence_top_level_checkbox(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("General Anaesthesia").check()
    page.reload()
    expect(page.get_by_label("General Anaesthesia")).to_be_checked()


def test_data_persistence_diagnosis_single_adding(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_text("T2DM", exact=True).click()
    page.reload()
    expect(page.locator("input.diagnosis-title")).to_have_value("T2DM")


def test_data_persistence_diagnosis_multiple_adding(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_text("T2DM", exact=True).click()
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("HTN")
    page.get_by_text("Hypertension", exact=True).click()
    page.reload()
    expect(page.locator('[clinic-parameter="diagnosis-t2dm"]')).to_be_visible()
    expect(page.locator('[clinic-parameter="diagnosis-hypertension"]')).to_be_visible()
