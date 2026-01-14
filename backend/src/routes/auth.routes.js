const express = require("express");
const { signup, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);   // Normal users
router.post("/login", login);     // All users

module.exports = router;
