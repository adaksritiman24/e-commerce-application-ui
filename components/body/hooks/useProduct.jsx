import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { products } from "../../../dummy_data/products";

export const buzzCart = "buzzCart";

const useProduct = ()=>{
    const router = useRouter();
    const productId = router.query.productId;
    const [product, setProduct] = useState(null);
    const [quantityInCart, setQuantityInCart] = useState(0);


    const updateCartQuantity=()=>{
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
    }

    const decreaseCartQuantityBy1=()=>{
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

    const removeFromCart = ()=>{
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

    const addToCartWithQuantity1=()=>{
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

    useEffect(()=>{
        //backend api calls here
        if(productId){
            const currentProduct = products.find(p=>p.id===parseInt(productId));
            setProduct(currentProduct);
        }   
    },[productId]);

    useEffect(()=>{
        updateCartQuantity();
    },[productId])

    return ({
        product,
        quantityInCart,
        addToCartWithQuantity1,
        decreaseCartQuantityBy1,
        removeFromCart
    })
}

export default useProduct;