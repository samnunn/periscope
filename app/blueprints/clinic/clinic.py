import base64
import os
import random

from flask import Blueprint, redirect, render_template, url_for
from markupsafe import Markup

clinic: Blueprint = Blueprint(
    "clinic", __name__, template_folder="templates", static_folder="static"
)

# VIEWS


@clinic.route("/")
def index():
    return redirect(url_for("clinic.preop"))


@clinic.route("/preop")
def preop():
    return render_template("clinic/layouts/pre_assessment.html")


@clinic.route("/print")
def print():
    return render_template("clinic/layouts/print.html")


# CONTEXT PROCESSORS AND FILTERS


@clinic.app_template_filter("static_include")
def static_include(str_in):
    with open(os.path.join(clinic.static_folder, str_in), "r") as f:
        return f.read()


@clinic.app_template_filter("static_base64")
def static_base64(str_in):
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
    ext = os.path.splitext(str_in)[1][1:]
    if ext in map:
        with open(os.path.join(clinic.static_folder, str_in), "rb") as f:
            b64 = base64.b64encode(f.read())
        return f"data:{map[ext]};base64," + b64.decode("utf-8")


@clinic.context_processor
def clinic_input_processor():
    def clinic_input(parameter, label_visible=True, hidden=False, classes=""):
        template_path = f"clinic/inputs/input-{parameter}.html"
        return render_template(
            template_path,
            parameter=parameter,
            label_visible=label_visible,
            hidden=hidden,
            classes=classes,
        )

    return dict(clinic_input=clinic_input)


@clinic.context_processor
def anon_input_processor() -> dict:
    def anon_input(parameter: str, **kwargs) -> Markup:
        return Markup("hmm: " + parameter)

    return dict(anon_input=anon_input)


@clinic.context_processor
def clinic_diagnosis_processor():
    def clinic_diagnosis(id):
        template_path = f"clinic/diagnoses/diagnosis-{id}.html"
        return render_template(
            template_path,
            id=id,
        )

    return dict(clinic_diagnosis=clinic_diagnosis)


@clinic.context_processor
def clinic_all_diagnoses_processor():
    def all_clinic_diagnoses():
        all_templates = ""
        template_dir = os.path.join(
            clinic.root_path, clinic.template_folder, "clinic", "diagnoses"
        )
        for path in os.listdir(template_dir):
            if not path.startswith("_"):
                diagnosis_id = path.split(".")[0].replace("diagnosis-", "")
                html = render_template(
                    os.path.join("clinic", "diagnoses", path), id=diagnosis_id
                )
                all_templates += html
        return all_templates

    return dict(all_clinic_diagnoses=all_clinic_diagnoses)


@clinic.context_processor
def random_placeholder_illustration_processor():
    def random_placeholder_illustration():
        options = [
            "img/backdrop_illustrations/anaesthetic_machine.svg",
            "img/backdrop_illustrations/propeller_hat.svg",
            "img/backdrop_illustrations/ketamine_ampoule.svg",
            "img/backdrop_illustrations/propofol_molecule.svg",
            "img/backdrop_illustrations/macintosh_laryngoscope.svg",
            "img/backdrop_illustrations/midazolam.svg",
            "img/backdrop_illustrations/no_smoking.svg",
        ]
        return static_base64(random.choice(options))

    return dict(random_placeholder_illustration=random_placeholder_illustration)


@clinic.context_processor
def random_number_processor():
    def random_number():
        return "".join([str(random.randint(0, 9)) for _ in range(10)])

    return dict(random_number=random_number)
