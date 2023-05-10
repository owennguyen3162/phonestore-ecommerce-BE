const ProductModal = require("../models/Product");
const PersonModal = require("../models/Client");
const CartModal = require("../models/cart");
const OrderModal = require("../models/Order");
const NotificationModal = require("../models/notification");

const { multipleToObject, mongooseToObject } = require("../../utils");
const bcrypt = require("bcrypt");

class ApiController {
  // PRODUCT

  async getAllProduct(req, res, next) {
    ProductModal.find()
      .then((data) => {
        const array = multipleToObject(data);
        const DataNew = array.map((firstItem) => {
          return {
            ...firstItem,
            URLImages: firstItem.image.map((item, index) => {
              return {
                URLImage: `http://192.168.0.108:3000/${item.image}`,
              };
            }),
          };
        });
        res.status(200).json({ data: DataNew });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //get data in table order by UserId
  async getAllOrder(req, res, next) {
    const userId = await req.params.userId;
    OrderModal.find({ userId: userId, status: { $ne: "success" } }) //select all where status: {$ne : 'success'}} it mean => not equals 'success'
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //get order history by UserId
  async orderHistory(req, res, next) {
    const userId = await req.params.userId;
    OrderModal.find({ userId: userId, status: "success" }) 
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //get data in table notification by UserId
  async getAllNotification(req, res, next) {
    const userId = await req.params.userId;
    NotificationModal.find({ userId: userId })
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  async getByCategory(req, res) {
    const category = await req.params.category;
    if (category) {
      ProductModal.find({ category: category })
        .then((data) => {
          const array = multipleToObject(data);
          const DataNew = array.map((item) => {
            return {
              ...item,
              URLImages: item.image.map((item) => {
                return {
                  URLImage: `http://192.168.0.108:3000/${item.image}`,
                };
              }),
            };
          });
          res.status(200).json({ data: DataNew });
        })
        .catch((error) => res.status(500).json({ msg: error }));
    }
  }

  //add to cart
  async addToCart(req, res) {
    const body = await req.body;
    if (body) {
      const Cart = new CartModal(body);
      Cart.save()
        .then(() => {
          return res.status(201).json({ msg: "add to cart done" });
        })
        .catch(() => res.status(500).json({ msg: "add to cart fail" }));
    }
  }

  //add to table order
  async addToOrder(req, res) {
    const body = await req.body;
    // console.log(body);
    if (body) {
      const Order = new OrderModal(body);
      Order.save()
        .then(() => {
          return res.status(201).json({ msg: "order done" });
        })
        .catch(() => res.status(500).json({ msg: "order fail" }));
    }
  }

  //get Cart by id User
  async getCartByIdUser(req, res, next) {
    const userId = await req.params.userId;
    CartModal.find({ userId: userId, deleteAt: "" })
      .then((element) => {
        res.status(200).json({ data: element });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  async getUser(req, res, next) {
    const userId = await req.params.userId;
    // console.log(userId);
    PersonModal.findById(userId)
      .then((element) => {
        if (element) {
          const data = element.toObject();
          data.URLImage = `http://192.168.0.108:3000/${data.image}`;

          // console.log(newData);
          return res.status(200).json({
            data: data,
          });
        }
        return res.status(404).json({ data: "not found" });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //delete product in cart by cartId
  async deleteProduct(req, res, next) {
    const cartId = await req.params.cartId;

    CartModal.deleteOne({ _id: cartId })
      .then((element) => {
        res.status(204).json({ msg: "delete successfully" });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  async deleteOrder(req, res, next) {
    const orderId = await req.params.orderId;

    OrderModal.deleteOne({ _id: orderId })
      .then((element) => {
        res.status(204).json({ msg: "delete successfully" });
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //sort-delete product in cart by cartId
  async sortDeleteProduct(req, res, next) {
    const cartId = await req.params.cartId;
    const deleteAt = await req.body.deleteAt;

    // console.log("OK "+deleteAt);
    CartModal.updateOne({ _id: cartId }, { deleteAt: deleteAt })
      .then((element) => {
        if (element) {
          res.status(200).json({ msg: "update successfully" });
        } else {
          res.status(404).json({ msg: "not found by idCart" });
        }
      })
      .catch((error) => res.status(500).json({ msg: error }));
  }

  // update profile
  async updateProfile(req, res) {
    const body = await req.body;
    const userId = await req.params.userId;
    if (req.file) {
      body.image = req.file.originalname;
    }

    console.log(userId);

    PersonModal.findByIdAndUpdate(userId, body)
      .then((item) => {
        if (item) {
          return res.status(200).json({ msg: "update successfully" });
        }
        return res.status(404).json({ msg: "not found" });
      })
      .catch((error) => res.status(500).json({ msg: "update fail " + error }));
  }

  //register
  async register(req, res) {
    const body = await req.body;
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const Person = new PersonModal(body);
    Person.save()
      .then(() => res.status(201).json({ msg: "register successfully" }))
      .catch((error) => res.status(500).json({ msg: "register fail" }));
  }

  //login
  async login(req, res) {
    const body = await req.body;
    PersonModal.findOne({ phone: body.phone })
      .then(async (element) => {
        const data = mongooseToObject(element);
        if (data) {
          const checkPass = await bcrypt.compare(body.password, data.password);
          if (checkPass) {
            const DataUser = {
              name: data.name,
              phone: data.phone,
              id: data._id,
              image: data.image,
            };
            res.status(200).json({ msg: "login successfully", data: DataUser });
          } else {
            res.status(401).json({ msg: "password error", data: DataUser });
          }
        } else {
          res.status(404).json({ msg: "phone not fond" });
        }
      })
      .catch((error) => res.status(500).json({ msg: "login fail" }));
  }
}

module.exports = new ApiController();
