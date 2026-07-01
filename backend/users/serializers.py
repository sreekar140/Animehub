from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) #we cannot retrive the password during get
    phone = serializers.CharField(write_only= True)
    class Meta:
        model = User
        fields = ['username', 'email','password','phone']
    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    def create(self, validated_data):
        phone = validated_data.pop("phone")
        user=User.objects.create_user(**validated_data)
        Profile.objects.create(user=user,phone=phone)
        return user
