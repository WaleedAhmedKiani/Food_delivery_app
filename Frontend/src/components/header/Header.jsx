import React from 'react'
import "./Header.css"


const Header = () => {
    return (
        <div className="header">
            <div className="header-content">
                <h2>Your top choice cuisine here</h2>
                <p>"Discover a world of delicious flavors with our curated menu, offering fresh, high-quality dishes to satisfy every craving.
                    Whether you're dining in or ordering online, we bring mouthwatering meals right to your doorstep"
                </p>
                <a href='#explore-menu'>Check Menu </a> 
            </div>
        </div>
    )
}

export default Header