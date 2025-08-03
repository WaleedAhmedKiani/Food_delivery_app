import React, { useContext, useState } from 'react'
import './LoginMessage.css'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext'

const LoginMessage = ({ setshowLogin }) => {

    const { URL, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newurl = URL;
        if (currState === "Login") {
            newurl += '/api/users/login'
        } else {
            newurl += '/api/users/register'
        }
        const response = await axios.post(newurl, data);
        if (response.status === 200) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setshowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }



    return (
        <div className='login-popup'>

            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}

                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "sign Up" ? "Create account" : "Login"} </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>

                {currState === "Login" ? <p className='p-last'>Create a new account? &nbsp;<span className='click-reg' onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                    <p className='p-last'>Already have an account? &nbsp;<span className='click-reg' onClick={() => setCurrState("Login")}>Login here</span> </p>}


            </form>
        </div>
    )
}

export default LoginMessage