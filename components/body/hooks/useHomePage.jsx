import { useState } from "react"
import {bannerPromotions as bp} from "../../../dummy_data/banner_promotions";
import {products} from "../../../dummy_data/products";

const useHomePage = ()=> {
    const [bannerPromotions, setBannerPromotions] = useState(bp);
    const [categoryPromotions, setCategoryPromotions] = useState([
        {
            title : "This Diwali we got the best smartphones for you",
            image : "/buzz/imgs/banner/diwali-2.jpg",
            items : [
                products[0],
                products[1],
                products[2],
                products[3],
            ]
        },
        {
            title : "Change you style with cool footwears",
            items : [
                products[0],
                products[1],
                products[2],
                products[3],
            ]
        },
        {
            title : "Most selling fashion clothings",
            image : null,
            items : [
                products[3],
                products[2],
                products[1],
                products[0],
            ]
        }
    ]);

    useState(()=>{
        setBannerPromotions(bp);
    },[])
    return ({
        bannerPromotions,
        categoryPromotions,
    })
}

export default useHomePage;