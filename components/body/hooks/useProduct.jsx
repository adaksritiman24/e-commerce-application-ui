import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { products } from "../../../dummy_data/products";

export const buzzCart = "buzzCart";

const useProduct = ()=>{
    const router = useRouter();
    const productId = router.query.productId;
    const [product, setProduct] = useState(null);


    const addToCartWithQuantity1=()=>{
        const cartListJSON = localStorage.getItem(buzzCart);

        if(!cartListJSON){
            const newCartList = [
                {
                    productId : productId,
                    quantity : 1
                }
            ]
            localStorage.setItem("buzzCart",JSON.stringify(newCartList));
        }
        else{
            const cartList = JSON.parse(cartListJSON);
            const currentProductData = cartList.find(cartItem=> cartItem.productId == productId);
            
            if(currentProductData === undefined){ //product not found in cart, add product with quantity 1
                cartList.push({
                    productId : productId,
                    quantity : 1
                })
                localStorage.setItem("buzzCart",JSON.stringify(cartList));
            }
            else{ //increase quantity of the existing item
                const newCartList = cartList.map((cartItem)=>{
                    if(cartItem.productId == productId) return {
                        ...cartItem, quantity : cartItem.quantity + 1
                    }
                    else return cartItem;
                })
                localStorage.setItem("buzzCart",JSON.stringify(newCartList));

            }
        }
        
    }

    useEffect(()=>{
        //backend api calls here
        if(productId){
            const currentProduct = products.find(p=>p.id===parseInt(productId));
            setProduct(currentProduct);
        }   
    },[productId]);

    return ({
        product,
        addToCartWithQuantity1,
    })
}

export default useProduct;