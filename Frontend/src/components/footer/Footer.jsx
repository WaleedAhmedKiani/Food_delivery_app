import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>At Foody, we bring your favorite meals from local restaurants right to your doorstep.
                     Whether you're craving comfort food, healthy options, or gourmet delights, 
                     we’ve got you covered with a variety of cuisines. Order now and experience fast,
                      fresh, and delicious food delivery at your convenience.</p>
                     <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                     </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li onClick={()=>navigate('/') }>Home</li>
                    <li onClick={()=>navigate('/about') }>About us</li>
                    <li onClick={()=>navigate('/contact') }>Contact us</li>
                    <li onClick={()=>navigate('/order') }> Check Order History</li>
                    
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+974-77401042</li>
                    <li>contact@foody.com</li>
                </ul>
            </div>
            
        </div>
        <hr/>
        <p className='footer-copyright'>© 2023 Foody. All Rights Reserved. | Terms of Service | Privacy Policy</p>
    </div>
  )
}

export default Footer