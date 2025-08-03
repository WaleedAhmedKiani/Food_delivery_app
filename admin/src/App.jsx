import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Order from './pages/orders/Order'
import {ToastContainer} from 'react-toastify'
const App = () => {
   const URL = "https://food-delivery-backend-8fbv.onrender.com";
  return (
    
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add URL={URL}/>}/>
          <Route path='/list' element={<List URL={URL}/>}/>
          <Route path='/order' element={<Order URL={URL}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
