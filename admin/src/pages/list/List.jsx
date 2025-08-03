import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = ({URL}) => {
 
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${URL}/api/food/list`);
      console.log(response.data);
      if (response.status === 200) {
        setList(response.data.Data)
        console.log("FoodData", response.data.Data)
      }
      else {
        alert("Something went wrong")
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const removeFoodItem = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (!confirmDelete) return;

      const response = await axios.delete(`${URL}/api/food/delete/${id}`);

      if (response.status === 200) {
        toast.success("Item deleted successfully");
        fetchlist(); // Refresh the list after deletion
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };


  useEffect(() => {
    fetchlist();
  }, [])

  return (
    <div className='list'>
      <h1>Food Items List</h1>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>&nbsp; &nbsp; &nbsp; Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-formate">
              <img src={`${URL}/images/` + item.image} alt="" />
              <p>{item.name} </p>
              <p>{item.category} </p>
              <p>${item.price} </p>
              <p onClick={() => removeFoodItem(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List