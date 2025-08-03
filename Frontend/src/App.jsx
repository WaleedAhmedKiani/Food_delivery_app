import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Order from './pages/order/Order'
import Footer from './components/footer/Footer'
import LoginMessage from './components/loginMessage/LoginMessage'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Verify from './pages/payment/Verify'
import MyOrder from './pages/myOrders/MyOrder'



const App = () => {
  const [showlogin, setshowLogin] = useState(false);
  return (
    <>
    {showlogin?<LoginMessage setshowLogin={setshowLogin} />:<></>}
     <Navbar setshowLogin={setshowLogin} />
      <div className='app'>
       
        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} /> 
          <Route path='/contact' element={<Contact/>} /> 
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrder/>} />
        </Routes>
      </div>
      <Footer />

    </>

  )
}

export default App