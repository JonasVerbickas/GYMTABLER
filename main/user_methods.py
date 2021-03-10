import re
from django.contrib.auth.models import User

def validateusername(uname, email):

	if User.objects.filter(username=uname).exists():
		return False, "Username already exists."

	if User.objects.filter(email=email).exists():
		return False, "Email is already used by a user."

	return True, f"User {uname} created successfully."

