# tests/conftest.py
import pytest


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "viewport": {
            "width": 1920,
            "height": 1080,
        },
    }


def pytest_configure(config):
    config.option.base_url = "http://127.0.01:8070"
