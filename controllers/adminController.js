
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

const adminModelArticles = require('../models/modelAdmin')

exports.adminHomepage = (request, response) => {
    response.render('pages/admin/index')
}
exports.getaddArticle = (request, response) => {
    response.render('pages/admin/addArticle')
}
exports.addArticle = (request, response) => {
    adminModelArticles.adminAddArticle(request, response)
}

exports.allArticles = (request, response) => {
    adminModelArticles.adminAllArticle(request, response)
}

exports.showEditArticles = (request, response) => {
    adminModelArticles.adminShowEditArticle(request, response)
}

exports.editArticle =  (request, response) => {
    adminModelArticles.adminEditArticle(request, response)
    }

exports.deleteArticle = (request, response) => {
    adminModelArticles.adminDeleteArticle(request, response)
}

