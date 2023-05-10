const express = require("express");
const Router = express.Router();

const SiteController = require("../app/controllers/SiteController");

Router.get("/login",SiteController.login);
Router.get("/register",SiteController.register);


module.exports  = Router;