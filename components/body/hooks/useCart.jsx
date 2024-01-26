import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SPRING_BOOT_BASE_URL } from '../../constants';
import { buzzCart } from './useProduct';

const useCart =(setNumberOfCartItems, isRegisteredUser, username)=> {
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
        //update Total Price in CartData
        let totalPrice = 0;
        for(let entry of cartData.cartEntryList) {
          totalPrice += entry.totalPrice;
        }
        cartData.totalPrice=totalPrice;
        setCartData(cartData);
        console.log("Cart: ",cartData);
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
          updateCartPageProductsForRegisteredCustomer(username);
        }
        else {
          upadateCartPageProductsForGuestUser();
        }
          
    }

    //update cart page for guest customer
    const upadateCartPageProductsForGuestUser = ()=> {
        const cartListJSON = localStorage.getItem(buzzCart);
        if(cartListJSON == null){
            setCartData([]);
            return;
        }
        const cartList = JSON.parse(cartListJSON);

        const entryList = cartList.map((product)=>({
            id : product.productId,
            quantityInCart : product.quantity,
        }));
          
        fetchProductsAndSetCartData(createAnonymousCartData(entryList));
    }

    const createAnonymousCartData =(entryList)=> {
      const cartEntryList = entryList.map(entry=>{
        return {
          productId : entry.id,
          quantity : entry.quantityInCart,
          unitPrice : 0,
          totalPrice : 0
        }
      })
      const cartData = {
        id : "anonynous",
        totalPrice : 0,
        deliveryAddress : null,
        cartEntryList
      }
      console.log("Created cart data for anonymous user");
      return cartData;

    }

        
    //update cart page for registed customer
    const updateCartPageProductsForRegisteredCustomer = (username)=> {
        const config = {
            method: 'get',
            url:   `${SPRING_BOOT_BASE_URL}/cart/${username}`,
            headers: { 
              'Content-Type': 'application/json'
            },
          };
    
        axios(config)
          .then( response=>{
            const cartList = response.data.cartEntryList;
            const ids = cartList.map((product)=>({
              id : product.productId,
              quantityInCart : product.quantity,
            }));
            console.log("Fetched cart data for Registered user");
            fetchProductsAndSetCartData(response.data);
          })
          .catch((error) =>{
            console.log("Unable to fetch cart data");
          });
    }
    //UPDATE CART PAGE ENDS----------------------------------------------------------------------

    //update cart quantity (+1, -1)--------------------------------------------------------------------

    // TODO
    const increaseCartQuantityBy1 = (productId)=>{
        
        if(isRegisteredUser) {
          updateCartQuantityforRegisteredUser(productId, 1, username)
        }
        else {
          upadateCartQuantityForGuestUser(productId, 1)
        }
    }

    const decreaseCartQuantityBy1 = (productId)=>{
        if(isRegisteredUser) {
          updateCartQuantityforRegisteredUser(productId, -1, username)
        }
        else {
          upadateCartQuantityForGuestUser(productId, -1)
        }
    }

    const upadateCartQuantityForGuestUser = (productId, quantity)=>{
        const cartListJSON = localStorage.getItem(buzzCart);
        const cartList = JSON.parse(cartListJSON);
        
        const newCartList = cartList.map((cartItem)=>{
            if(cartItem.productId == productId) return {
                ...cartItem, quantity : cartItem.quantity + quantity
            }
            else return cartItem;
        })
        localStorage.setItem(buzzCart,JSON.stringify(newCartList));
        updateCartPageProducts();
    }
    

    const updateCartQuantityforRegisteredUser = (productId, quantity, username) => {
        var data = JSON.stringify({
          "productId": productId,
          "quantity": quantity
        });
        
        var config = {
          method: 'post',
          url: `${SPRING_BOOT_BASE_URL}/cart/${username}`,
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

    //TODO
    const removeFromCart = (productId)=> {  
      if(isRegisteredUser) {
        removeFromCartForRegisteredUser(productId, username);
      }
      else {
        removeFromCartForGuestUser(productId);
      }
    }

    const removeFromCartForGuestUser = (productId) => {
        const cartListJSON = localStorage.getItem(buzzCart);
        const cartList = JSON.parse(cartListJSON);
        const updatedCartList = cartList.filter((cartItem)=>cartItem.productId != productId);
        localStorage.setItem(buzzCart,JSON.stringify(updatedCartList));

        updateCartPageProducts();
    }

    const removeFromCartForRegisteredUser = (productId, username)=> {

        var data = JSON.stringify({
          "productId": productId
        });
        
        var config = {
          method: 'post',
          url: `${SPRING_BOOT_BASE_URL}/cart/${username}/remove`,
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


    useEffect(() => {
      updateCartPageProducts();
    }, [isRegisteredUser])
    
  return ({
    cartData,
    setCartData,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
  })
}

export default useCart;
