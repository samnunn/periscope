from clinic.models import PeriscopeDataType

print("hi")


for i in json:
    entry = PeriscopeDataType.objects.filter(ugly_name=i["ugly_name"]).exists()
    if not entry:
        new = PeriscopeDataType.objects.create(
            ugly_name=i["ugly_name"],
            pretty_name=i["pretty_name"],
            html=i["html"].strip(),
            search_name=i.get("search_name") or "",
        )
        new.save()
