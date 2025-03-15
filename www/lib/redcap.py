#     ____  __________  ______
#    / __ \/ ____/ __ \/ ____/___ _____
#   / /_/ / __/ / / / / /   / __ `/ __ \
#  / _, _/ /___/ /_/ / /___/ /_/ / /_/ /
# /_/ |_/_____/_____/\____/\__,_/ .___/
#                              /_/

import os

from django.conf import settings


def get_data_path(tenant_ugly_name):
    redcap_file_path = os.path.join(
        settings.BASE_DIR, "tenant_data", tenant_ugly_name, "redcap.js"
    )
    if os.path.exists(redcap_file_path):
        return redcap_file_path
    return False
