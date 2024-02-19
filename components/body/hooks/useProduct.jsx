import axios from "axios";
import { useEffect, useState } from "react";
import { SPRING_BOOT_BASE_URL } from "../../constants";

export const buzzCart = "buzzCart";

const useProduct = (product, setNumberOfCartItems, isRegisteredUser, username, anonymousAuthSessionId)=>{
    
    const productId = product.id;
    const [quantityInCart, setQuantityInCart] = useState(0);

    //UPDATE PRODUCT QUANTITY IN CART BEGINS----------------------------------------------------------
    const updateCartQuantity=()=>{
        if(isRegisteredUser) {
            updateProductInCartQuantityForUser(username);
        }
        else {
            updateProductInCartQuantityForUser(anonymousAuthSessionId);
        }
    }


    const updateProductInCartQuantityForUser = (userId)=> {
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
            const cartList = response.data.cartEntryList;

            const currentProductData = cartList.find(cartItem=> cartItem.productId == productId);
            if(currentProductData !== undefined){
                setQuantityInCart(currentProductData.quantity);
            }
            else {
                setQuantityInCart(0);   
            }     
            setNumberOfCartItems(cartList.length);  
          })
          .catch((error) =>{
            console.log("Unable to fetch cart data");
            setQuantityInCart(0);
            setNumberOfCartItems(0);  
          });
        console.log("Dispatching cart event");
        
    }


    const decreaseCartQuantityBy1=()=>{
        if(isRegisteredUser) {
            updateCartQuantityBy1(productId, -1, username);
        }
        else {
            updateCartQuantityBy1(productId, -1, anonymousAuthSessionId);
        }
    }

    const removeFromCart = ()=>{

        if (isRegisteredUser) {
            removeFromCartForUser(username);
        }
        else {
            removeFromCartForUser(anonymousAuthSessionId)
        }
    }
    const removeFromCartForUser = (userId)=> {
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
            updateCartQuantity();
          })
          .catch((error) =>{
            console.log(error);
          });
    }


    const addToCartWithQuantity1= ()=> {
        if(isRegisteredUser) {
            updateCartQuantityBy1(productId, 1, username);
        }
        else {
            updateCartQuantityBy1(productId, 1, anonymousAuthSessionId);
        }
    }


    const updateCartQuantityBy1 = (productId, quantity, userId) => {
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
          updateCartQuantity();
        })
        .catch((error)=> {
          console.log(error);
          updateCartQuantity();
        });
        
    }


    useEffect(()=>{
        updateCartQuantity();
    },[productId, isRegisteredUser])

    return ({
        quantityInCart,
        addToCartWithQuantity1,
        decreaseCartQuantityBy1,
        removeFromCart
    })
}

export default useProduct;