from rest_framework import serializers
from django.utils import timezone
from workshops.models import Workshop


class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = "__all__"

    def validate_name(self, value: str) -> str:
        if value.strip() is None:
            raise serializers.ValidationError("Name cannot be empty.")
        return value

    def validate_start_date(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Start date cannot be in the past.")
        return value

    def validate_category(self, value: str) -> str:
        if value.strip() is None:
            raise serializers.ValidationError("Category cannot be empty.")
        return value
