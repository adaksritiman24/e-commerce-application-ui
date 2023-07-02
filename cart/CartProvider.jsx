import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { getTotalCartItemsFromLS } from './readCartDataFromLocalStorage';
const cartContextValue = {
    numberOfItems : 0,
    setNumberOfItems : ()=>{}
}


export const CartContext = React.createContext(cartContextValue);

const CartProvider = (props)=> {
    const { user } = useContext(AuthContext);
    const [numberOfItems, setNumberOfItems] = useState();

    const updateCartQuantity = async()=> {
        const noi = await getTotalCartItemsFromLS(user != null, user?.username);
        setNumberOfItems(noi);
    }

    const cartContextValueStates = { numberOfItems, setNumberOfItems}
    
    useEffect(() => {
      updateCartQuantity();
    }, [user])
    
    return (
        <CartContext.Provider value={cartContextValueStates}>
                {props.children}
        </CartContext.Provider>
    )
    
    
}

export default CartProvider;