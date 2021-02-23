import re
from django.contrib.auth.models import User

def validateusername(uname, email):
	if len(uname) < 4:
		return 1, "Username must be a minimum of 4 characters long."
	elif len(uname) > 15:
		return 1, "Username must be a maximum of 15 characters long."

	pattern = re.compile("^([a-z]|[A-Z]|[0-9])+$")

	if not pattern.match(uname):
		return 1, "Username must only contain letters and numbers."

	if User.objects.filter(username=uname).exists():
		return 2, "Username already exists."

	if User.objects.filter(email=email).exists():
		return 2, "Email is already used by a user."

	return 0, f"User {uname} created successfully."

def validatepassword(pw):
	if not 8 < len(pw) < 32:
		return 1, "Password must be between 8 and 32 characters long."

	pattern = re.compile("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")

	if not pattern.match(pw):
		return 1, "Password must contain at least 1 letter, 1 number and 1 special character."

	return 0, ""
