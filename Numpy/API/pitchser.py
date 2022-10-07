from django.db.models import fields
from requests.models import ReadTimeoutError
from rest_framework import serializers, validators
from .models import Pitch

class PitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pitch
        fields = ['sno','workuser','content','email','pitcheruser','post','timestamp']