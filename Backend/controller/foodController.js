import FoodModel from "../models/Foodmodel.js";
import fs from 'fs';

export const addFood = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`;
        const { name, price, description, category } = req.body;
        const food = new FoodModel({ name, price, description, category, image: image_filename });
        await food.save();
        res.status(201).json({ message: "Food items added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding food items" });
    }
}

// list foodData
export const listFood = async (req, res) => {
    try {
        const foodData = await FoodModel.find({});
        res.status(200).json({ success:true, Data: foodData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting food items" });
    }
}

// delete foodData
export const deleteFood = async (req, res) => {
    const {id} = req.params;
  try {
    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Delete the image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log("Error deleting image:", err);
      }
    });

    // Delete the food record
    await FoodModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting food item" });
  }
};

