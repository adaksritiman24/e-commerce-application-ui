import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getTotalCartItems } from '../../../cart/readCartDataFromLocalStorage';
import { SPRING_BOOT_BASE_URL } from '../../constants';
import { buzzCart } from './useProduct';

const useCart =(setNumberOfCartItems)=> {

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
        setNumberOfCartItems(getTotalCartItems());
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
    

    const updateCartPageProducts = ()=>{
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


    const increaseCartQuantityBy1 = (productId)=>{
        const cartListJSON = localStorage.getItem(buzzCart);
        const cartList = JSON.parse(cartListJSON);
        
        const newCartList = cartList.map((cartItem)=>{
            if(cartItem.productId == productId) return {
                ...cartItem, quantity : cartItem.quantity + 1
            }
            else return cartItem;
        })
        localStorage.setItem(buzzCart,JSON.stringify(newCartList));
        updateCartPageProducts();
    }

    const decreaseCartQuantityBy1 = (productId)=>{
        const cartListJSON = localStorage.getItem(buzzCart);
        const cartList = JSON.parse(cartListJSON);
        
        const newCartList = cartList.map((cartItem)=>{
            if(cartItem.productId == productId) return {
                ...cartItem, quantity : cartItem.quantity - 1
            }
            else return cartItem;
        })
        localStorage.setItem(buzzCart,JSON.stringify(newCartList));
        updateCartPageProducts();
    }

    const removeFromCart = (productId)=> {
        const cartListJSON = localStorage.getItem(buzzCart);
        const cartList = JSON.parse(cartListJSON);
        const updatedCartList = cartList.filter((cartItem)=>cartItem.productId != productId);
        localStorage.setItem(buzzCart,JSON.stringify(updatedCartList));

        updateCartPageProducts();
    }

    useEffect(()=>{
      updateTotalAmount();
    },[productsData])

    useEffect(() => {
      updateCartPageProducts();
    }, [])
    
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
