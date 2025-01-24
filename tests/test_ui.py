from playwright.sync_api import Page, expect


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


def test_cmd_k(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.keyboard.press("Meta+k")
    expect(page.locator("#quick-find-input")).to_be_focused()
