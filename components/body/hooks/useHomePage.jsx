import { useState } from "react"
import {bannerPromotions as bp} from "../../../dummy_data/banner_promotions";
import {products} from "../../../dummy_data/products";

const useHomePage = ()=> {
    const [bannerPromotions, setBannerPromotions] = useState(bp);
    const [categoryPromotions, setCategoryPromotions] = useState([
        {
            title : "Best smartphone picks for you",
            items : [
                products[0],
                products[1],
                products[2],
                products[3],
            ]
        },
        {
            title : "Most selling fashion clothings",
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