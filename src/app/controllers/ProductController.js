const { mongooseToObject, multipleToObject } = require("../../utils");
const ProductModel = require("../models/Product");

class ProductController {
  listProducts(req, res) {
    ProductModel.find().then((element) => {
      res.render("list_Product", { element: multipleToObject(element) });
      // res.json(element)
    });
  }

  //go to detail
  async productDetail(req, res) {
    const id = await req.params.id;
    ProductModel.findById(id).then((element) => {
      res.render("product_Detail", { element: mongooseToObject(element) });
      // res.json(element)
    });
  }

  async addProduct(req, res) {
    res.render("add_Product");
  }

  async deleteProduct(req, res) {
    const id = await req.params.id;
    ProductModel.deleteOne({ _id: id })
      .then(() => res.redirect("back"))
      .catch((error) => res.json({ msg: "delete error " + error }));
  }

  async addProductStore(req, res) {
    const body = await req.body;
    if (req.files.length < 3) {
      return res.json("vui lòng chọn 3 bức ảnh !!");
    }
    let filesArray = [];
    await req.files.forEach((element) => {
      const file = {
        image: element.originalname,
      };
      filesArray.push(file);
    });
    body.image = filesArray;
    const Product = new ProductModel(body);
    Product.save()
      .then(() => res.redirect("back"))
      .catch((error) => res.json({ msg: "create failed !!!", error: error }));
  }

  async updateProduct(req, res) {
    const id = await req.params.id;
    const body = await req.body;
    
    if (req.files.length !== 0) {
     if(req.files.length < 3){
      res.json("Vui long chon 3 buc anh !!");
     }else{
      let filesArray = [];
      await req.files.forEach((element) => {
        const file = {
          image: element.originalname,
        };
        filesArray.push(file);
      });
      body.image = filesArray;
     }
    }
    ProductModel.updateOne({ _id: id }, body)
      .then(() => res.redirect("back"))
      .catch((error) => res.json({ msg: "update failed !!!", error: error }));
  }
}

module.exports = new ProductController();
