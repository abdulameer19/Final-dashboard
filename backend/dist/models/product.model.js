"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productExpectedSale: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    totalSoldQty: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
    },
});
// Define the Product model using the Model interface
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
