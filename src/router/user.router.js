const express = require("express");
const Router = express.Router();

const UserController = require("../app/controllers/UserController");

Router.get("/",UserController.index);


module.exports  = Router;