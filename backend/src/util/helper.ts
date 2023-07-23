import { faker } from "@faker-js/faker";
import { productCategory } from "./constant";
import mongoose from "mongoose";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";
interface IProduct {
  productName: string;
  productImage: string;
  productDescription: string;
  productCategory: string;
  productQuantity: number;
  productExpectedSale: number;
  productPrice: number;
  totalSoldQty: number;
  cost: number;
}

interface IUser {
  userName: string;
  userEmail: string;
  userAge: number;
  country: string;
  countryCode: string;
  gender: string;
  occupation: string;
}

interface IOrder {
  productID: string;
  userID: string;
  quantity: number;
  purchaseDate: Date;
}

function getRandomElementFromArray(array: any) {
  if (array.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
exports.generateFakeProducts = (numberoFProduct: number): IProduct[] => {
  const productData: IProduct[] = [];
  for (let i = 0; i < numberoFProduct; i++) {
    productData.push({
      productName: faker.commerce.productName(),
      productImage: faker.image.url(),
      productDescription: faker.lorem.sentences(),
      productCategory: getRandomElementFromArray(productCategory),
      productQuantity: faker.number.int({ min: 1, max: 100 }),
      productExpectedSale: faker.number.int({ min: 3000, max: 15000 }),
      productPrice: faker.number.int({ min: 1, max: 500 }),
      totalSoldQty: faker.number.int({ min: 1, max: 50 }),
      cost: faker.number.int({ min: 1, max: 500 }),
    });
  }

  return productData;
};

exports.generateFakeUsers = (numberofusers: number): IUser[] => {
  const userData: IUser[] = [];
  for (let i = 0; i < numberofusers; i++) {
    userData.push({
      userName: faker.internet.userName(),
      userEmail: faker.internet.email(),
      userAge: faker.number.int({ min: 12, max: 100 }),
      country: faker.location.county(),
      countryCode: faker.location.countryCode("alpha-3"),
      gender: faker.person.gender(),
      occupation: faker.person.jobArea(),
    });
  }
  return userData;
};

exports.getAllProductAndUserIDs = async () => {
  const products = await Product.find({}, "_id");
  const productIdList: string[] = await products.map((document: any) =>
    document._id.toString()
  );

  const users = await User.find({}, "_id");
  const userIdList: string[] = await users.map((document: any) =>
    document._id.toString()
  );

  return { productIdList, userIdList };
};

exports.generateFakeOrders = (
  numberOfOrders: any,
  userIDs: string[],
  productIDs: string[]
): IOrder[] => {
  const orderData: IOrder[] = [];
  for (let i = 0; i < numberOfOrders; i++) {
    orderData.push({
      productID: getRandomElementFromArray(productIDs),
      userID: getRandomElementFromArray(userIDs),
      quantity: faker.number.int({ min: 1, max: 20 }),
      purchaseDate: faker.date.recent({ days: 50 }),
    });
  }
  return orderData;
};
