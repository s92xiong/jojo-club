var express = require('express');
var router = express.Router();
const index_controller = require("../controllers/indexController");
const signup_controller = require("../controllers/signupController");

/// ------------------------------ HOMEPAGE ------------------------------ ///
router.get('/', index_controller.index);



/// ------------------------------ SIGNUP ROUTES ------------------------------ ///
router.get('/sign-up', signup_controller.signup_get);
// router.post('/sign-up', signup_controller.signup_post);



/// ------------------------------ LOGIN ROUTES ------------------------------ ///



/// ------------------------------ USER ROUTES ------------------------------ ///
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/// ------------------------------ MESSAGE ROUTES ------------------------------ ///




module.exports = router;