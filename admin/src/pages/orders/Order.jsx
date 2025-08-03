import React from 'react'
import './Order.css';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const Order = ({ URL }) => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(URL + '/api/order/list');
    if (response.status === 200) {
      setOrders(response.data.data);
      // console.log('Response : ' + response.status);
      console.log(response.data)
    }
    else {
      toast.error('Error fetching orders');
    }


  }
  // status handler
  const handleStatus = async (e, orderId) => {
    const response = await axios.post(URL+'/api/order/status', {
      orderId,
      status:e.target.value
    });
    if (response.status === 200) {
      toast.success('Order status updated successfully');
      await fetchOrders();
    }
    
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='order add'>
      
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x' + item.quantity
                  }
                  else {
                    return item.name + ' x' + item.quantity + ', '
                  }

                })}
                
              </p>
              <p className='order-item-name'>
                {order.address.firstName+" "+order.address.lastName}</p>
                
                <p className='order-item-address'>{order.address.street+","} </p>
                <p className='order-item-city'>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode} </p>
                <p className='order-item-phone'>{order.address.phone} </p>
                <p className='order-item-quantity'>Items: {order.items.length}  </p>
                <p className='order-item-amount'> ${order.amount} </p>
                <select onChange={(e)=> handleStatus(e,order._id)} value={order.status}>
                  <option value="Pending"> Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered"> Delivered</option>
                </select>

              
                
                
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order