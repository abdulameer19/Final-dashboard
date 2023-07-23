const {
  DATA_SERVER_DOWN,
  DATA_FILLED,
  DATA_ADD_WRONG,
} = require("../util/constant");
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";
import { Request, Response } from "express";

const {
  generateFakeProducts,
  generateFakeUsers,
  getAllProductAndUserIDs,
  generateFakeOrders,
} = require("../util/helper");

interface ProductData {
  name: string;
  price: number;
}
interface UserData {
  username: string;
  email: string;
}

interface OrderData {
  orderId: string;
  userId: string;
  productId: string;
}
export const addFakeProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Assuming generateFakeProducts is an async function that returns an array of product data
    const productData: ProductData[] = await generateFakeProducts(10);
    const dataAdded = await Product.insertMany(productData);

    if (!dataAdded) {
      res.status(400).json({ message: "DATA_ADD_WRONG" });
    } else {
      res.status(200).json({ message: "DATA_FILLED" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DATA_SERVER_DOWN" });
  }
};

export const addFakeUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Assuming generateFakeUsers is an async function that returns an array of user data
    const userData: UserData[] = await generateFakeUsers(10);
    const dataAdded = await User.insertMany(userData);

    if (!dataAdded) {
      res.status(400).json({ message: "DATA_ADD_WRONG" });
    } else {
      res.status(200).json({ message: "DATA_FILLED" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DATA_SERVER_DOWN" });
  }
};

export const addFakeOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productIdList, userIdList } = await getAllProductAndUserIDs();
    const orderData: OrderData[] = await generateFakeOrders(
      10,
      userIdList,
      productIdList
    );
    const dataAdded = await Order.insertMany(orderData);

    if (!dataAdded) {
      res.status(400).json({ message: "DATA_ADD_WRONG" });
    } else {
      res.status(200).json({ message: "DATA_FILLED" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DATA_SERVER_DOWN" });
  }
};
