from rest_framework import viewsets
from workshops.models import Workshop
from workshops.serializers import WorkshopSerializer


class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    filterset_fields = ["category"]
