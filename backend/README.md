Backend
vous devez installer
nodeJS
angular CLI
npm
Compiles and hot-reloads for dev:
````
nodemon server
``````
creer un fichier .env
avec
``````
MESSAGE = strings
LOCAL = strings
USER = strings
cryptoKey = strings 32bits
cryptoIv = strings 16bits
tokenkey = strings`
```````
installer les dependencies
avec :
```````
npm install ....
``````
: {
    "bcrypt": "^5.0.1",
    "crypto": "^1.0.1",
    "crypto-js": "^4.1.1",
    "cryptojs": "^2.5.3",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "form-data": "^4.0.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.3",
    "mysql": "^2.18.1"
  }