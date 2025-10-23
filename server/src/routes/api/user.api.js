const express = require("express");
const _ = express.Router();
const authController = require("../../controller/auth.controller");
const { apiResponse } = require("../../utils/apiResponse");

_.route("/registration").post(authController.userRegister);
_.route("/user-login").post(authController.userLogin);
_.route("/user-logout").post(authController.userLogOut);
_.route("/check-auth").get(authController.authMiddleware);

module.exports = _;
