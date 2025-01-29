import os


def get_test_tentant_id():
    secret_file_path = os.path.join(
        os.path.dirname(os.path.realpath(__file__)), "secret_tenant_name.txt"
    )
    with open(secret_file_path, "r") as file:
        return file.read().strip("\n")


def tenant_sign_in(page):
    page.get_by_role("button", name="Connect 🔴").click()
    page.get_by_placeholder("Hospital ID").click()
    page.get_by_placeholder("Hospital ID").fill(get_test_tentant_id())
    page.get_by_role("button", name="Connect", exact=True).click()


def tenant_sign_out(page):
    page.get_by_role("button", name="Connect 🟢").click()
    page.get_by_role("button", name="Disconnect").click()
