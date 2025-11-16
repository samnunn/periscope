import re

from playwright.sync_api import Page, expect
from utils import run_preamble


def test_text_expansion(page: Page) -> None:
    run_preamble(page)
    page.get_by_label("Key Issues").click()
    page.get_by_label("Key Issues").fill("@fast")
    page.wait_for_timeout(50)
    expect(page.get_by_label("Key Issues")).to_have_value(
        re.compile(r"fasting", re.IGNORECASE)
    )


def test_auto_dotpoints(page: Page) -> None:
    run_preamble(page)
    page.get_by_label("Key Issues").click()
    page.keyboard.insert_text("- Foo")
    page.keyboard.press("Enter")
    page.keyboard.insert_text("Bar")
    page.wait_for_timeout(50)
    expect(page.get_by_label("Key Issues")).to_have_value("- Foo\n- Bar")
