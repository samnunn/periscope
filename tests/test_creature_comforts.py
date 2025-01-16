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
