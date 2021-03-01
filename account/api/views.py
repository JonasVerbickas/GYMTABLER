from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import permissions
from account.api.serializers import RegistrationSerializer
from account.models import Account


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': "CSRF Token set"})


@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        isAuthenticated = Account.is_authenticated

        if isAuthenticated:
            return Response({"response": "Authenticated"})
        else:
            return Response({"response": "Authentication Failed"})


@method_decorator(csrf_protect, name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = {}

        serializer = RegistrationSerializer(data=self.request.data)
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "User Created Successfully"
            data['email'] = account.email
            data['username'] = account.username
        else:
            data = serializer.errors
        return Response(data)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        email = data['email']
        password = data['password']
        data = {}

        account = authenticate(username=email, password=password)

        if account:
            login(request, account)
            data['email'] = email
            data['response'] = "Successfully Authenticated"
            return Response(data)
        else:
            data['response'] = "Authentication Error"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)   

class LogoutView(APIView):
    def post(self, request, format=None):
        logout(request)
        return Response({'Logout': "Success"})