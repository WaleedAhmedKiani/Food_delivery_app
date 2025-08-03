import React, { useContext } from 'react'
import "./Item.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const Item = ({ id, name, image, price, description }) => {

    // const [countitem, setcountItem] = useState(0);
    const { cartItem, Add_Cart, Remove_Cart, URL } = useContext(StoreContext);

    return (
        <div className='item'>
            <div className="item-image-container">
                <img className='item-image' src={URL + "/images/" + image} alt="" />
                {!cartItem[id] ? <img className='add' onClick={() => Add_Cart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={() => Remove_Cart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItem[id]} </p>
                        <img onClick={() => Add_Cart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>

            <div className="item-info">
                <div className="item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="item-desc">
                    {description}
                </p>
                <p className='item-price'>
                    ${price}
                </p>
            </div>

        </div>
    )
}

export default Item