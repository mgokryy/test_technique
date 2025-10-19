# Partie1  

L'objectif de cette partie était de développer une application Angular affichant une maison modélisée en 3D dans le navigateur à l’aide de Three.js, en partant de coordonnées en plan et de contraintes architecturales définies  

## Prérequis  

Avant de lancer le projet, l’utilisateur doit avoir :
nodejs
Installer Angular CLI si besoin

```bash
npm install -g @angular/cli
```

## Installation

1.Cloner le repo git

```bash
git clone https://github.com/mgokryy/test_technique.git
cd test_technique/partie1
npm install
```

2.Installer les dépendances
Pour installer Three.js et toutes les autres dépendances nécessaires

```bash
npm install
```

3.Lancer le serveur

```bash
ng serve
```

## Structure de mon projet  

Mon projet est divisé en plusieurs parties:  
-le dossier services contenant tous les services au même endroit ( chacun des services permettant de créer un élément de la maison)  
-le dossier components qui me sert à gérer l’interface, la scène et les boutons  

## Utilisation

Une fois le serveur lancé avec `ng serve` :  
-Ouvrez le navigateur sur le lien fournit dans votre terminal  
-Utilisez les boutons pour afficher :  
  -Le sol  
  -Un niveau (Sol, murs fenetres et portes)  
  -Ou la maison complète  
