import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { getTotalCartItemsFromLS } from './readCartDataFromLocalStorage';
import useCart from '../components/body/hooks/useCart';
const cartContextValue = {
    numberOfItems : 0,
    cartData : null,
    increaseCartQuantityBy1 : ()=>{},
    decreaseCartQuantityBy1 : ()=>{},
    removeFromCart : ()=> {},
    addDeliveryAddress: ()=>{},
    placeOrderUsingBankCard: ()=>{},
    setNumberOfItems : ()=>{},
    updateCartPageProducts: ()=>{},
}


export const CartContext = React.createContext(cartContextValue);

const CartProvider = (props)=> {
    const { user, anonymousAuthSessionId } = useContext(AuthContext);
    const [numberOfItems, setNumberOfItems] = useState();
    const {
        cartData,
        increaseCartQuantityBy1,
        decreaseCartQuantityBy1,
        removeFromCart,
        addDeliveryAddress,
        placeOrderUsingBankCard,
        updateCartPageProducts,
      } = useCart(
        setNumberOfItems,
        user != null,
        user?.username,
        anonymousAuthSessionId
      );

    const updateCartQuantity = async()=> {
        const noi = await getTotalCartItemsFromLS(user != null, user?.username, anonymousAuthSessionId);
        setNumberOfItems(noi);
    }

    const cartContextValueStates = {
         numberOfItems, 
         setNumberOfItems, 
         cartData, 
         increaseCartQuantityBy1,
         decreaseCartQuantityBy1,
         removeFromCart,
         addDeliveryAddress,
         placeOrderUsingBankCard,
         updateCartPageProducts
    };
    
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