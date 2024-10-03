const express = require("express");
const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const router = express.Router();

const allRoutes = (app) => {
  app.use("/api/v1/marketplace", router);
  router.use("/users", usersRoutes);
  router.use("/auth", authRoutes);
  router.use("/products", productsRoutes);

};

module.exports = { allRoutes };
