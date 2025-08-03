import React, { useContext } from 'react'
import './Itemdisplay.css'
import { StoreContext } from '../context/StoreContext'
import Item from '../Item/Item';

const Itemdisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Cuisines near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category)
                        return <Item key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description} />

                })}
            </div>
        </div>
    )
}

export default Itemdisplay