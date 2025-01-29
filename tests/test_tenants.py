import utils
from playwright.sync_api import Page, expect


def test_tenant_authentication(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    utils.tenant_sign_in(page)
    expect(page.get_by_role("button", name="Connect 🟢")).to_be_visible()


def test_tenant_deauthentication(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    utils.tenant_sign_in(page)
    utils.tenant_sign_out(page)
    expect(page.get_by_role("button", name="Connect 🟢")).not_to_be_visible()
