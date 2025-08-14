import os

from blueprints.clinic.clinic import clinic
from blueprints.public.public import public
from blueprints.tenant.tenant import tenant
from flask import (
    Flask,
    redirect,
    url_for,
)

app = Flask(__name__)
app.secret_key = "foobar"

# ENV
DEBUG: bool = os.environ.get("DEBUG", "0") == "1"

# BLUEPRINTS
app.register_blueprint(clinic, url_prefix="/app")
app.register_blueprint(tenant, url_prefix="/tenant")
app.register_blueprint(public, url_prefix="/public")


# ROUTES
@app.route("/")
@app.route("/clinic")
@app.route("/clinic/")
def hello_world() -> str:
    # return 'You\'re late. <a href="/clinic">Go to clinic…</a>'
    return redirect(url_for("clinic.preop"))


# RUN
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8070, debug=DEBUG)
