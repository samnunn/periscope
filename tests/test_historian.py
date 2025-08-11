import re

from playwright.sync_api import Page, expect
from utils import run_preamble


def test_diagnosis_adding(page: Page):
    run_preamble(page)
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("t2d")
    page.get_by_role("listitem").filter(has_text="T2DM").click()
    expect(
        page.locator('clinic-diagnosis[clinic-parameter="diagnosis-t2dm"]')
    ).to_be_visible()


def test_custom_diagnosis_adding(page: Page):
    run_preamble(page)

    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("rhubarbosis")

    page.get_by_role("listitem").filter(has_text="rhubarbosis").click()

    expect(page.locator("#diagnosis-list input")).to_have_value("rhubarbosis")


def test_custom_diagnosis_persistence(page: Page):
    run_preamble(page)

    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("rhubarbosis")

    page.get_by_role("listitem").filter(has_text="rhubarbosis").click()

    page.reload()

    expect(page.locator("#diagnosis-list input")).to_have_value("rhubarbosis")
