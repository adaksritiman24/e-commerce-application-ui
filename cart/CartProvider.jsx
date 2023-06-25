import React, { useState } from 'react';
import { getTotalCartItemsFromLS } from './readCartDataFromLocalStorage';
const cartContextValue = {
    numberOfItems : 0,
    setNumberOfItems : ()=>{}
}


export const CartContext = React.createContext(cartContextValue);

const CartProvider = (props)=> {

    const [numberOfItems, setNumberOfItems] = useState(getTotalCartItemsFromLS());
    const cartContextValueStates = { numberOfItems, setNumberOfItems}
    return (
        <CartContext.Provider value={cartContextValueStates}>
                {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;