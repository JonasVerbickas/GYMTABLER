from django.urls import path
from account.api.views import (
    GetCSRFToken,
    SignUpView,
    LoginView,
    LogoutView,
    CheckAuthenticatedView
)

app_name = "account"

urlpatterns = [
    path('CSRF_token', GetCSRFToken.as_view(), name="CSRF"),
    path('register', SignUpView.as_view(), name="register"),
    path('login', LoginView.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name="logout"),
    path('authenticated', CheckAuthenticatedView.as_view(), name="authenticated"),
]
 