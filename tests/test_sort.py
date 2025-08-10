from playwright.sync_api import Page, expect
from utils import run_preamble


def test_sort_calculator_1(page):
    run_preamble(page)
    page.get_by_label("SORT Search").fill("thr")
    page.get_by_text("Primary total hip replacement with or without cement").click()
    page.get_by_label("ASA 1 2 3 4 5").select_option("3")
    page.get_by_label("Malignancy").select_option("No")
    page.get_by_label("Thoracics, GI, or vascular?").select_option("No")
    page.locator("#sort-container").get_by_label("Age").fill("60")
    expect(page.locator('[data-clinic-parameter="sort-score"]')).to_contain_text("0.38")


def test_sort_calculator_2(page):
    run_preamble(page)
    page.get_by_label("SORT Search").fill("thr")
    page.get_by_text("Primary total hip replacement with or without cement").click()
    page.get_by_label("ASA 1 2 3 4 5").select_option("3")
    page.get_by_label("Malignancy").select_option("No")
    page.get_by_label("Thoracics, GI, or vascular?").select_option("No")
    page.locator("#sort-container").get_by_label("Age").fill("80")
    expect(page.locator('[data-clinic-parameter="sort-score"]')).to_contain_text("1.83")
