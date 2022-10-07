from django.db.models import fields
from requests.models import ReadTimeoutError
from rest_framework import serializers, validators
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['uid','name','email','password','bio','profile_image']