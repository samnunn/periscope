from playwright.sync_api import Page, expect
from utils import run_preamble


def test_consent(page):
    run_preamble(page)
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


def test_download(page: Page):
    run_preamble(page)
    page.locator("#details").get_by_label("Age").fill("26")
    page.get_by_role("textbox", name="Operation").fill("Left ectomy")
    page.get_by_label("Non-smoker").check()
    with page.expect_download() as download_info:
        page.get_by_role("button", name="Download").click()
    download = download_info.value
    with open(download.path(), "r") as f:
        output = f.read()
        assert "26" in output
        assert "Left ectomy" in output
