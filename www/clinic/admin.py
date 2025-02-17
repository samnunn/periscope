from django.contrib import admin

from .models import PeriscopeDataType


# Register your models here.
@admin.register(PeriscopeDataType)
class PeriscopeDataTypeAdmin(admin.ModelAdmin):
    list_display = ["ugly_name"]
    pass
