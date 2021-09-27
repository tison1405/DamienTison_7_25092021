const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql');
const myHost = process.env.LOCAL;
const myUser = process.env.USER;
const con = mysql.createConnection({host: myHost, user: myUser, database : "elevage"});
const usersRouter = require ('./routes/users');
global.con=con;
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use((req, res, next) => {
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connecté à la base de données MySQL!");
    });
    next();
  });

  app.use('/api', usersRouter);



 
const myMessage = process.env.MESSAGE;
app.use((req, res) => {
   res.json({ message: myMessage }); 
});
module.exports = app;
