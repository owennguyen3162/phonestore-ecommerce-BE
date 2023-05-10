const bcrypt = require("bcrypt");
const AdminModel = require("../models/Admin");
const ClientModel = require("../models/Client");

class AdminController {
  async registerAccount(req, res) {
    const body = await req.body;
    console.log(body);
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    const admin = new AdminModel(body);

    ClientModel.findOne({ phone: body.phone })
      .then((data) => {
        if (data) {
          return res.status(500).json({ msg: "create fail " + error });
        } else {
          return admin
            .save()
            .then(() => res.status(201).json({ msg: "created" }))
            .catch((error) =>
              res.status(500).json({ msg: "create fail " + error })
            );
        }
      })
      .catch((error) => res.status(500).json({ msg: "create fail " + error }));
  }

  async handleLogin(req, res) {
    const body = await req.body;
    AdminModel.findOne({ phone: body.phone }).then((data) => {
      if (data) {
        if (bcrypt.compareSync(body.password, data.password)) {
          return res.status(200).json({ msg: "login successfully" });
        } else {
          return res.status(500).json({ msg: "login fail" });
        }
      } else {
        return res.status(404).json({ msg: "phone not found" });
      }
    });
  }
}

module.exports = new AdminController();
