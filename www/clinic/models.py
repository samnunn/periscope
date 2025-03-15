from django.db import models


# Create your models here.
class PeriscopeDataType(models.Model):
    ugly_name = models.CharField(
        max_length=200,
        blank=False,
        unique=True,
        primary_key=True,
    )
    pretty_name = models.CharField(max_length=200, blank=False)
    search_name = models.CharField(max_length=200, blank=True)

    output_prefix = models.CharField(max_length=200, blank=True)
    output_suffix = models.CharField(max_length=200, blank=True)

    patient_facing_label = models.CharField(max_length=200, blank=True)
    patient_facing_description = models.TextField(blank=True)

    clinician_facing_label = models.CharField(max_length=200, blank=True)
    clinician_facing_description = models.TextField(blank=True)

    html = models.TextField(blank=False)

    def natural_key(self):
        return self.ugly_name
