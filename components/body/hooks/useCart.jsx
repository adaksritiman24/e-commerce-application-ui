import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SPRING_BOOT_BASE_URL } from '../../constants';

const useCart =(setNumberOfCartItems, isRegisteredUser, username, anonymousAuthSessionId)=> {
    const [cartData, setCartData] = useState({});

    const updateCartWithProductData = (products, cartData)=> {
        cartData.cartEntryList = cartData.cartEntryList.map(cartEntry=>{
          const product = products.find(product=>product.id === cartEntry.productId)
          return {
            ...product,
            ...cartEntry,
            unitPrice : product.discountedPrice,
            totalPrice : product.discountedPrice * cartEntry.quantity
          }
        })
        setCartData(cartData);
        setNumberOfCartItems(cartData.cartEntryList.length);
    }


    const fetchProductsAndSetCartData = (cartData) => {
        const data = cartData.cartEntryList.map((cartEntry)=> ({
          id : cartEntry.productId,
          quantityInCart : cartEntry.quantity
        }))
        const config = {
            method: 'post',
            url:   `${SPRING_BOOT_BASE_URL}/products/associated`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
    
        axios(config)
          .then( response=>{
            updateCartWithProductData(response.data, cartData);
        
          })
          .catch((error) =>{
            console.log(error);
          });
          
    }
    // UPDATE PRODUCTS ON PAGE ---------------------------------------------------------
    
    const updateCartPageProducts = ()=>{
        if(isRegisteredUser) {
          updateCartPageProductsForCustomer(username);
        }
        else {
          updateCartPageProductsForCustomer(anonymousAuthSessionId);
        }
          
    }

        
    //update cart page for all types customer
    const updateCartPageProductsForCustomer = (userId)=> {
        let fetchCartUrl;
        if(isRegisteredUser) {
          fetchCartUrl = `${SPRING_BOOT_BASE_URL}/cart/${userId}`;
        }
        else {
          fetchCartUrl = `${SPRING_BOOT_BASE_URL}/cart/anonymous/${userId}`;
        }
        const config = {
            method: 'get',
            url:   fetchCartUrl,
            headers: { 
              'Content-Type': 'application/json'
            },
          };
    
        axios(config)
          .then( response=>{
            fetchProductsAndSetCartData(response.data);
          })
          .catch((error) =>{
            console.log("Unable to fetch cart data");
          });
    }
    //UPDATE CART PAGE ENDS----------------------------------------------------------------------

    //update cart quantity (+1, -1)--------------------------------------------------------------------
    const increaseCartQuantityBy1 = (productId)=>{
        
        if(isRegisteredUser) {
          updateCartQuantityforUser(productId, 1, username)
        }
        else {
          updateCartQuantityforUser(productId, 1, anonymousAuthSessionId)
        }
    }

    const decreaseCartQuantityBy1 = (productId)=>{
        if(isRegisteredUser) {
          updateCartQuantityforUser(productId, -1, username)
        }
        else {
          updateCartQuantityforUser(productId, -1, anonymousAuthSessionId)
        }
    }

    const updateCartQuantityforUser = (productId, quantity, userId) => {
        var data = JSON.stringify({
          "productId": productId,
          "quantity": quantity
        });
        
        var config = {
          method: 'post',
          url: `${SPRING_BOOT_BASE_URL}/cart/${userId}`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then((response)=> {
          updateCartPageProducts();
        })
        .catch((error)=> {
          console.log(error);
          updateCartPageProducts();
        });
        
    }
    // update cart quantity end-------------------------------------------------------------------
    
    //REMOVE ITEM FROM CART --------------------------------------------------------------------
    const removeFromCart = (productId)=> {  
      if(isRegisteredUser) {
        removeFromCartForUser(productId, username);
      }
      else {
        removeFromCartForUser(productId, anonymousAuthSessionId);
      }
    }


    const removeFromCartForUser = (productId, userId)=> {

        var data = JSON.stringify({
          "productId": productId
        });
        
        var config = {
          method: 'post',
          url: `${SPRING_BOOT_BASE_URL}/cart/${userId}/remove`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then((response) =>{
          updateCartPageProducts();
        })
        .catch((error) =>{
          console.log(error);
        });
        
    }

    //REMOVE ITEM FROM CART END----------------------------------------------------------------

    //Add delivery address
    const addDeliveryAddress = async(deliveryAddress)=> {

      let setDeliveryAddressURL;
      if(isRegisteredUser) {
        setDeliveryAddressURL = `${SPRING_BOOT_BASE_URL}/cart/delivery_address/${username}`;
      }
      else {
        setDeliveryAddressURL = `${SPRING_BOOT_BASE_URL}/cart/delivery_address/${anonymousAuthSessionId}`;
      }
      var data = JSON.stringify(deliveryAddress);
      var config = {
        method: 'post',
        url: setDeliveryAddressURL,
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      try {
        await axios(config);
        updateCartPageProducts();
      }
      catch(e) {
        console.log("Failed to update delivery Address: ",e);
      }
    }


    useEffect(() => {
      updateCartPageProducts();
    }, [isRegisteredUser])
    
  return ({
    cartData,
    setCartData,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
    addDeliveryAddress,
  })
}

export default useCart;
