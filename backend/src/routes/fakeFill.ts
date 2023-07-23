import express, { Router } from "express";
const {
  addFakeProducts,
  addFakeUsers,
  addFakeOrders,
} = require("../controller/FakeFillerController");

const fakeFill: Router = express.Router();

fakeFill.post("/products", addFakeProducts);
fakeFill.post("/users", addFakeUsers);
fakeFill.post("/orders", addFakeOrders);

export default fakeFill;
