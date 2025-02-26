import base64
import os
import random

from django import template
from django.contrib.staticfiles import finders
from django.utils.html import format_html

from clinic.models import PeriscopeDataType

register = template.Library()


@register.filter(name="static_base64")
def static_base64(str):
    path = finders.find(str)
    assert path is not None, f"Static file {str} not found"

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
    ext = os.path.splitext(path)[1][1:]
    assert ext is not None, f"Static file {str} has no extension"

    if ext in map:
        with open(path, "rb") as f:
            b64 = base64.b64encode(f.read())
        return f"data:{map[ext]};base64," + b64.decode("utf-8")

    return ""


@register.filter(name="static_include")
def static_include(str):
    path = finders.find(str)
    assert path is not None, f"Static file {str} not found"

    with open(path, "r") as f:
        data = f.read()
    return data


@register.simple_tag
def random_placeholder_illustration():
    options = [
        "illustrations/anaesthetic_machine.svg",
        "illustrations/propeller_hat.svg",
        "illustrations/ketamine_ampoule.svg",
        "illustrations/propofol_molecule.svg",
        "illustrations/macintosh_laryngoscope.svg",
        "illustrations/midazolam.svg",
        "illustrations/no_smoking.svg",
    ]
    return static_base64(random.choice(options))


@register.simple_tag
def random_number():
    return str(random.randint(0, 1000000000))


@register.simple_tag
def input(name, label=True, audience="medical", classes=""):
    try:
        obj = PeriscopeDataType.objects.get(ugly_name=name)
    except PeriscopeDataType.DoesNotExist:
        return ""

    if label:
        innerHTML = f"<label>{obj.clinician_facing_label or obj.pretty_name or obj.ugly_name}{obj.html}</label>"
    else:
        innerHTML = obj.html

    return format_html(
        '<clinic-input class="%s" clinic-parameter="%s" clinic-search="%s">%s</clinic-input>'
        % (classes, name, obj.search_name or "", innerHTML)
    )
