import { User } from "./models.js";

const createUser = async (uid, accessToken) => {
  const existingUser = User.findOne({ firebaseId: uid });
  if (existingUser) {
    console.log("User already exists");
    return;
  }

  const newUser = new User({
    firebaseId: uid,
    accessToken,
    categoryWeights: undefined,
    ownedStocks: undefined,
  });
  await newUser.save();
};

export { createUser };
