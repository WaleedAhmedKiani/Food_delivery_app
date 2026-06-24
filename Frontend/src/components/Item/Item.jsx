import React, { useContext } from 'react';
import "./Item.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const Item = ({ id, name, image, price, description }) => {
    const { cartItem, Add_Cart, Remove_Cart, URL } = useContext(StoreContext);

    /**
     * Dynamically determines the correct image URL.
     */
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        
        // If the path starts with http:// or https://, it's a Cloudinary link! Use it directly.
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }
        
        // Otherwise, it's a legacy local filename (e.g., "123_food.png")
        return URL + "/images/" + imagePath;
    };

    return (
        <div className='item'>
            <div className="item-image-container">
                {/* Fixed the image src to use the dynamic resolver */}
                <img className='item-image' src={getImageUrl(image)} alt={name} />
                
                {!cartItem[id] ? (
                    <img className='add' onClick={() => Add_Cart(id)} src={assets.add_icon_white} alt="Add to cart" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => Remove_Cart(id)} src={assets.remove_icon_red} alt="Remove" />
                        <p>{cartItem[id]}</p>
                        <img onClick={() => Add_Cart(id)} src={assets.add_icon_green} alt="Add" />
                    </div>
                )}
            </div>

            <div className="item-info">
                <div className="item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="item-desc">
                    {description}
                </p>
                <p className='item-price'>
                    ${price}
                </p>
            </div>
        </div>
    );
}

export default Item;