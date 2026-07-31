const express = require("express");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const orderController = require("../controllers/order_controller");

const router = express.Router();

router.post("/checkout", protect, orderController.checkout);
router.get("/my-orders", protect, orderController.getMyOrders);
router.get("/", protect, authorize("admin"), orderController.getAllOrders);
router.get("/:id", protect, orderController.getOrderById);

module.exports = router;
