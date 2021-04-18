
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
    const frontmMdelArticle = require('../models/modelFront');

exports.Homepage = (request, response) => {
    response.render('index');
}
exports.getProdVeg = (request, response) => {
    frontmMdelArticle.userProdVeg(request, response)
}
exports.getBiotec = (request, response) => {
    frontmMdelArticle.userBiotec(request, response)
}
exports.getProteciontveg = (request, response) => {
    frontmMdelArticle.userProteciontveg(request, response)
}
exports.aboutUs = (request, response) => {
    response.render('pages/AboutUs')
}
exports.contactUs = (request, response) => {
    response.render('pages/ContactUs')
}
exports.getWriteUs = (request, response) => {
    response.render('pages/writeUs')
}
exports.WriteUs = (request, response) => {

    console.log('this is', request.body)
}

exports.getConnexion = (request, response) => {
    response.render('pages/connexion')
}
exports.Connexion =  async (request, response) => {
    frontmMdelArticle.userConnexion(request, response)
}

exports.getInscription = (request, response) => {
    response.render('pages/inscription')
}
exports.inscription =  (request, response) => {
    frontmMdelArticle.userLogin(request, response)
    };


exports.getArticle = (request, response) => {
    frontmMdelArticle.userGetArticle(request, response)

}
exports.article = (request, response) => {
    frontmMdelArticle.userMakeComment(request, response)
}
