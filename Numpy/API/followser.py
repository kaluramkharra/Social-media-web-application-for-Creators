from django.db.models import fields
from requests.models import ReadTimeoutError
from rest_framework import serializers, validators
from .models import Followers

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followers
        fields = ['user','user_followers','following']