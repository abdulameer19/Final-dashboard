import { Document, Schema, model, Types } from "mongoose";

export interface IOrder extends Document {
  productID: Types.ObjectId;
  userID: Types.ObjectId;
  quantity: number;
  purchaseDate: Date;
}

const OrderSchema = new Schema<IOrder>({
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
});

export const Order = model<IOrder>("Order", OrderSchema);
