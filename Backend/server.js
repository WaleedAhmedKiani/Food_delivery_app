import "dotenv/config";
import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";
import FoodRouter from "./routes/foodRoute.js";
import UserRouter from "./routes/userRoute.js";
import CartRouter from "./routes/cartRoute.js";
import OrderRouter from "./routes/orderRoute.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Mongodb connection 
connectDB();

// api endpoint
app.use("/api/food", FoodRouter);
app.use("/api/users", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order", OrderRouter);
app.use('/images', express.static('uploads'));


// app.get('/api/users', (req, res) => {

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})

