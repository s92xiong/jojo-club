var express = require('express');
var router = express.Router();
const auth_controller = require("../controllers/authController");
const index_controller = require("../controllers/indexController");
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

/// ------------------------------ HOMEPAGE ------------------------------ ///
router.get("/", index_controller.index);
router.post("/", message_controller.delete_message_post);

/// ------------------------------ SIGNUP ------------------------------ ///
router.get('/sign-up', auth_controller.signup_get);
router.post('/sign-up', auth_controller.signup_post);


/// ------------------------------ LOGIN/LOGOUT ------------------------------ ///
router.get("/log-in", auth_controller.login_get);
router.post("/log-in", auth_controller.login_post);
router.get("/log-out", auth_controller.logout_get);


/// ------------------------------ BECOME A MEMBER ------------------------------ ///
router.get("/member", user_controller.member_get);
router.post("/member", user_controller.member_post);


/// ------------------------------ CREATE A MESSAGE ------------------------------ ///
router.get("/create-message", message_controller.create_message_get);
router.post("/create-message", message_controller.create_message_post);


/// ------------------------------ BECOME AN ADMIN ------------------------------ ///
router.get("/admin", user_controller.admin_get);
router.post("/admin", user_controller.admin_post);

module.exports = router;