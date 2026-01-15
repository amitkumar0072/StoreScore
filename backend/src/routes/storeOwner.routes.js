const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const storeOwnerController = require("../controllers/storeOwner.controller");

const router = express.Router();

router.use(authenticate, authorize("STORE_OWNER"));

router.get("/dashboard", storeOwnerController.getDashboard);
router.put("/password", storeOwnerController.updatePassword);

module.exports = router;
