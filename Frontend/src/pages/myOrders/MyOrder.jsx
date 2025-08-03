import React, { useEffect, useState } from 'react'
import './MyOrder.css';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrder = () => {

    const {URL, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(URL+ '/api/order/userorders',{}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setData(response.data.data)
        // console.log(response.data)
    }

    useEffect(() => {
      if(token) {
        fetchOrders();
      }
    
    
    }, [token])
    
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, index) => {
            return (
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=> {
                        if(index === order.items.length - 1) {
                            return item.name +' x' + item.quantity
                        }
                        else {
                            return item.name +' x' + item.quantity + ', '
                        }
                    })} </p>

                    <p>${order.amount }.00 </p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#9726;</span><b>{order.status} </b> </p>
                    <button onClick={fetchOrders}>Order Status</button>

                    

                </div>
            )
        })}
            
        </div>
        
    </div>
  )
}

export default MyOrder