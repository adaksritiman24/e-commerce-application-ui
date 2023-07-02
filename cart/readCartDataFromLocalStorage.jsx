import axios from "axios";
import { SPRING_BOOT_BASE_URL } from "../components/constants";

export const getTotalCartItemsFromLS = async(isRegisteredUser, username)=> {
    try{
        if(!isRegisteredUser) {
            const cartJSON = localStorage.getItem("buzzCart");
            if(cartJSON === null  || cartJSON === undefined) return 0;
            const cartData = JSON.parse(cartJSON);
            return cartData.length;
        }
        else {
            return await getCartQuantityForRegisyteredCustomer(username);
        }
    }
    catch(error) {
        return 0;
    }
}

const getCartQuantityForRegisyteredCustomer = async(username)=> {
    const config = {
        method: 'get',
        url:   `${SPRING_BOOT_BASE_URL}/cart/${username}`,
        headers: { 
          'Content-Type': 'application/json'
        },
      };
    try {

        const response = await axios(config);
        const {cartEntryList} = response.data;
        return cartEntryList.length;
    }
    catch {
        console.log("Unable to fetch cart data");
        return 0;
    }

}