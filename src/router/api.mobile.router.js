const express = require('express');
const router = express.Router();

const ApiController = require('../app/controllers/ApiController');
const upload = require("../app/middlewares/uploadImage/upload");


//Get smart phone by category in DB
router.get('/products/:category',ApiController.getByCategory);

//Get all Product in DB
router.get('/products',ApiController.getAllProduct);


//Add to cart
router.post('/product/addToCart',ApiController.addToCart);

//Add to order
router.post('/products/order',ApiController.addToOrder);


//get cart by id
router.get('/product/getCart/:userId',ApiController.getCartByIdUser);

//delete product in cart by id
router.delete('/product/deleteProduct/:cartId',ApiController.deleteProduct);

//delete order by id
router.delete('/product/delete-order/:orderId',ApiController.deleteOrder);

//get all data in table notification by UserId 
router.get('/notification/get-notifications/:userId',ApiController.getAllNotification);

//sort-delete product in cart by id
router.put('/product/sort-delete/:cartId',ApiController.sortDeleteProduct);

//get all data in order by UserId 
router.get('/product/getOrders/:userId',ApiController.getAllOrder);

// update profile
router.put('/person/update-profile/:userId',upload.upload.single("image"),ApiController.updateProfile);

// get user by userId
router.get('/person/get-information/:userId',ApiController.getUser);

//get order history by UserId
router.get("/order-history/:userId",ApiController.orderHistory);

// register person
router.post('/person/register',ApiController.register);

//login person
router.post('/person/login',ApiController.login);


module.exports = router;