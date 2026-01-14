const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.use(authenticate, authorize("USER"));

router.get("/stores", userController.getStores);
router.post("/ratings", userController.submitRating);
router.put("/ratings", userController.updateRating);

module.exports = router;
