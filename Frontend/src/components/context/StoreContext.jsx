import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setcartItem] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([])
    const navigate = useNavigate();

    // Backend url
    const URL = "https://food-delivery-backend-8fbv.onrender.com";

    //    Add Item To Cart
    const Add_Cart = async (Itemid) => {
        if (!cartItem[Itemid]) {
            setcartItem((prev) => ({ ...prev, [Itemid]: 1 }))
        }
        else {
            setcartItem((prev) => ({ ...prev, [Itemid]: prev[Itemid] + 1 }))
        }
        if (token) {
            await axios.post(URL + "/api/cart/add", { itemId: Itemid }, {
                headers: {
                    Authorization: `Bearer ${token}`, //  required for authMiddleware
                },
            })
        }
    }
    //   Remove Item From Cart
    const Remove_Cart = async (Itemid) => {
        setcartItem((prev) => ({ ...prev, [Itemid]: prev[Itemid] - 1 }))
        if (token) {
            await axios.delete(URL + "/api/cart/remove", {
                headers: {
                    Authorization: `Bearer ${token}`, //  required for authMiddleware
                },
                data: {
                    itemId: Itemid,
                }
            });
        }
    }
    // Fetch CartData
    const loadCartData = async (token) => {
        const response = await axios.get(URL + "/api/cart/get", {
            headers: {
                Authorization: `Bearer ${token}`, //  required for authMiddleware
            }

        })
        setcartItem(response.data.cartData);
    }
    // Total Amount Function
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {

            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }

        }
        return totalAmount;
    }



    // Fetch Food Item List
    const fetchFoodList = async () => {
        const response = await axios.get(URL + "/api/food/list");
        // console.log(response.data);

        if (response.status === 200) {
            setFoodList(response.data.Data)
            // console.log("FoodData", response.data.Data)
        }
    }

    // prevent from reloading
    useEffect(() => {

        async function loadData() {
            await fetchFoodList();

            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list, cartItem, setcartItem, Add_Cart, Remove_Cart, getTotalCartAmount, URL, token, setToken, navigate
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
