from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product
from .products import products
from .serializers import ProductSerializer


@api_view(['GET', ])
def getRoutes(request):
    routes = []
    return Response(routes)


@api_view(['GET', ])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET', ])
def getProduct(request, pk):
    product = None
    for prod in products:
        if prod['_id'] == pk:
            product = prod
            break
    return Response(product)
