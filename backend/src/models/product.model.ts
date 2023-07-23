import { Document, Schema, model, Model } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  productImage: string;
  productDescription: string;
  productCategory: string;
  productQuantity: number;
  productExpectedSale: number;
  productPrice: number;
  totalSoldQty: number;
  cost: number; // Add the 'cost' property to the interface
}

const ProductSchema = new Schema<IProduct>({
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
export const Product: Model<IProduct> = model<IProduct>(
  "Product",
  ProductSchema
);
