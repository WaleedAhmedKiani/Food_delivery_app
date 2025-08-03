import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Check the menu</h1>
            <p className='explore-menu-text'>"Explore our diverse menu filled with delicious options from your favorite local restaurants.
                Whether you're craving something new or sticking to your go-to dishes,
                we've got everything from comfort foods to gourmet meals ready for delivery right to your door!"</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(pre => pre === item.menu_name ? 'All' : item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="menu-img" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu