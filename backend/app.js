const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql');
const myHost = process.env.LOCAL;
const myUser = process.env.USER;
const con = mysql.createConnection({host: myHost, user: myUser, database : "groupomania"});
const usersRouter = require ('./routes/users');
const postRouter = require ('./routes/forummulti');
global.con=con;//methode pour ultiliser la const con en global//
const path = require('path');

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());//remplace body parser//

  
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  app.use('/api', usersRouter);
  app.use('/api', postRouter);



 

module.exports = app;
