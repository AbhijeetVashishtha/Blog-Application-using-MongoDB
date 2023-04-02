const express = require('express');
const userController = require('../controller/user-controller');

const router = express.Router();

router.get("/", userController.getAllUser);

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

module.exports = router;