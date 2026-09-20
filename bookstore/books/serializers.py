from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Author, Category, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'bio')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')

class BookSerializer(serializers.ModelSerializer):

    categories = CategorySerializer(many=True, read_only=True)

    author = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        error_messages={
            'does_not_exist': 'The specified author ID does not exist.',
            'incorrect_type': 'Author ID must be a valid ID.',
            'required': 'Author is required.',
        }
    )


    author_name = serializers.CharField(source='author.name', read_only=True)

    isbn = serializers.CharField(
        max_length=13,
        validators=[
            UniqueValidator(
                queryset=Book.objects.all(),
                message="A book with this ISBN already exists."
            )
        ]
    )

    class Meta:
        model = Book
        fields = ('id', 'description', 'title', 'isbn', 'pages', 'price', 'stock', 'published_date', 'author', 'author_name', 'categories')

