from .models import Book, Author
from .serializers import BookSerializer, AuthorSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status


def get_book_with_filters(query_params):
    books = Book.objects.all()

    title = query_params.get('title')
    if title:
        books = books.filter(title__icontains=title)

    author = query_params.get('author')
    if author:
        books = books.filter(author_id=author)

    category = query_params.get('category')
    if category:
        books = books.filter(categories__id=category)

    limit = query_params.get('limit')
    if (limit):
        books = books[:int(limit)]

    serializer = BookSerializer(books, many=True)
    return serializer.data

def get_book_by_id(book_id):
    book = get_object_or_404(Book, id=book_id)
    serializer = BookSerializer(book)
    return serializer.data


def create_book(data):
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return serializer.data, status.HTTP_201_CREATED
    return serializer.errors, status.HTTP_400_BAD_REQUEST


def update_book(book_id, data):
    book = get_object_or_404(Book, id=book_id)
    serializer = BookSerializer(book, data=data)
    if serializer.is_valid():
        serializer.save()
        return serializer.data, status.HTTP_200_OK
    return serializer.errors, status.HTTP_400_BAD_REQUEST

def patch_book(book_id, data):
    book = get_object_or_404(Book, id=book_id)
    serializer = BookSerializer(book, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return serializer.data, status.HTTP_200_OK
    return serializer.errors, status.HTTP_400_BAD_REQUEST

def delete_book(book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return status.HTTP_204_NO_CONTENT

def get_all_authors():
    authors = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)
    return serializer.data