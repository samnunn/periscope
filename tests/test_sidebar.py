from playwright.sync_api import Page, expect
from utils import run_preamble


def test_sidebar_open_by_default(page: Page):
    run_preamble(page)

    #     page.get_by_role("button", name="Unlock Sidebar").click()
    #     page.get_by_role("textbox", name="Operation").click()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width > 100  # px


def test_sidebar_hides_on_first_toggle(page: Page):
    run_preamble(page)

    page.get_by_role("button", name="Close Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width < 100  # px


def test_sidebar_reveals_again_after_hidden(page: Page):
    run_preamble(page)

    page.get_by_role("button", name="Close Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    page.get_by_role("button", name="Close Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()
    page.wait_for_timeout(500)

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width > 100  # px


def test_sidebar_remembers_nondefault_state_after_refresh(page: Page):
    run_preamble(page)

    page.get_by_role("button", name="Close Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    page.reload()
    page.wait_for_load_state()
    page.wait_for_timeout(500)

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width < 100  # px
