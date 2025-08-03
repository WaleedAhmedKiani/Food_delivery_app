import React, { useContext, useEffect } from 'react'
import './Verify.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../components/context/StoreContext';

const Verify = () => {
    const {URL, navigate } = useContext(StoreContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    // console.log('Payment successfull : '+ success, orderId);

    const verifyPayment = async () => {
        const response = await axios.post(URL+'/api/order/verify',{orderId, success});
        if(response.status === 200) {
            console.log('Payment verified');
           navigate('/myorders') 
        }
        else {
            navigate('/')
        }
    }
    useEffect(() => {
      verifyPayment();
    
    }, [])
    


    
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify