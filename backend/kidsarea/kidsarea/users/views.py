from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from .serializers import *
from .models import *
from rest_framework.decorators import action

# for getting models permissions
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = super(UserViewSet, self).get_queryset()

        search_query = self.request.query_params.get('search', None)

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(username__icontains=search_query) |
                Q(national_id__icontains=search_query) |
                Q(phone__icontains=search_query)
            )

        is_superuser_param = self.request.query_params.get('is_superuser', None)
        if is_superuser_param:
            if is_superuser_param.lower() == 'true':
                queryset = queryset.filter(is_superuser=True)

        return queryset


@api_view(['GET'])
@permission_classes([AllowAny])
def get_authenticated_user(request):
    user = request.user
    serializer = UserSerializer(user, context={"request": request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_models_permissions(request):
    user_permissions = {}
    user = request.user
    data = request.data
    models = [apps.get_model(app_label, model_name) for app_label, model_name in
              (model.split(".") for model in data["models"])]
    for model in models:
        content_type = ContentType.objects.get_for_model(model)
        model_permissions = Permission.objects.filter(content_type=content_type)
        permissions = user.user_permissions.filter(id__in=model_permissions)
        user_permissions[f"{model._meta.app_label}.{model._meta.model_name}"] = [permission.codename for permission in
                                                                                 permissions]

    # model = apps.get_model('users', user.username)
    return Response(data=user_permissions, status=status.HTTP_200_OK)


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()

    def get_queryset(self):
        queryset = super(EmployeeViewSet, self).get_queryset()
        search_query = self.request.query_params.get('search', None)
        is_trainer_param = self.request.query_params.get('trainer', None)

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(phone__icontains=search_query) |
                Q(national_id__icontains=search_query)
            )

        return queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EmployeeWriteSerializer
        return EmployeeReadSerializer


class NationalityViewSet(ModelViewSet):
    queryset = Nationality.objects.all()
    serializer_class = NationalitySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class MaritalStatusViewSet(ModelViewSet):
    queryset = MaritalStatus.objects.all()
    serializer_class = MaritalStatusSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class EmployeeTypeViewSet(ModelViewSet):
    queryset = EmployeeType.objects.all()
    serializer_class = EmployeeTypeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class CityViewSet(ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class CityDistrictViewSet(ModelViewSet):
    queryset = CityDistrict.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CityDistrictWriteSerializer
        return CityDistrictReadSerializer


class ModeratorViewSet(ModelViewSet):
    queryset = Moderator.objects.all()

    def get_queryset(self):
        queryset = super(ModeratorViewSet, self).get_queryset()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(Q(employee__name__icontains=search_query) |
                                       Q(employee__national_id__icontains=search_query) |
                                       Q(employee__phone__icontains=search_query) |
                                       Q(user__username__icontains=search_query))

        return queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ModeratorWriteSerializer
        return ModeratorReadSerializer
