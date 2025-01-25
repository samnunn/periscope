import base64
import os
from functools import wraps

from flask import (
    Flask,
    abort,
    redirect,
    render_template,
    request,
    send_file,
    session,
    url_for,
)
from flask_minify import Minify
from werkzeug.utils import secure_filename

# BOOTSTRAPPING
app = Flask(__name__)

# SECRETS
app.secret_key = os.environ.get("FLASK_SECRETKEY")

# MINIFICATION
# Minify(app=app, html=True, js=True, cssless=True)


# UTILITY FUNCTIONS
def tenancy_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "tenant" not in session:
            abort(401)
        return f(*args, **kwargs)

    return decorated_function


# ROUTES
@app.route("/")
def index():
    # return render_template("html/welcome.html")
    return redirect(url_for("clinic"))


@app.route("/welcome")
def welcome():
    return render_template("html/welcome.html")


@app.route("/clinic")
def clinic():
    return render_template("html/clinic/layouts/default.html")


@app.route("/clinic/cataracts")
def cataracts():
    return render_template("html/clinic/layouts/cataracts.html")


@app.route("/auth", methods=["POST"])
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


@app.route("/deeplinks.js")
@tenancy_required
def get_deeplinks():
    deeplinks_path = os.path.join("tenants", session["tenant"], "deeplinks.js")
    return send_file(deeplinks_path)


@app.route("/redcap.js")
@tenancy_required
def get_redcap():
    redcap_path = os.path.join("tenants", session["tenant"], "redcap.js")
    return send_file(redcap_path)


# FILTERS
@app.template_filter("static_base64")
def static_base64(str):
    map = {
        "svg": "image/svg+xml",
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "gif": "image/gif",
        "ico": "image/x-icon",
        "webp": "image/webp",
        "js": "application/javascript",
        "css": "text/css",
        "json": "application/json",
        "html": "text/html",
        "txt": "text/plain",
    }
    ext = os.path.splitext(str)[1][1:]
    if ext in map:
        with open(os.path.join(app.static_folder, str), "rb") as f:
            b64 = base64.b64encode(f.read())
        return f"data:{map[ext]};base64," + b64.decode("utf-8")

    return ""


@app.template_filter("static_include")
def static_include(str):
    with open(os.path.join(app.static_folder, str), "r") as f:
        data = f.read()
    return data
