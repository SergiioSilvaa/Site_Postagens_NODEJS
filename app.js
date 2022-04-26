//IMPORTANDO TODOS AS MODULOS A SEREM USADOS
const express = require("express"); //Ao importar o Framemwork, uma function do express, e criada.
const app = express(); //Cria-se uma variavel constante, para receber a function.
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const { redirect } = require("express/lib/response");
//const { Post } = require("./models/Post");
const Handlebars = require('handlebars'); //Trabalha em conjunto com a CONST {allowInsecurePrototypeAccess}.
const  { allowInsecurePrototypeAccess }  =  require('@handlebars/allow-prototype-access');
//const  insecureHandlebars  =  allowInsecurePrototypeAccess ( Handlebars );
const mongoose = require("mongoose");
const admin = require("./routes/admin"); //Importando o arquivo "admin" da pasta ROUTES.
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

//CONFIGURACOES
//Sessoes
    app.use(session({
        secret: "cursodenodejs",
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

//Middleware
    app.use((req,res,next) =>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msh = req.flash("error_msg");
        next();
    })

//Body Parser
    //app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
//Handlebars
    app.engine('handlebars', engine({defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess (Handlebars)}));
	app.set('view engine', 'handlebars');

//Mongoose - Conexao com o banco de dados
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1:27017/primeiroappjs").then(() =>{
        console.log("Banco de dados conectado com sucesso!");
    }).catch((error) =>{
        console.log("Erro ao conectar banco de dados: "+error);
    });

//Public
    app.use(express.static(path.join(__dirname,"public"))); //Informa que todos os arquivos estaticos estao na pasta Public.

//Rotas
    app.get("/", (req,res) => {
        res.send("Home Page");
    })
    app.use("/admin",admin);

//Outros - Configuracao da porta do Servidor, onde estara rodando a aplicacao.
const PORT = 8082
app.listen(PORT, () => {
    console.log("Servidor online...");
});

