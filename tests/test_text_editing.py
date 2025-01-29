import re

from playwright.sync_api import Page, expect


def test_text_expansion(page: Page) -> None:
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("Medications and Fasting").click()
    page.get_by_label("Medications and Fasting").fill("@fast")
    page.wait_for_timeout(50)
    expect(page.get_by_label("Medications and Fasting")).to_have_value(
        re.compile(r"fasting", re.IGNORECASE)
    )


def test_auto_dotpoints(page: Page) -> None:
    page.goto("http://127.0.0.1:8070/clinic")
    page.get_by_role("button", name="Accept").click()
    page.get_by_label("Medications and Fasting").click()
    page.keyboard.insert_text("- Foo")
    page.keyboard.press("Enter")
    page.keyboard.insert_text("Bar")
    page.wait_for_timeout(50)
    expect(page.get_by_label("Medications and Fasting")).to_have_value("- Foo\n- Bar")
