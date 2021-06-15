from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', ])
def getRoutes(request):

    return Response('Hello', safe=False)


def getProducts(requrest):
    return JsonResponse(products, safe=False)
