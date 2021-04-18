
const Connection = require('../config/dbConnect')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express()
const path = require('path');
app.use(cookieParser());

app.use(bodyParser.urlencoded ({extended : false}));
app.use(bodyParser.json());

dotenv.config({ path:'././.env' });

const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, 'public/img/');
    },
    filename: function (req, file, callback) {
    callback(null, file.originalname);
    }
    })
    var upload = multer({ storage: storage });

class adminModelArticles {
    static adminAddArticle(request, response) {
        console.log('Console Articles ---------- ', request.body, request.file)
        let data = {
            photos: request.file.originalname,
            Titre: request.body.title,
            auteur: request.body.author,
            content: request.body.text,
            idCategory: request.body.category,
            post_at: new Date()
        }
        // console.log('kgal', data)
        if (data.Titre && data.content) {
            Connection.query('INSERT INTO articles SET ?', data, (error, result) => {
                if (error) throw error;
                response.render('pages/admin/addArticle', {message: 'votre article a bien été ajouté', error: error})
            });
        } else {
            response.render('pages/admin/addArticle', {errMessage : 'vous devez remplir tous les champs'})
        }
    }
    static adminAllArticle (request, response) {
        Connection.query('SELECT * FROM articles', (err, result) => {
            if (err) throw err;
            // console.log(result);
            response.render('pages/admin/mesArticles', {results: result})
        })
        // response.render('pages/Prodveg')
    }
    static adminShowEditArticle(request, response) {
        let id = request.query.id; 
        Connection.query('SELECT * FROM articles WHERE idArticles = ?', [id], (err, result) => {
            if (err) throw err;
            // console.log('================>', result)
            response.render('pages/admin/editArticle', {articles: result})
        })    
    }
    static adminEditArticle(request, response) {
        console.log('kjkll', request.body, request.file);
    let data = {
        photos: request.file.originalname,
        Titre: request.body.title,
        auteur: request.body.author,
        content: request.body.text,
        idCategory: request.body.category,
        post_at: new Date()
    }

    let param = [
        data,
        request.query.id    
    ];
    
        Connection.query('UPDATE articles SET ? WHERE idArticles = ?', param, (err, result) => {
            if (err) throw err;
            response.render('pages/admin/editArticle', {updateMessage: 'votre article a bien été modifié'})
        });
    }
   static adminDeleteArticle(request, response) {
    let id = request.query.id; 
    Connection.query('DELETE FROM articles WHERE idArticles = ?', [id], (err, result) => {
        response.redirect('/admin/all_Articles');
    })
   } 
}
module.exports = adminModelArticles;