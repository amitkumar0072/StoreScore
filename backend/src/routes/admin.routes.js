const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.use(authenticate, authorize("ADMIN"));

router.post("/users", adminController.createUser);
router.post("/stores", adminController.createStore);
router.get("/dashboard", adminController.getDashboardStats);
router.get("/users", adminController.getUsers);
router.get("/stores", adminController.getStores);

module.exports = router;
