
import UserModel from "../models/Usermodel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const userData = await UserModel.findById(userId);
    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: "Item added to cart" });

  } catch (error) {
    console.log("Add to cart error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const userData = await UserModel.findById(userId);
    const cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: "Item removed from cart" });

  } catch (error) {
    console.log("Remove from cart error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const userData = await UserModel.findById(userId);
    const cartData = userData.cartData || {};

    res.status(200).json({ message: "Cart fetched successfully", success: true, cartData });

  } catch (error) {
    console.log("Get cart error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
