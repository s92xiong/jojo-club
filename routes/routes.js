var express = require('express');
var router = express.Router();
const index_controller = require("../controllers/indexController");
const auth_controller = require("../controllers/authController");

/// ------------------------------ HOMEPAGE ------------------------------ ///
router.get('/', index_controller.index);


/// ------------------------------ SIGNUP ROUTES ------------------------------ ///
router.get('/sign-up', auth_controller.signup_get);
router.post('/sign-up', auth_controller.signup_post);


/// ------------------------------ LOGIN ROUTES ------------------------------ ///
router.get("/log-in", auth_controller.login_get);
router.post("/log-in", auth_controller.login_post);


/// ------------------------------ LOGOUT ROUTES ------------------------------ ///
// router.get("/log-out", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });


/// ------------------------------ MESSAGE ROUTES ------------------------------ ///




module.exports = router;