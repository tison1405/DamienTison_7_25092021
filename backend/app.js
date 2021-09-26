const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql');
const myHost = process.env.LOCAL;
const myUser = process.env.USER;
const con = mysql.createConnection({
    host: myHost,
    user: myUser,

    database : "elevage"
  });

app.use((req, res) => {
   con.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    con.query("SELECT * FROM espece", function (err, result) {
        if (err) throw err;
        res.json({ message: result }); 
      });
  });
});
 
const myMessage = process.env.MESSAGE;
app.use((req, res) => {
   res.json({ message: myMessage }); 
});

module.exports = app;