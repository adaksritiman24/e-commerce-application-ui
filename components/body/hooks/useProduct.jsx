import axios from "axios";
import { useEffect, useState } from "react";
import { getTotalCartItemsFromLS } from "../../../cart/readCartDataFromLocalStorage";
import { SPRING_BOOT_BASE_URL } from "../../constants";

export const buzzCart = "buzzCart";

const useProduct = (product, setNumberOfCartItems, isRegisteredUser, username)=>{
    
    const productId = product.id;
    const [quantityInCart, setQuantityInCart] = useState(0);

    //UPDATE PRODUCT QUANTITY IN CART BEGINS----------------------------------------------------------
    const updateCartQuantity=()=>{
        if(isRegisteredUser) {
            updateProductInCartQuantityForRegisteredUser();
        }
        else {
            updateProductInCartQuantityForGuestUser();
        }
    }

    const updateProductInCartQuantityForGuestUser = ()=> {
        const cartListJSON = localStorage.getItem(buzzCart);
        if(!cartListJSON){
            setQuantityInCart(0);
            return
        }
        const cartList = JSON.parse(cartListJSON);
        const currentProductData = cartList.find(cartItem=> cartItem.productId == productId);
 
        if(currentProductData !== undefined)
            setQuantityInCart(currentProductData.quantity);
        else    
            setQuantityInCart(0);    

        console.log("Dispatching cart event");
        setNumberOfCartItems(getTotalCartItemsFromLS()); 
    }

    const updateProductInCartQuantityForRegisteredUser = ()=> {
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
            console.log(cartList);
            const currentProductData = cartList.find(cartItem=> cartItem.productId == productId);
            if(currentProductData !== undefined)
                setQuantityInCart(currentProductData.quantity);
            else    
                setQuantityInCart(0);   
          })
          .catch((error) =>{
            console.log("Unable to fetch cart data");
            setQuantityInCart(0);
          });
        console.log("Dispatching cart event");
        setNumberOfCartItems(getTotalCartItemsFromLS());   
    }

    //UPDATE PRODUCT QUANTITY IN CART ENDS----------------------------------------------------------

    //DECREASE PRODUCT QTY FROM CART BEGINS---------------------------------------------------------


    const decreaseCartQuantityBy1=()=>{
        if(isRegisteredUser) {
            decreaseProductQuantityForRegisteredUser();
        }
        else {
            decreaseProductQuantityForGuest();
        }
    }

    const decreaseProductQuantityForGuest = () => {
        const cartListJSON = localStorage.getItem(buzzCart);
        if(!cartListJSON){
            return
        }
        const cartList = JSON.parse(cartListJSON);
        const currentProductData = cartList.find(cartItem=> cartItem.productId == productId);

        if(currentProductData !== undefined){
            const newCartList = cartList.map((cartItem)=>{
                if(cartItem.productId == productId) return {
                    ...cartItem, quantity : cartItem.quantity - 1
                }
                else return cartItem;
            })
            localStorage.setItem(buzzCart,JSON.stringify(newCartList));
        }
        updateCartQuantity();
    }

    const decreaseProductQuantityForRegisteredUser = () => {
        updateCartQuantityforRegisteredUser(productId, -1, username);
    }

    //DECREASE PRODUCT QTY FROM CART ENDS---------------------------------------------------------

    //REMOVE PRODUCT FROM CART---------------------------------------------------------
    const removeFromCart = ()=>{

        if (isRegisteredUser) {
            removeFromCartForRegisteredUser();
        }
        else {

            try{
                const cartListJSON = localStorage.getItem(buzzCart);
                const cartList = JSON.parse(cartListJSON);
                const updatedCartList = cartList.filter((cartItem)=>cartItem.productId != productId);
                localStorage.setItem(buzzCart,JSON.stringify(updatedCartList));
                updateCartQuantity();
            }
            catch(e) {
                console.log("Item not in cart");
            }
        }
    }
    const removeFromCartForRegisteredUser = ()=> {
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
            updateCartQuantity();
          })
          .catch((error) =>{
            console.log(error);
          });
    }

    //---------------------------------------------------------

    //INCREASE QTY OR ADD PRODUCT TO CART --------------------------------------------------------

    const addToCartWithQuantity1= ()=> {
        if(isRegisteredUser) {
            addToCartWithQuantity1ForRegisteredUser(); 
        }
        else {
            addToCartWithQuantity1ForGuestUser();
        }
    }

    const addToCartWithQuantity1ForGuestUser=()=>{
        const cartListJSON = localStorage.getItem(buzzCart);

        if(!cartListJSON){
            const newCartList = [
                {
                    productId : productId,
                    quantity : 1
                }
            ]
            localStorage.setItem(buzzCart,JSON.stringify(newCartList));
        }
        else{
            const cartList = JSON.parse(cartListJSON);
            const currentProductData = cartList.find(cartItem=> cartItem.productId == productId);
            
            if(currentProductData === undefined){ //product not found in cart, add product with quantity 1
                cartList.push({
                    productId : productId,
                    quantity : 1
                })
                localStorage.setItem(buzzCart,JSON.stringify(cartList));
            }
            else{ //increase quantity of the existing item
                const newCartList = cartList.map((cartItem)=>{
                    if(cartItem.productId == productId) return {
                        ...cartItem, quantity : cartItem.quantity + 1
                    }
                    else return cartItem;
                })
                localStorage.setItem(buzzCart,JSON.stringify(newCartList));

            }
        }
        updateCartQuantity();
        
    }

    const addToCartWithQuantity1ForRegisteredUser =()=> {
        updateCartQuantityforRegisteredUser(productId, 1, username);
    }
    //INCREASE QTY OR ADD PRODUCT TO CART ENDS--------------------------------------------------------

    //UPDATE Cart QTY for registered users
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