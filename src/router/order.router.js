const express = require('express');
const router = express.Router();

const OrderController = require('../app/controllers/OrderController');

//update status of item in table order by orderID
router.put("/update-status/:orderId",OrderController.updateStatusOrder);

// order detail
router.get("/detail/:id",OrderController.detail);

// order detail success
router.get("/order-success/:id",OrderController.success);

//get list order
router.get("/",OrderController.index);




module.exports = router;