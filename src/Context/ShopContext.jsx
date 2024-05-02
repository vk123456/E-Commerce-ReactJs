import React, { createContext, useState } from "react"
import all_product from '../Components/Assets/all_product'
import Product from "../Pages/Product";
export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let Cart = {};
    for (let index = 0; index < all_product.length  + 1; index++) {
       Cart[index] = 0;
    }
    return Cart;
}

const ShopContextProvider = (props) =>{
    
    const [CartItems,setCartItems] = useState(getDefaultCart());

    //console.log(CartItems);

    const addToCart = (itemId) =>{
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1}))
        console.log(CartItems);
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}))
    }

    const getTotalCartAmount = () =>{
        let TotalAmount = 0;
        for(const item in CartItems){
            if(CartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item))
                TotalAmount += itemInfo.new_price*CartItems[item];
            }
        }
        return TotalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in CartItems){
            if(CartItems[item] > 0){
                totalItem += CartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, CartItems, CartItems,addToCart,removeFromCart};


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;