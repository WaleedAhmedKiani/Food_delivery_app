import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, updateOrderStatus, userOrders, verifyPayment } from '../controller/orderController.js';


const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);
OrderRouter.post('/verify', verifyPayment);
OrderRouter.post('/userorders', authMiddleware, userOrders);
OrderRouter.get('/list', listOrders);
OrderRouter.post('/status', updateOrderStatus);

export default OrderRouter;

