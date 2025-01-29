import json
import os
import sys
from functools import wraps
from typing import Callable

from flask import abort, request, session
from werkzeug.utils import secure_filename


def tenancy_required(f: Callable) -> Callable:
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not auth_check(session=session):
            abort(401)
        return f(*args, **kwargs)

    return decorated_function


def auth_start(session: session, secret: str) -> bool:
    # clean up untrusted input
    secret = secure_filename(secret)
    secret = secret.upper()

    # check if data exists
    tenant_folder = os.path.join("tenants", f"{secret}")
    tenant_data = os.path.join(tenant_folder, "tenant.json")
    if os.path.exists(tenant_data):
        with open(tenant_data, "r") as f:
            session["tenant_data"] = json.load(f)
        return True

    # fallback
    return False


def auth_check(session: session) -> bool:
    if session.get("tenant_data"):
        return True
    return False


def auth_end(session: session) -> bool:
    del session["tenant_data"]
    return True


def secrets_auth():
    tenant_name = secure_filename(request.form.get("tenant_name", ""))
    tenant_name = tenant_name.upper()

    # empty requests
    if not tenant_name:
        abort(400)

    # example code
    if tenant_name == "example":
        abort(400)

    tenant_path = os.path.join("tenants", f"{tenant_name}")

    # nonexistent
    if not os.path.exists(tenant_path):
        abort(403)

    session["tenant"] = tenant_name

    return "OK"
