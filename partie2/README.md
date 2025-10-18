# Partie 2  

L’objectif de cette partie est de développer une API REST sécurisée permettant de réaliser:  
-Le calcul de **surface** (endpoint public)  
-Le calcul de **résistance thermique** (endpoint protégé par authentification JWT)

## Prérequis

Avant de lancer le projet, l’utilisateur doit avoir :  
-Python 3.8+ installé  
-pip installé  
- **Virtualenv** (optionnel mais recommandé)

## Installation et lancement

1.Cloner le dépôt  

```bash
git clone https://github.com/mgokryy/test_technique.git
cd test_technique/partie2
```

2.Creer un environnement virtuel   

```bash
python -m venv env
env\Scripts\activate     # sous Windows
# ou
source env/bin/activate  # sous macOS / Linux
```

3.Installer les dépendances  

```bash
pip install -r requirements.txt
```

4.Faire les migrations et lancer le serveur

```bash
python manage.py migrate
python manage.py runserver
```

Assurer vous d'avoir bien activé votre environnement

## Endpoints  

1.POST /api/surface/ (public donc pas besoin d'auth)  
Cette route sert à calculer la surface  
Exemple de requete  

 ```bash
 {
  "width": 5,
  "height": 3
}
```

2.POST /api/register/  
Cette route sert à creer un nouvel utilisateur  
Exemple de requette

```bash
{
  "username": "test",
  "email": "test@gmail.com",
  "password": "test"
}
```

3.POST /api/login/
Cette route sert à se connecter et à obtenir un token JWT pour la route suivante  

Exemple de requette

```bash
{
  "username": "test",
  "password": "test"
}
```

4.POST /api/resistance/ (JWT requis)
Cette route sert à calculer la résistance thermique totale et par couche
Dans le Header ajouter comme clé: Authorization et comme valeur: Bearer token obtenu lors de la route précédente
Exemple de requette

```bash
{
  "layers": [
    { "material": "polystyrene", "thickness": 0.1, "lambda": 0.035 },
    { "material": "brique", "thickness": 0.2, "lambda": 0.8 }
  ]
}
```

## Auteur  

Marie-Grace OKRY