const OrderModel = require("../models/Order");
const userModel = require("../models/Client");
const NotificationModel = require("../models/notification");
const { multipleToObject, mongooseToObject } = require("../../utils");

class OrderController {
  async updateStatusOrder(req, res, next) {
    const orderId = await req.params.orderId;
    const status = await req.body.status;
    // console.log(orderId);
    OrderModel.findByIdAndUpdate({ _id: orderId }, { status: status })
      .then(async (element) => {
        //save data in table notification when update status in table order => confirmed
        const data = new NotificationModel({
          userId: element.userId,
          content: `${element._id} order ${status}`,
        });
        try {
          await data.save();
          console.log("save done !");
        } catch (error) {
          console.log("save table notification error");
        }
        // return res.status(200).json({ msg: "update successfully" });
        return res.redirect("/order");
      })
      .catch((error) => res.status(500).json({ msg: "update fail !" + error }));
  }

  //get all order when status not equals success
  async index(req, res) {
    OrderModel.find({ status: { $ne: "success" } })
      .then((element) => {
        OrderModel.find({ status: { $eq: "success" } })
          .then((element2) => {
            res.render("list_order", {
              element: multipleToObject(element),
              element2: multipleToObject(element2),
            });
          })
          .catch((error) => res.json(error));
      })
      .catch((error) => res.json(error));
  }



  async detail(req, res) {
    const id = await req.params.id;
    OrderModel.findById(id)
      .then((element) => {
        const data = mongooseToObject(element);
        const totalPrice = data.item.reduce((total, item) => {
          return (total += item.intoMoney);
        }, 0);
        userModel.findById(data.userId).then((element) => {
          const dataUser = mongooseToObject(element);
          res.render("list_orderDetail", {
            element: {
              ...data,
              userName: dataUser.name,
              phone: dataUser.phone,
              totalPrice: totalPrice + data.shipping,
            },
          });
        });
      })
      .catch((error) => res.json(error));
  }
async success(req, res) {
  const id = await req.params.id;
  OrderModel.findById(id)
    .then((element) => {
      const data = mongooseToObject(element);
      const totalPrice = data.item.reduce((total, item) => {
        return (total += item.intoMoney);
      }, 0);
      userModel.findById(data.userId).then((element) => {
        const dataUser = mongooseToObject(element);
        res.render("order_Detail_Success", {
          element: {
            ...data,
            userName: dataUser.name,
            phone: dataUser.phone,
            totalPrice: totalPrice + data.shipping,
          },
        });
      });
    })
    .catch((error) => res.json(error));
}
}


module.exports = new OrderController();
