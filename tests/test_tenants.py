import utils
from playwright.sync_api import Page, expect
from utils import run_preamble


def test_tenant_authentication(page: Page):
    run_preamble(page)
    utils.tenant_sign_in(page)
    expect(page.get_by_role("button", name="Connected 🟢")).to_be_visible()


def test_tenant_deauthentication(page: Page):
    run_preamble(page)
    utils.tenant_sign_in(page)
    page.main_frame.wait_for_load_state()
    utils.tenant_sign_out(page)
    run_preamble(page)
    page.main_frame.wait_for_load_state()
    page.wait_for_timeout(100)
    expect(page.get_by_role("button", name="Connected 🟢")).not_to_be_visible()
