import React from 'react';
import './Contact.css'

const Contact = () => {
    return (
        <>  <header>
        <h1>Contact Us</h1>
        <p>Have any questions or feedback? We’re here to help!</p>
      </header>
    
      <section id="contact-details">
        <div class="contact-info">
          <h2>Our Contact Information</h2>
          <p><strong>Email:</strong> <a href="mailto:support@foodelivery.com">support@foodelivery.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+974-77401042">+974-77401042</a></p>
          <p><strong>Address:</strong> 456 Foodie Lane, City, Country</p>
          <p><strong>Business Hours:</strong> Mon - Fri: 8 AM - 8 PM</p>
        </div>
    
        <div class="form-section">
          <h2>Drop Us a Message</h2>
          <form action="#" method="POST">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required/>
            
            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required/>
            
            <label for="message">Your Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>


        </>


    )
}

export default Contact