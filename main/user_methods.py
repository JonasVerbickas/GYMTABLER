import re
from django.contrib.auth import get_user_model


def validateusername(uname, email):

    if get_user_model().objects.filter(username=uname).exists():
        return False, "Username already exists."

    if get_user_model().objects.filter(email=email).exists():
        return False, "Email is already used by a user."

    return True, f"User {uname} created successfully."
