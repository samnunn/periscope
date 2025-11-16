import base64
import datetime
import os
import random
import re

import jinja2
from flask import (
    Blueprint,
    redirect,
    render_template,
    render_template_string,
    request,
    url_for,
)
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


def render_template_from_file(template, **kwargs):
    template_path = f"clinic/inputs/input-{template}.html"
    output = render_template(
        template_path,
        parameter=template,
        label_visible=kwargs.get("label_visible", True),
        classes=kwargs.get("classes", ""),
    )
    return Markup(output)


@clinic.context_processor
def anon_input_processor() -> dict:
    def anon_input(
        name="",
        template="",
        label="",
        prefix="",
        suffix="",
        default="",
        options=[],
        *args,
        **kwargs,
    ) -> Markup:
        # when template is set, render from template on disk
        # otherwise proceed to render an "anonymous" input on the fly
        if template:
            return render_template_from_file(template, **kwargs)

        # sanity check
        if not name:
            raise TypeError('clinic_input() needs parameter "name" to be set')

        name_validator = re.compile(r"^\w[\w-]+\w$")
        matches = re.match(pattern=name_validator, string=name)
        if not matches:
            raise ValueError(
                "clinic_input() needs a name containing only lowercase letters and en-dashes"
            )

        # preflight
        if not hasattr(request, "anon_templates"):
            request.anon_templates = []

        # can't use an parameter name for more than one input
        if name in request.anon_templates:
            raise jinja2.TemplateError(
                f"Namespace collision when rendering anonymous templates (the name '{name}' has already been used for another anonymous input)"
            )
        request.anon_templates.append(name)

        # create a random id to be assigned to the input, for its <label for="boo"> to refer to
        input_id = random.randint(10**9, 10**10 - 1)

        # render
        attrs = f' id="{input_id}"'
        for key, val in kwargs.items():
            attrs += f' {key}="{val}"'

        # special case for type="select"
        if kwargs.get("type", "") == "select":
            optionstring = ""
            for o in options:
                if isinstance(o, str):
                    optionstring += f'<option value="{o}">{o}</option>\n'
                else:
                    optionstring += f'<option value="{o[0]}">{o[1]}</option>\n'

            inputblock = f"""
            {{% block input %}}
            <div class="selectbox">
            <select{attrs}>
            <option value="" selected></option>
            {optionstring}
            </select>
            </div>
            {{% endblock %}}
            """

        # special case for type="radio"
        elif kwargs.get("type", "") == "radio":
            radiobuttons = ""
            for o in options:
                radiobuttons += f"""
                    <input type="radio" name="radios-{name}" id="{input_id}-{o[0]}" tabindex="0" value="{o[0]}">
                    <label for="{input_id}-{o[0]}">{o[1]}</label>
                """
            inputblock = f"""
            {{% block input %}}
            <fieldset {attrs} class="segmented-control">
            {radiobuttons}
            </fieldset>
            {{% endblock %}}
            """

        # special case for textarea
        elif kwargs.get("type", "") == "textarea":
            inputblock = f"""{{% block input %}}<textarea autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="{kwargs.get("placeholder", "")}"{attrs}></textarea>{{% endblock %}}"""

        # general case
        else:
            inputblock = f"{{% block input %}}<input{attrs}>{{% endblock %}}"

        templatestring = f"""
        {{% extends 'clinic/inputs/_base_input.html' %}}
        {{% block label %}}{label}{{% endblock %}}
        {{% block prefix %}}{prefix or label or ""}{{% endblock %}}
        {{% block suffix %}}{suffix}{{% endblock %}}
        {inputblock}
        """

        output = render_template_string(
            templatestring,
            parameter=name,
            input_id=input_id,
            default_value=default,
            label_visible=bool(label),
            classes=kwargs.get("classes", ""),
        )

        return Markup(output)

    return dict(clinic_input=anon_input)


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


@clinic.context_processor
def inject_today_date():
    return {"today_date": datetime.date.today()}
