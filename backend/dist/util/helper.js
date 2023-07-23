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
const faker_1 = require("@faker-js/faker");
const constant_1 = require("./constant");
const product_model_1 = require("../models/product.model");
const user_model_1 = require("../models/user.model");
function getRandomElementFromArray(array) {
    if (array.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
exports.generateFakeProducts = (numberoFProduct) => {
    const productData = [];
    for (let i = 0; i < numberoFProduct; i++) {
        productData.push({
            productName: faker_1.faker.commerce.productName(),
            productImage: faker_1.faker.image.url(),
            productDescription: faker_1.faker.lorem.sentences(),
            productCategory: getRandomElementFromArray(constant_1.productCategory),
            productQuantity: faker_1.faker.number.int({ min: 1, max: 100 }),
            productExpectedSale: faker_1.faker.number.int({ min: 3000, max: 15000 }),
            productPrice: faker_1.faker.number.int({ min: 1, max: 500 }),
            totalSoldQty: faker_1.faker.number.int({ min: 1, max: 50 }),
            cost: faker_1.faker.number.int({ min: 1, max: 500 }),
        });
    }
    return productData;
};
exports.generateFakeUsers = (numberofusers) => {
    const userData = [];
    for (let i = 0; i < numberofusers; i++) {
        userData.push({
            userName: faker_1.faker.internet.userName(),
            userEmail: faker_1.faker.internet.email(),
            userAge: faker_1.faker.number.int({ min: 12, max: 100 }),
            country: faker_1.faker.location.county(),
            countryCode: faker_1.faker.location.countryCode("alpha-3"),
            gender: faker_1.faker.person.gender(),
            occupation: faker_1.faker.person.jobArea(),
        });
    }
    return userData;
};
exports.getAllProductAndUserIDs = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find({}, "_id");
    const productIdList = yield products.map((document) => document._id.toString());
    const users = yield user_model_1.User.find({}, "_id");
    const userIdList = yield users.map((document) => document._id.toString());
    return { productIdList, userIdList };
});
exports.generateFakeOrders = (numberOfOrders, userIDs, productIDs) => {
    const orderData = [];
    for (let i = 0; i < numberOfOrders; i++) {
        orderData.push({
            productID: getRandomElementFromArray(productIDs),
            userID: getRandomElementFromArray(userIDs),
            quantity: faker_1.faker.number.int({ min: 1, max: 20 }),
            purchaseDate: faker_1.faker.date.recent({ days: 50 }),
        });
    }
    return orderData;
};
