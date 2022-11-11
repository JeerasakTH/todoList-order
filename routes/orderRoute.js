const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.route("/report").get(orderController.orderReport);

router
  .route("/")
  .get(orderController.getAllOrder)
  .post(orderController.createOrder);

router
  .route("/:id")
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
