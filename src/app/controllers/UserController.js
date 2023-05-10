const { multipleToObject } = require("../../utils");
const UserModel = require("../models/Client");

class UserController {
  index(req, res) {
    UserModel.find().then((element) =>
      res.render("list_User", { element: multipleToObject(element) })
    );
  }
}
module.exports = new UserController();
