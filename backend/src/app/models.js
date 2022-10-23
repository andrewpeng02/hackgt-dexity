import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseId: String,
  accessToken: String,
  categoryWeights: [{ name: Number }],
  ownedStocks: [
    { tickerId: { type: Schema.Types.ObjectId, ref: "Stock" }, amount: Number },
  ],
});

const stockSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  category: String,
  price: Number,
  percentDayBefore: Number,
  percentMonthBefore: Number,
});

const User = mongoose.model("User", userSchema);
const Stock = mongoose.model("Stock", stockSchema);

export { User, Stock };
