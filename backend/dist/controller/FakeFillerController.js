"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFakeOrders = exports.addFakeUsers = exports.addFakeProducts = void 0;
const { DATA_SERVER_DOWN, DATA_FILLED, DATA_ADD_WRONG, } = require("../util/constant");
const product_model_1 = require("../models/product.model");
const user_model_1 = require("../models/user.model");
const order_model_1 = require("../models/order.model");
const { generateFakeProducts, generateFakeUsers, getAllProductAndUserIDs, generateFakeOrders, } = require("../util/helper");
const addFakeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming generateFakeProducts is an async function that returns an array of product data
        const productData = yield generateFakeProducts(10);
        const dataAdded = yield product_model_1.Product.insertMany(productData);
        if (!dataAdded) {
            res.status(400).json({ message: "DATA_ADD_WRONG" });
        }
        else {
            res.status(200).json({ message: "DATA_FILLED" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "DATA_SERVER_DOWN" });
    }
});
exports.addFakeProducts = addFakeProducts;
const addFakeUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming generateFakeUsers is an async function that returns an array of user data
        const userData = yield generateFakeUsers(10);
        const dataAdded = yield user_model_1.User.insertMany(userData);
        if (!dataAdded) {
            res.status(400).json({ message: "DATA_ADD_WRONG" });
        }
        else {
            res.status(200).json({ message: "DATA_FILLED" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "DATA_SERVER_DOWN" });
    }
});
exports.addFakeUsers = addFakeUsers;
const addFakeOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productIdList, userIdList } = yield getAllProductAndUserIDs();
        const orderData = yield generateFakeOrders(10, userIdList, productIdList);
        const dataAdded = yield order_model_1.Order.insertMany(orderData);
        if (!dataAdded) {
            res.status(400).json({ message: "DATA_ADD_WRONG" });
        }
        else {
            res.status(200).json({ message: "DATA_FILLED" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "DATA_SERVER_DOWN" });
    }
});
exports.addFakeOrders = addFakeOrders;
