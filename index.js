//Iniciar a aula 24

//instalação necessária
//nodemon, express, ejs(renderizar html)
const express = require("express");
const app = express();

//estou dizendo para p express usar o EJS como view engine, express usa a pasta views
app.set('view engine','ejs');

app.get("/", (req, res)=>{
    res.render('index');
});

app.listen(3000,()=>{console.log('App rodando')});