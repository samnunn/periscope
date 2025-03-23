from django.shortcuts import redirect, render


# Create your views here.
def index(request):
    # return render(request, "public/welcome.html")
    return redirect("clinic_default")


def public_welcome(request):
    return render(request, "public/welcome.html")
