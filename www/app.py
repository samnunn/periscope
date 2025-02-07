import base64
import os

import lib.redcap as redcap
import lib.tenants as tenants
import sentry_sdk
from flask import (
    Flask,
    abort,
    flash,
    redirect,
    render_template,
    request,
    send_file,
    session,
    url_for,
)
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_minify import Minify
from livereload import Server

# BOOTSTRAPPING
app = Flask(__name__)

# SECRETS
app.secret_key = os.environ.get("FLASK_SECRETKEY")

# RATE LIMITER
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=[],
    storage_uri="memory://",
)

# ENV-SPECIFIC FEATURES
if os.environ.get("ENV") == "development":
    app.debug = True
    limiter.enabled = False
else:
    # MINIFICATION
    Minify(app=app, html=True, js=True, cssless=True)
    # SENTRY
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        send_default_pii=True,
        traces_sample_rate=1.0,
        _experiments={
            "continuous_profiling_auto_start": True,
        },
    )


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
    return render_template(
        "html/clinic/layouts/default.html", tenant=session.get("tenant_data")
    )


@app.route("/clinic/cataracts")
def cataracts():
    return render_template(
        "html/clinic/layouts/cataracts.html", tenant=session.get("tenant_data")
    )


# TENANTS
@app.post("/tenant/authorise")
@limiter.limit("1/second")
@limiter.limit("50/minute")
@limiter.limit("100/day")
def tenant_authorise():
    if request.method == "POST":
        success = tenants.auth_start(
            session=session, secret=request.form["tenant_secret"]
        )
        if not success:
            flash("No such tenant exists. Try again.")
    return redirect(url_for("clinic"))


@app.post("/tenant/deauthorise")
def tenant_deauthorise():
    if request.method == "POST":
        success = tenants.auth_end(session=session)
        if not success:
            abort(500)
    return redirect(url_for("clinic"))


@app.get("/tenant/redcap.js")
@tenants.tenancy_required
def tenant_redcap():
    tenant_ugly_name = session.get("tenant_data")["ugly_name"]
    redcap_file_path = redcap.get_data_path(tenant_ugly_name)
    return send_file(redcap_file_path, mimetype="application/javascript")


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


if __name__ == "__main__":
    server = Server(app.wsgi_app)
    server.watch("static/*")
    server.watch("templates/*")
    server.watch("app.py")
    server.serve(port=8070, host="0.0.0.0")
