from playwright.sync_api import Page, expect
from utils import run_preamble


def test_value_sync(page):
    run_preamble(page)
    page.get_by_placeholder("Search for a condition").click()
    page.get_by_placeholder("Search for a condition").fill("t2dm")
    page.get_by_text("T2DM", exact=True).click()
    page.locator("#diagnosis-list").get_by_label("HbA1c").click()
    page.locator("#diagnosis-list").get_by_label("HbA1c").fill("9.9")
    expect(page.locator("#ix").get_by_label("HbA1c")).to_have_value("9.9")


def test_propagation_sex_apfel(page):
    run_preamble(page)
    page.get_by_label("Sex").select_option("F")
    expect(page.get_by_label("Female", exact=True)).to_be_checked()


def test_propagation_smoking_apfel_non(page):
    run_preamble(page)
    page.get_by_label("Smoking").select_option("never smoked")
    expect(page.get_by_label("Non-smoker")).to_be_checked()


def test_propagation_smoking_apfel_active(page):
    run_preamble(page)
    page.get_by_label("Smoking").select_option("active smoker")
    expect(page.get_by_label("Non-smoker")).not_to_be_checked()


def test_propagation_sex_stopbang(page):
    run_preamble(page)
    page.get_by_label("Sex").select_option("M")
    expect(page.get_by_label("Male", exact=True)).to_be_checked()


def test_propagation_age_stopbang(page):
    run_preamble(page)
    page.locator("#details").get_by_label("Age").fill("51")
    expect(page.get_by_label("Age > 50", exact=True)).to_be_checked()


def test_rendering_bmi(page):
    run_preamble(page)
    page.get_by_label("Height (cm)").fill("180")
    page.get_by_label("Weight (kg)").fill("180")
    expect(page.locator("#details").get_by_label("BMI")).to_have_value("55.6")


def test_propagation_bmi_stopbang(page):
    run_preamble(page)
    page.get_by_label("Height (cm)").fill("180")
    page.get_by_label("Weight (kg)").fill("180")
    expect(page.get_by_label("BMI > 35", exact=True)).to_be_checked()
