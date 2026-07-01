from django.urls import path
from .views import Register
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    path('register/', Register.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),

]