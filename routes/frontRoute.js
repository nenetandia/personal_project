const express = require('express')

const bodyParser = require('body-parser')
const router = express.Router()

const frontController = require('../controllers/frontController');



router.get('/', frontController.Homepage)

router.get('/productionveg', frontController.getProdVeg)

router.get('/Biotechnologie', frontController.getBiotec)

router.get('/Protection-des-veg', frontController.getProteciontveg)

router.get('/aboutUs', frontController.aboutUs)

router.get('/contactUs', frontController.contactUs)

router.get('/Compte', frontController.getConnexion)
router.post('/Compte', frontController.Connexion)

router.get('/inscription',  frontController.getInscription)
router.post('/inscription', frontController.inscription)

router.get('/writeUs', frontController.getWriteUs)
router.post('/WriteUs', frontController.WriteUs)

router.get('/article', frontController.getArticle)
router.post('/article', frontController.article)

module.exports = router;