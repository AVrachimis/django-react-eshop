from django.shortcuts import render
from rest_framework import serializers

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer

from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET', ])
def getProducts(request):
    query = request.query_params.get('keyword')

    if query is None:
        query=''

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products, 4)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page is None:
        page = 1


    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':int(page), 'pages':paginator.num_pages})

@api_view(['GET', ])
def getTopProducts(request):

    products = Product.objects.filter(rating__gt=4).order_by('rating')[::-1][:5]
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['DELETE', ])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response("Product Successfully Deleted")


@api_view(['POST', ])
@permission_classes([IsAdminUser])
def createProduct(request):

    product = Product.objects.create(
        user = request.user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample Category',
        description = 'Sample Description'

    )
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['PUT', ])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = Product.objects.get(_id=pk)

    data = request.data

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.name = data['name']

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['POST', ])
# @permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data

    product = Product.objects.get(_id = data['product_id'])
    product.image = request.FILES.get('image')
    product.save()

    return Response("Image Succcessfully Uploaded")



@api_view(['POST', ])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):

    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    """
    Case 1: Customer already written a review
    Case 2: Rating is not entered
    Case 3: Create the review
    """

    alreadyExist = product.review_set.filter(user=user).exists()

    if alreadyExist:
        content = {'detail':"Product Already Reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail':"Please Select Rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.username,
            rating = data['rating'],
            comment = data['comment'],
        )
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for review in reviews:
            total+=review.rating

        product.rating = total / len(reviews)

        product.save()

    return Response("Review added successfully")
    # return Response({'detail':"Review added successfully"})