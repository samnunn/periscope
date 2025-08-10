from playwright.sync_api import Page, expect
from utils import run_preamble
import re


def test_diagnosis_adding(page):
    run_preamble(page)
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("t2d")
    page.get_by_role("listitem").filter(has_text="T2DM").click()
    expect(
        page.locator('clinic-diagnosis[clinic-parameter="diagnosis-t2dm"]')
    ).to_be_visible()
