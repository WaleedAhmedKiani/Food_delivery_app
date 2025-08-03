import express from 'express';
import multer from 'multer';
import { addFood, deleteFood, listFood } from '../controller/foodController.js';


const FoodRouter = express.Router();




// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
}           
)
const upload = multer({ storage: storage });


FoodRouter.post('/add',upload.single('image'), addFood);
FoodRouter.get('/list', listFood);
FoodRouter.delete('/delete/:id', deleteFood);


export default FoodRouter;