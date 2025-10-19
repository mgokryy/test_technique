from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='lola',
            email='lola@example.com',
            password='lola'
        )

    def test_register_user(self):
        """Tester l'inscription d'un nouvel utilisateur"""
        response = self.client.post('/api/register/', {
            'username': 'bob',
            'email': 'bob@example.com',
            'password': 'bob'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['username'], 'bob')

    def test_login_user(self):
        """Tester la connexion avec un compte existant"""
        response = self.client.post('/api/login/', {
            'username': 'lola',
            'password': 'lola'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)

    def test_surface_endpoint(self):
        """Tester ton endpoint /surface"""
        response = self.client.post('/api/surface/', {
            'width': 5,
            'height': 4
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['surface'], 20)

    def test_resistance_endpoint_jwt(self):
        """Tester l'endpoint /resistance/ avec authentification JWT"""
   
        login_response = self.client.post('/api/login/', {
            'username': 'lola',
            'password': 'lola'
        })
        self.assertEqual(login_response.status_code, 200)

        
        token = login_response.data.get('access')
        self.assertIsNotNone(token, "Le token JWT n'a pas été récupéré")

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

        payload = {
            "layers": [
                {"material": "Béton", "thickness": 0.2, "lambda": 1.75},
                {"material": "Laine de verre", "thickness": 0.1, "lambda": 0.04}
            ]
        }

        response = self.client.post('/api/resistance/', payload, format='json')

        # 6. vérifications
        self.assertEqual(response.status_code, 200)
        self.assertIn('r_total', response.data)
        self.assertIn('details', response.data)
        self.assertGreater(response.data['r_total'], 0)
