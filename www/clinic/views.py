from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.urls import reverse

from clinic.lib import redcap, tenants


def clinic_default(request):
    return render(request, "clinic/layouts/default.html")


def tenant_authorise(request):
    if request.method == "POST":
        success = tenants.auth_start(
            session=request.session, secret=request.POST["tenant_secret"]
        )
        if success:
            messages.success(
                request,
                f"""Connected to {request.session["tenant_data"]["pretty_name"]}""",
            )
        else:
            messages.error(request, "No such tenant exists. Try again.")

    print(request.session)

    return redirect("clinic_default")


def tenant_deauthorise(request):
    if request.method == "POST":
        success = tenants.auth_end(session=request.session)
        if success:
            messages.info(
                request,
                """Disconnected.""",
            )
            return redirect("clinic_default")

    return HttpResponse(status=500)


def tenant_redcap(request):
    tenant_ugly_name = request.session.get("tenant_data")["ugly_name"]
    redcap_file_path = redcap.get_data_path(tenant_ugly_name)
    return HttpResponse(
        open(redcap_file_path, "rb"),
        headers={"Content-Type": "application/javascript"},
    )
