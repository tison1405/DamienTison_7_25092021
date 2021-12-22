# DamienTison_7_25092021
# Reseaumania
# Prerequis pour installer l'app:
 ## Node.js
 
 https://nodejs.org/en/download/
 
 ## npm
 ```
 npm install -g npm
 ```
 ## Yarn
 ```
 npm install --global yarn
 ```
 ## mySql
 
 https://dev.mysql.com/downloads/mysql/#downloads
 
 ### Importer la BDD dans mySql
 
 https://github.com/tison1405/DamienTison_7_25092021/blob/main/Bd%20MySql/groupomania%20(6).sql
 
 ### Parametrer le mediateur une foi l'application installée et le compte du mediateur créé
 Definir le mediateur dans la table users en passant la colonne mediator à 1 sur la ligne du user concerneé.
 ```
 UPDATE users SET moderator = 1 WHERE id = 
 ```
 Noter le numero de l'id de l'user concerné dans le fichier .env
 
 Relancer le serveur backend
 
 ## Variable d'environement
 ### Completer le fichier 
 .env.sample
 ### Le renommer 
 .env
 
 # Lancement du serveur frontend
 ## Dossier frontend
 ```
 cd frontend
 ```
 
 ## Installer les dépendances
 ```
 yarn install
 ````
 ## Lancer le serveur
 ```
 yarn serve
 ```
 # Lancement du serveur backend
 ## Dossier backend
 ```
 cd backend
 ```
 ## Installer angular
 ```
 npm install @angular/cli
 ```
 ## Installer les dépendances
 ```
 npm install
 ```
 ## Lancer le serveur
 ```
 node server
 ```
 
 
 
 
 
 
 
