import { useState } from "react"
import {bannerPromotions as bp} from "../../../dummy_data/banner_promotions";

const useHomePage = ()=> {
    const [bannerPromotions, setBannerPromotions] = useState(bp);

    useState(()=>{
        setBannerPromotions(bp);
    },[])
    return ({
        bannerPromotions
    })
}

export default useHomePage;