import json
import os

from flask import Blueprint, abort, current_app, flash, redirect, request, session
from werkzeug.utils import secure_filename

tenant: Blueprint = Blueprint(
    "tenant", __name__, template_folder="templates", static_folder="static"
)


# AUTH


@tenant.post("/auth")
def auth():
    tenant_name = secure_filename(request.form.get("tenant_secret", ""))
    tenant_name = tenant_name.upper()

    # empty requests
    if not tenant_name:
        abort(400)

    # example code
    if tenant_name == "example":
        abort(400)

    tenant_path = os.path.join(tenant.root_path, "sites", f"{tenant_name}.json")

    # nonexistent
    if not os.path.exists(tenant_path):
        abort(403)

    with open(tenant_path, "r") as f:
        try:
            tenant_json = json.load(f)
            session["tenant"] = tenant_json
        except ValueError as e:
            current_app.logger.error(
                "Authentication failed because of invalid JSON found in '%s':\n%s",
                tenant_path,
                e,
            )
            abort(403)

    # success
    flash(f"Connected to {tenant_json.get("pretty_name", "hospital")}", "success")
    return redirect(request.origin)


@tenant.post("/deauth")
def deauth():
    session.pop("tenant", None)

    flash("Disconnected", "info")
    return redirect(request.origin)


@tenant.app_context_processor
# uses 'app_context_processor' instead of plain 'context_processor' because this needs to be accessed from other blueprints' templates
def surveys_processor():
    def surveys():
        survey_names = session.get("tenant", {}).get("surveys", [])
        data: dict = []
        for sn in survey_names:
            survey_path = os.path.join(tenant.root_path, "surveys", f"{sn}.js")
            try:
                with open(survey_path, "r") as f:
                    data.append(f.read())
            except Exception as e:
                current_app.logger.error(
                    "surveys() failed to load '%s' from '%s' because of the following error:\n%s",
                    sn,
                    survey_path,
                    e,
                )

        return f"[{", ".join(data)}]"

    return dict(surveys=surveys)
