from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from math import ceil


class CustomPagination(PageNumberPagination):
    page_size_query_param = 'page_size'

    def paginate_queryset(self, queryset, request, view=None):
        no_pagination = request.query_params.get('no_pagination')
        if no_pagination:
            return None
        return super().paginate_queryset(queryset, request, view)

    def get_paginated_response(self, data):
        total_pages = ceil(self.page.paginator.count / self.page_size)
        return Response({
            'total_pages': total_pages,
            'current_page': self.page.number,
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })