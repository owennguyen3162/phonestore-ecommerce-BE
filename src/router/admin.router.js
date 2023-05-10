
const express = require("express");
const Router = express.Router();

const AdminController = require("../app/controllers/AdminController");

Router.post("/register-account/store",AdminController.registerAccount);
Router.post("/login-account",AdminController.handleLogin);


module.exports  = Router; 