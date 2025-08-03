import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';
import authMiddleware from '../middleware/auth.js';

const CartRouter = express.Router();

CartRouter.post('/add',authMiddleware, addToCart);
CartRouter.get('/get',authMiddleware, getCart);
CartRouter.delete('/remove',authMiddleware, removeFromCart);

export default CartRouter;