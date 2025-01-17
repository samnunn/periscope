from playwright.sync_api import Page, expect


def test_consent(page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.locator("#consent").get_by_label("General Anaesthesia").check()
    page.locator("#consent").get_by_label("Sedation").check()
    page.locator("#consent").get_by_label("Regional").check()
    page.locator("#consent").get_by_label("Neuraxial").check()
    page.locator("#consent").get_by_label("Arterial Line").check()
    page.locator("#consent").get_by_label("Central Venous Access").check()
    page.locator("#consent").get_by_label("Blood Products").check()
    output = page.evaluate("document.renderEntireDocument()")
    assert "Discussed risks and benefits of GA by prevalence" in output
    assert "Consented for sedation" in output
    assert "Regional risks discussed" in output
    assert "Discussed risks and benefits of neuraxial anaesthesia" in output
    assert "Consented to blood products" in output
    assert "Consented to arterial line placement" in output
    assert "Consented to central line placement" in output
