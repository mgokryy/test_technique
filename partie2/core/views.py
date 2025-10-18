from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

#register endpoint 
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if (serializer.is_valid()):
        serializer.save() 
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status =  status.HTTP_400_BAD_REQUEST)



#surface endpoint
@api_view(['POST'])
@permission_classes([AllowAny])
def surface(request):
    data = request.data
    try:
        width = float(data.get('width'))
        height = float(data.get('height'))
    except Exception:
        return Response({'error': 'Width et Height doivent etre des nombres'}, status = status.HTTP_400_BAD_REQUEST)
    surface = width * height
    return Response({'surface': surface}, status = status.HTTP_200_OK)

#resistance endpoint
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resistance(request):
    data = request.data
    layers = data.get('layers', [])
    if not isinstance(layers, list) or len(layers) == 0:
        return Response({'error': 'Layers doit etre une liste et etre non vide'}, status = status.HTTP_400_BAD_REQUEST)
    details = []
    resistance_total = 0.0
    for layer in layers:
        try:
            material = layer.get('material')
            thickness = float(layer.get('thickness'))
            lambda_value = float(layer.get('lambda'))
            if lambda_value <= 0:
                raise ValueError("Lambda doit etre un nombre positif different de zero")
            resistance_layer = thickness / lambda_value
            details.append({"material": material, "resistance": resistance_layer})
            resistance_total += resistance_layer
        except Exception:
            return Response({'error': 'Les valeurs de couche doivent etre valides'}, status = status.HTTP_400_BAD_REQUEST)
    r_total_rounded = round(resistance_total, 3)
    return Response({"r_total": r_total_rounded, "details": details})