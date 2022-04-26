//ESTE ARQUIVO, SERVE PARA CONFIGURAR O MODEL DA CATEGORIA, ONDE DAMOS AS DIRETRIZES QUE SERA APRESENTADAS. NESTE CASO, NOME, SLUG E DATA DE CRIACAO DA CATEGORIA.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome:{
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria);