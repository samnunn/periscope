from flask import Blueprint, render_template, url_for

public: Blueprint = Blueprint(
    "public", __name__, template_folder="templates", static_folder="static"
)


@public.route("/")
def homepage():
    return render_template("public/pages/homepage.html")
