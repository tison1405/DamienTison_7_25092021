# DamienTison_7_25092021
# Reseaumania
# prerequis pour installer l'app:
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
 
 https://github.com/tison1405/DamienTison_7_25092021/blob/main/Bd%20MySql/groupomania%20(5).sql
 
 ### Parametrer le mediateur une foi l'application installée et le compte du mediateur créé
 Definir le mediateur dans la table users en passant la colonne mediator à 1 sur la ligne du user concerneé.
 ```
 UPDATE users SET moderator = 1 WHERE id = 
 ```
 noter le numero de l'id de l'user concerné dans le fichier .env
 
 ## Variable d'environement
 ### Completer le fichier 
 .env.sample
 ### Le renommer 
 .env
 
 # lancement du serveur frontend
 ## dossier frontend
 ```
 cd frontend
 ```
 
 ## installer les dépendances
 ```
 yarn install
 ````
 ## lancer le serveur
 ```
 yarn serve
 ```
 # lancement du serveur backend
 ## dossier backend
 ```
 cd backend
 ```
 ## installer angular
 ```
 npm install @angular/cli
 ```
 ## installer les dépendances
 ```
 npm install
 ```
 ## lancer le serveur
 ```
 node server
 ```
 
 
 
 
 
 
 
