var express = require('express');
var router = express.Router();
const index_controller = require("../controllers/indexController");
const signup_controller = require("../controllers/authController");

/// ------------------------------ HOMEPAGE ------------------------------ ///
router.get('/', index_controller.index);



/// ------------------------------ SIGNUP ROUTES ------------------------------ ///
router.get('/sign-up', signup_controller.signup_get);
router.post('/sign-up', signup_controller.signup_post);



/// ------------------------------ LOGIN ROUTES ------------------------------ ///



/// ------------------------------ MESSAGE ROUTES ------------------------------ ///




module.exports = router;