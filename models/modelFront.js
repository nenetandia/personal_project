const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

class frontmMdelArticle {
    static userProdVeg (request, response) {
        let query = 'SELECT * FROM articles, category WHERE categorie = "Production végétale" and articles.idCategory = category.idCategory';
        Connection.query(query, (error, result) => {
            if (error) throw error;
            console.log(result);
            response.render('pages/Prodveg', {results: result})
        })
        // response.render('pages/Prodveg')
    }
    static userBiotec (request, response) {
        let sqlQuery = 'SELECT * FROM articles, category WHERE categorie = "Biotechnologie végétale" and articles.idCategory = category.idCategory';
        Connection.query(sqlQuery, (error, result) => {
            if(error) throw error;
            console.log(result);
            response.render('pages/biotech', {results: result})
        })
        // response.render('pages/biotech')
    }
    static userProteciontveg(request, response) {
        let sqlQuery = 'SELECT * FROM articles, category WHERE categorie = "Protection des végétaux" and articles.idCategory = category.idCategory';
        Connection.query(sqlQuery, (error, result) => {
            if (error) throw error;
            console.log(result);
            response.render('pages/protectionveg', {results: result})
        })
        // response.render('pages/protectionveg')
    }
    static userConnexion (request, response) {
        try {
            const { email, password } = request.body;
            if( !email || !password) {
                return response.status(400).render('pages/connexion', { message :'veuillez mettre votre email et votre mot de passe'});
            }
                Connection.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async(err, results) => {
                    console.log(results);
                    if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
                    response.status(401).render('pages/connexion', { alertMessage :'Email ou mot de passe incorects' } );
                    
                    } else {
                        const id = results[0].id;
        
                        const token = jwt.sign({ id }, process.env.JWT_SECRET, { 
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });
                       console.log('The token is: ' + token);
        
                       const cookieOptions = {
                           expires: new Date( 
                               Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 
                               ),
                           httpOnly: true
                       }
                       response.cookie('jwt', token, cookieOptions)
                       response.status(200).redirect("/");
                    }
                })
            } catch (err) {
               console.log(err);
            }
    }
    static userlogin(request, response) {
        console.log('this is', request.body);

        const { name, surname, Gender, Profession, email, password, passwordConfirm} = request.body;
        Connection.query('SELECT email FROM utilisateurs WHERE email = ?', [email], async(err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0 ) {
                return response.render('pages/inscription', { errmessage:'cet email a été utilisé' })
            } else if(password !== passwordConfirm) {
                return response.render('pages/inscription', { errmessage:'les mots de passe ne sont pas conforme' });
            }
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
    
            Connection.query('INSERT INTO utilisateurs SET ?', { prenom: name, nom: surname, email: email, genre: Gender, profession: Profession, date_inscription: new Date(), password: hashedPassword }, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return response.render('pages/inscription', { message:'utilisateur enrégistré' });
    
                    }
            })
        })
    }
     static userGetArticle(request, response) {
        let id = request.query.id;
        console.log('======= ID =========>', id)

        Connection.query('SELECT * FROM articles WHERE idArticles =?', [id], (error, result1) => {
            Connection.query('SELECT * FROM comments WHERE idArticles =?', [id], (error, result2) => {
            if(error) throw error;
            // console.log(result);
           response.render('pages/article', {articles: result1, comments: result2})
        }) 
    })
}
    static userMakeComment(request, response) {
        console.log('this is =========>', request.query.id) 
        let data = {
            nom	: request.body.name,
            edit_at: new Date(),
            email: request.body.email,
            commentaire: request.body.message,
            idArticles: request.query.id,
            idUtilisateur: 1  
        }
        console.log('kgal', data)
        if (data.nom && data.commentaire) {
            Connection.query('INSERT INTO comments SET ?', data, (error, result) => {
                if (error) throw error;
                response.render('pages/article', {message: 'Merci, votre commentaire a été bien ajouté', error: error})
            });
        } else {
            response.render('pages/article', {alertMessage : 'vous devez remplir tous les champs'})
        }
    }   
    
}
module.exports = frontmMdelArticle;


