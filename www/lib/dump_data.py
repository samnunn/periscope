import os
import sys

import django
from django.core import serializers

sys.path.append("/app")

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "periscope.settings")
django.setup()

from clinic.models import PeriscopeDataType

data = serializers.serialize(
    "json",
    PeriscopeDataType.objects.all(),
    indent=2,
    # use_natural_primary_keys=True,
    # use_natural_foreign_keys=True,
)

with open("data/defaults/default_data.json", "w") as f:
    f.write(data)
