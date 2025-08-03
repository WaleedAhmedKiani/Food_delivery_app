import OrderModel from "../models/Ordermodel.js";
import UserModel from "../models/Usermodel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// place order for user frontend
export const placeOrder = async (req, res) => {

    const frontend_url = 'http://localhost:5174';

    try {
        const newOrder = new OrderModel({
            userId: req.user._id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.user.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 2 * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`

        })
        res.status(200).json({ session_url: session.url })



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })

    }

}

export const verifyPayment = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === true || success === 'true') {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true })
            res.status(200).json({ message: 'Payment Successful' })
        }
        else {
            await OrderModel.findByIdAndDelete(orderId);
            res.status(502).json({ message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })

    }

}
// User order for frontend
export const userOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.user._id });
        // console.log(orders);
        res.status(200).json({ data: orders })
    } catch (error) {
        consol.log(error)
        res.status(500).json({ error: 'Internal Server Error' });


    }
}

// listing orders for admin panel
export const listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.status(200).json({ data: orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
// update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(orderId, { status });
        res.status(200).json({ message: 'Order status updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
}
