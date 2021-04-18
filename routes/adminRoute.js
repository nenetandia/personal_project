const express = require('express')
const router = express.Router()
const multer  = require('multer')
const adminController = require('../controllers/adminController');

// ------- for photos ------------
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, 'public/img/');
    },
    filename: function (req, file, callback) {
    callback(null, file.originalname);
    }
    })
    var upload = multer({ storage: storage });
// ------- for photos ------------


router.get('/admin',adminController.adminHomepage)

router.get('/admin/add_article', adminController.getaddArticle)
router.post('/admin/add_article', upload.single('photos'), adminController.addArticle)

router.get('/admin/all_Articles', adminController.allArticles)

router.get('/admin/edit_article', adminController.showEditArticles)
router.post('/admin/edit_article', upload.single('photos'), adminController.editArticle )

router.get('/admin/delete_article', adminController.deleteArticle)

module.exports = router;