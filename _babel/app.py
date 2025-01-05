from flask import (
    Flask,
    send_file,
    request,
    abort,
    session,
    render_template,
    redirect,
    url_for,
)
import os
from functools import wraps
from werkzeug.utils import secure_filename

# BOOTSTRAPPING
app = Flask(__name__)

# SECRETS
app.secret_key = os.environ.get("FLASK_SECRETKEY")


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
    # return render_template("welcome.html")
    return redirect(url_for("clinic"))


@app.route("/clinic")
def clinic():
    return render_template("clinic.html")


@app.route("/auth", methods=["POST"])
def secrets_auth():
    tenant_name = secure_filename(request.form.get("tenant_name", ""))

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
