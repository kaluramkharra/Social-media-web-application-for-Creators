from django.db.models import fields
from requests.models import ReadTimeoutError
from rest_framework import serializers, validators
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['no','user','content','url','timestamp']