import UserModel from "../models/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator'



// create Token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" });
}

// register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exist
        const Useravailable = await UserModel.findOne({ email: email });
        if (Useravailable) {
            res.status(400).json({ message: "User already exist" });
        }
        // validating email and password
        if (!validator.isEmail(email)) {
            res.status(400).json({ message: "Invalid email" });
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // creating user
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashpassword,
        });
        const User = await newUser.save();
        const token = createToken(User._id);
        res.status(200).json({ message: "User created successfully", token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // checking if user exist
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }
        // checking if password is correct
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        // creating token
        const token = createToken(user._id);
        res.status(200).json({ message: "User logged in successfully", token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}
