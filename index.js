//Iniciar a aula 50
//instalação necessária
//nodemon, express, ejs(renderizar html), bodyparser(pegar os dados do html), 
//sequelize + mysql2 (conexão banco de dados)
const connection = require('./database/database');
const Pergunta = require('./database/perguntas');
const Resposta = require('./database/Resposta');
//database
connection.
authenticate()
.then(()=> {
    console.log('conexão feita com  o bando de dados');
})
.catch((msgErro)=>{
    console.log(msgErro);
});

const express = require("express");
const res = require("express/lib/response");
const app = express();
const bodyParser = require("body-parser");

//estou dizendo para p express usar o EJS como view engine, express usa a pasta views
app.set('view engine','ejs');
//pra apontar a pasta que vai ser guardmados os arquivos staticos, CSS, Jvascript, img, dados e etc
app.use(express.static('public'));
//body parser para pegar os dados do html
app.use(bodyParser.urlencoded({extended: false}))
//body-parser usado com api
app.use(bodyParser.json());

//rotas
app.get("/",(req, res) => {
   Pergunta.findAll({raw: true, order:[
       ['id','DESC']
   ]}).then(perguntas => {
       res.render('index',{
           perguntas: perguntas
       })
   })
});
      
app.get("/perguntar",(req, res) => {
    res.render("perguntar");
});
app.post('/salvarpergunta',(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id},
    }).then(pergunta =>{
        if (pergunta != undefined){

            Resposta.findAll({
                where:{idPergunta: id},
               order:[
                   ['id','DESC']
                ]  
                }).then(respostas =>{
                    res.render("pergunta",{
                        pergunta: pergunta,
                        respostas: respostas
                    });
                })

           
        }else{
            res.redirect("/");
        }
    })
});

app.post('/responder',(req, res)=>{
    var corpo = req.body.corpo;
    var idPergunta = req.body.idPergunta;
   
    Resposta.create({
        corpo: corpo,
        idPergunta: idPergunta
    }).then(()=>{
      
        res.redirect('pergunta/'+idPergunta);
    });
});
app.listen(3000,()=>{console.log('App rodando')});