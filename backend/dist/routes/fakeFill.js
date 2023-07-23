"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { addFakeProducts, addFakeUsers, addFakeOrders, } = require("../controller/FakeFillerController");
const fakeFill = express_1.default.Router();
fakeFill.post("/products", addFakeProducts);
fakeFill.post("/users", addFakeUsers);
fakeFill.post("/orders", addFakeOrders);
exports.default = fakeFill;
