import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getTotalCartItemsFromLS } from '../../../cart/readCartDataFromLocalStorage';
import { SPRING_BOOT_BASE_URL } from '../../constants';
import { buzzCart } from './useProduct';

const useCart =(setNumberOfCartItems, isRegisteredUser, username)=> {

    const [productsData, setProductsData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
   

    const updateTotalAmount = ()=> {
      let total = 0;
      for(let product of productsData) {
        total += product.totalPrice;
      }
      setTotalAmount(total);
    }

    const updateProductsDataWithCartQuantity = (products, ids)=> {
        setProductsData( products.map((product)=>({
                ...product,
                quantityInCart : ids.find((p)=>p.id === product.id).quantityInCart,
                totalPrice : ids.find((p)=>p.id === product.id).quantityInCart * product.discountedPrice,
            }))
        );
        setNumberOfCartItems(getTotalCartItemsFromLS());
    }


    const fetchProducts = (ids) => {
        const data = JSON.stringify(ids);
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
            updateProductsDataWithCartQuantity(response.data, ids);
        
          })
          .catch((error) =>{
            console.log(error);
            setProductsData([]);
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
            setProductsData([]);
            return;
        }
        const cartList = JSON.parse(cartListJSON);

        const ids = cartList.map((product)=>({
            id : product.productId,
            quantityInCart : product.quantity,
        }));
          
        fetchProducts(ids);
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
            fetchProducts(ids);
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

    useEffect(()=>{
      updateTotalAmount();
    },[productsData])

    useEffect(() => {
      updateCartPageProducts();
    }, [isRegisteredUser])
    
  return ({
    productsData, 
    totalAmount,
    setProductsData,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
  })
}

export default useCart;
