from django.urls import path

from . import views

urlpatterns = [
    path("", views.clinic_default, name="clinic_default"),
    path("cataracts", views.clinic_cataracts, name="clinic_cataracts"),
    path("start", views.clinic_start, name="clinic_start"),
    path("tenant/authorise", views.tenant_authorise, name="tenant_authorise"),
    path("tenant/deauthorise", views.tenant_deauthorise, name="tenant_deauthorise"),
    path("tenant/redcap.js", views.tenant_redcap, name="tenant_redcap"),
]
