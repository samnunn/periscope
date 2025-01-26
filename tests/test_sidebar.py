from playwright.sync_api import Page, expect


def test_sidebar_open_by_default(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()

    expect(
        page.get_by_role("button", name="Search ⌘K").locator("span.right")
    ).to_be_visible()


def test_sidebar_hides(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()

    page.get_by_role("button", name="Unlock Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width < 100


def test_sidebar_reveals_on_hover(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()

    page.get_by_role("button", name="Unlock Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width > 100


def test_sidebar_remembers_unlock(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()

    page.get_by_role("button", name="Unlock Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    page.reload()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width < 100

    page.reload()


def test_sidebar_remembers_lock(page: Page):
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()

    # unlocks it
    page.get_by_role("button", name="Unlock Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    # locks it
    page.get_by_role("button", name="Lock Sidebar").click()
    page.get_by_role("textbox", name="Operation").click()

    page.reload()

    # wait until sidebar has finished animating
    # there was a race condition here where .offsetWidth() was called too early
    page.locator("#sidebar").scroll_into_view_if_needed()

    calculated_width = page.evaluate("document.querySelector('#sidebar').offsetWidth")
    calculated_width = int(calculated_width)
    assert calculated_width > 100

    page.reload()
