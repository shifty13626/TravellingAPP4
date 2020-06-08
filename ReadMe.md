### Travelling project ####


# But du projet
Le but de se projet est de créer un système de travalling de cinéma permettant de suporter une charge de 2 kg minimum

# Organisation des fichiers
## Code de l'application de controle sur la Raspberry
Ensemble des fichiers de configuration à la racine de l'archive
- Ensemble des dossiers suivants :
    - node-modules
    - serverTools
    - site
    - testCam

Fichiers de configuration du réseau Wifi de la Raspberry -- Dossier : filesConfWifiRaspberry

Un fichier de conception de l'application web avait été déssiner dans le fichier "mokups site.pptx".

## Fichier de conception du chariot de Travelling 
Fichier de conception SolidWorks final -- Dossier Conception\Chariot\Toutes pièces pour solidworks    fichier : assemblage_FINAL.SLDASM

## Fichier de conception de la carte electronique
Cette carte à pour mission de :
    - Distribuer l'énergie entre les cartes electroniques : Raspberry et MBed
    - Faire le pont du transfert de données entre les deux cartes électroniques
    - Alimenter les moteurs
    - Alimenter et joindre les données entre les capteurs de fin de courses et la MBed

Fichier Altiom à ouvrir dans le dossier : Conception\Carte electronique

# Fichiers de conception de la carte electronique pour les capteurs de fin de course
Cette carte devait relier et transmettre les données des capteurs de fin de course à la carte MBed pour faire arreter le charriot en fin de rail.
cette carte n'a pas pu être réaliser car la machine d'impression ne fonctionnait plus.
Les fichiers de conception de cette carte sont stockés dans le dossier : Conception\carte_capteurs_fin_course


## Utilisation de l'application Serveur Web de la Raspberry
# Installation
Installation des paquets NPM issus du fichier "packages.json"
Installez NodeJS

lancer l'exécution du fichier server.js avec la commande "node server.js".
