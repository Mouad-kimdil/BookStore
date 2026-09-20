from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import (
    get_book_with_filters, create_book, update_book,
    get_book_by_id, delete_book, patch_book,
    get_all_authors
)

@api_view(['GET', 'POST'])
def book_list(request):
    if request.method == 'GET':
        books = get_book_with_filters(request.query_params)
        return Response(books)
    elif request.method == 'POST':
        data, status = create_book(request.data)
        return Response(data, status=status)
    
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def book_detail(request, book_id):
    if request.method == 'GET':
        data = get_book_by_id(book_id)
        return Response(data)
    elif request.method == 'PUT':
        data, status = update_book(book_id, request.data)
        return Response(data, status=status)
    elif request.method == 'PATCH':
        data, status = patch_book(book_id, request.data)
        return Response(data, status=status)
    elif request.method == 'DELETE':
        status = delete_book(book_id)
        return Response(status=status)

@api_view(['GET'])
def author_list(request):
    if request.method == 'GET':
        authors = get_all_authors()
        return Response(authors)