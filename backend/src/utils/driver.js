import { User } from "../app/models.js";

const upsertUser = async (uid, accessToken, ownedStocks) => {
  const existingUser = await User.findOne({ firebaseId: uid });
  if (existingUser) {
    console.log("User already exists");
    existingUser.ownedStocks = ownedStocks;
    await existingUser.save();
    return;
  }

  const newUser = new User({
    firebaseId: uid,
    accessToken,
    categoryWeights: undefined,
    ownedStocks: ownedStocks,
  });
  await newUser.save();
};

export { upsertUser };
