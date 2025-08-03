import React, { useContext, useState, useEffect } from 'react'
import "./Order.css"
import axios from 'axios'
import { StoreContext } from '../../components/context/StoreContext'


// * Place Order File

const Order = () => {
  const { getTotalCartAmount, food_list, cartItem, token, URL, navigate } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    zipcode: "",
    street: "",
    country: "",
    state: "",

  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

  }

  const PlaceOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(URL + '/api/order/place', orderData, {
      headers: {
        Authorization: `Bearer ${token}`, //  required for authMiddleware
      }
    }
    )
    if (response.status === 200) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert('something went wrong')
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart');

    }
  }, [token])


  return (
    <form onSubmit={PlaceOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First Name' />
          <input required type="text" name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Last Name' />
        </div>
        <input required type='email' name='email' value={data.email} onChange={onChangeHandler} placeholder='Email Address' />
        <input required type='text' name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />


        <div className="multi-fields">
          <input required type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='City' />
          <input required type='text' name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required type="text" name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zip Code' />
          <input required type='text' name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' />
        </div>
        <input required type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} </p>

            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee </p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Continue to Payment</button>
        </div>

      </div>

    </form>
  )

}
export default Order