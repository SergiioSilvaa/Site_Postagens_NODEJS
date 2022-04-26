const express = require("express");
const router = express.Router(); //Linha usada para exportar este arquivo para outros, funcionando em conjunto com esta linha "module.exports = router".
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");


//ROTAS
router.get("/",(req,res) => {
    res.render("admin/index");
});

router.get("/posts",(req,res) =>{
    res.send("Post page");
})

router.get("/categorias",(req,res) =>{
    Categoria.find().sort({date: "desc"}).then((categorias) => {
        res.render("admin/categorias", {categorias: categorias});
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias." +error);
        res.redirect("/admin");
    })
    
})

router.get("/categorias/add", (req,res) => {
    res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req,res) =>{

    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
        erros.push({texto: "Nome invalido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug invalido"});
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros});
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() =>{
            req.flash("success_msg", "Categoria criada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((error) =>{
            req.flash("error_msg", "Erro ao salvar nova categoria. Tente novamente!");
            console.log("Erro ao salvar nova categoria: "+error);
        })
    }
})

    router.get("/categorias/edit/:id", (req,res) => {
        Categoria.findOne({_id:req.params.id}).then((categoria) =>{
            res.render("admin/editcategorias", {categoria: categoria});
        }).catch((error) =>{
            res.redirect("/admin/categorias");
            req.flash("error_msg", "Esta categoria nao existe.");
        })
    })

    router.post("/categorias/edit", (req,res) => {
        Categoria.findOne({_id: req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;
            categoria.save().then(() => {
                req.flash("success_msg", "Edicao de categoria, salva com sucesso.");
                res.redirect("/admin/categorias");
            }).catch((error) =>{
                req.flash("error_msg", "Erro ao salvar edicao de categoria.");
            })

        }).catch((error) => {
            req.flash("error_msg", "Erro ao editar categoria");
            res.redirect("/admin/categorias");
        })
    })

    router.post("/categorias/delet", (req,res) => {
        Categoria.remove({_id: req.body.id}).then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso");
            res.redirect("/admin/categorias");
        }).catch((error) =>{
            req.flash("error_msg", "Erro ao deletar categoria.");
            res.redirect("/admin/categorias");
        })
    })


module.exports = router; //Linha usada para exportar este arquivo para outros. Usada sempre no final do codigo (Ultima linha).