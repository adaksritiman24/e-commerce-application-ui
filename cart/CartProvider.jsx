import React, { useState } from 'react';
import { getTotalCartItems } from './readCartDataFromLocalStorage';
const cartContextValue = {
    numberOfItems : 0,
    setNumberOfItems : ()=>{}
}


export const CartContext = React.createContext(cartContextValue);

const CartProvider = (props)=> {

    const [numberOfItems, setNumberOfItems] = useState(getTotalCartItems());
    const cartContextValueStates = { numberOfItems, setNumberOfItems}
    return (
        <CartContext.Provider value={cartContextValueStates}>
                {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;