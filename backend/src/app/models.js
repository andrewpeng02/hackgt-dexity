import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseId: String,
  accessToken: String,
  stripe: { type: Boolean, default: false },
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
  dayBefore: Number,
  monthBefore: Number,
});

const User = mongoose.model("User", userSchema);
const Stock = mongoose.model("Stock", userSchema);

export { User, Stock };
