import os

from playwright.sync_api import Page


def run_preamble(page: Page):
    # page.set_default_timeout(2000)
    page.goto("http://127.0.0.1:8070/app/preop")
    page.locator("#authorisation span").click()


def get_test_tentant_id():
    secret_file_path = os.path.join(
        os.path.dirname(os.path.realpath(__file__)), "demo_tenant.txt"
    )
    with open(secret_file_path, "r") as file:
        return file.read().strip("\n")


def tenant_sign_in(page):
    page.get_by_role("button", name="Connect 🔴").click()
    page.get_by_placeholder("Hospital Code").click()
    page.get_by_placeholder("Hospital Code").fill(get_test_tentant_id())
    page.get_by_role("button", name="Connect", exact=True).click()
    page.main_frame.wait_for_load_state()


def tenant_sign_out(page):
    page.get_by_role("button", name="Connected 🟢").click()
    page.get_by_role("button", name="Disconnect").click()
    page.main_frame.wait_for_load_state()
