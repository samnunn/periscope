from playwright.sync_api import Page, expect


def test_value_sync(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_text("T2DM", exact=True).click()
    page.locator("#diagnosis-list").get_by_label("HbA1c").click()
    page.locator("#diagnosis-list").get_by_label("HbA1c").fill("9.9")
    expect(page.locator("#ix").get_by_label("HbA1c")).to_have_value("9.9")


def test_gender_propagation(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("Sex").select_option("M")
    expect(page.get_by_label("Female", exact=True)).not_to_be_checked()
    expect(page.get_by_label("Male", exact=True)).to_be_checked()


def test_diagnosis_search_box_expansion(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_placeholder("Search for a condition").click()
    expect(
        page.locator("#diagnosis-search").get_by_role("img", name="Up Arrow")
    ).to_be_visible()


def test_popover(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("[popovertarget]").first.click()
    expect(page.locator("dialog.clinic-modal-popup-dialog").first).to_be_visible()
