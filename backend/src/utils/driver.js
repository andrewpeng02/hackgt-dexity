import { User } from "../app/models.js";
import { getTransactionData } from "./plaidApiUtils.js";

const createUser = async (uid, accessToken) => {
  const existingUser = User.findOne({ firebaseId: uid });
  if (existingUser) {
    console.log("User already exists");
    return;
  }

  await getTransactionData(accessToken);

  const newUser = new User({
    firebaseId: uid,
    accessToken,
    categoryWeights: undefined,
    ownedStocks: undefined,
  });
  await newUser.save();
};

export { createUser };
