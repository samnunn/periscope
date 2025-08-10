from playwright.sync_api import Page, expect
from utils import run_preamble, tenant_sign_in


def test_server_side_toasts(page: Page):
    run_preamble(page)
    tenant_sign_in(page)
    expect(page.locator("#toasts")).to_be_visible()


def test_client_side_toasts(page: Page):
    run_preamble(page)
    page.evaluate("document.displayToast('foobar', 'success')")
    page.wait_for_timeout(500)
    expect(page.locator("#toasts")).to_be_visible()
