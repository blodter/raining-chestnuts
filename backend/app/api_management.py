from rest_framework.pagination import PageNumberPagination


class CustomPaginator(PageNumberPagination):
    """
    Custom paginator to handle pagination in the API.
    """
    page_size_query_param = 'page_size'
    page_size = 25
    max_page_size = 100000
    
    def paginate_queryset(self, queryset, request, view=None):
        page_size_param = request.query_params.get(self.page_size_query_param)
        if page_size_param == 'all':
            total = queryset.count() if hasattr(queryset, 'count') else len(queryset)
            self.page_size = total
        return super().paginate_queryset(queryset, request, view)
