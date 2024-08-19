from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *


class GameViewSet(ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        type = self.request.query_params.get('type', None)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset
