const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
