#     ____  __________  ______
#    / __ \/ ____/ __ \/ ____/___ _____
#   / /_/ / __/ / / / / /   / __ `/ __ \
#  / _, _/ /___/ /_/ / /___/ /_/ / /_/ /
# /_/ |_/_____/_____/\____/\__,_/ .___/
#                              /_/

import os


def get_data_path(tenant_ugly_name):
    redcap_file_path = os.path.join("tenants", tenant_ugly_name, "redcap.js")
    if os.path.exists(redcap_file_path):
        return redcap_file_path
    return False
