import React, { useContext } from 'react'
import "./Cart.css"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext';



const Cart = () => {
  const { cartItem, food_list, Remove_Cart, getTotalCartAmount, URL } = useContext(StoreContext);

  // *Navigate Hook use for changing location from one link to other...
  const navigate = useNavigate();
  return (
    <>
      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {

              return (
                <div>
                  <div className="cart-items-title cart-item-item">
                    <img src={URL+"/images/"+item.image} alt="" />
                    <p>{item.name} </p>
                    <p>${item.price} </p>
                    <p>{cartItem[item._id]} </p>
                    <p>${item.price * cartItem[item._id]} </p>
                    <p onClick={() => Remove_Cart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>

              )
            }
          })}


        </div>
        <div className="cart-bottom">
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
                <p>{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Continue to Checkout</button>
          </div>
          <div className="promo-code">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="promo-code-input">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart