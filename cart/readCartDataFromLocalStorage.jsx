import { SPRING_BOOT_BASE_URL } from "../components/constants";
import axiosClient from "../oauth/client/axiosClient";

export const getTotalCartItemsFromLS = async(isRegisteredUser, username, anonymousAuthSessionId)=> {
    try{
        if(!isRegisteredUser) {
            return await getCartQuantityForCustomer(anonymousAuthSessionId);
        }
        else {
            return await getCartQuantityForCustomer(username);
        }
    }
    catch(error) {
        return 0;
    }
}

const getCartQuantityForCustomer = async(username)=> {
    const config = {
        method: 'get',
        url:   `${SPRING_BOOT_BASE_URL}/cart/${username}`,
        headers: { 
          'Content-Type': 'application/json'
        },
      };
    try {

        const response = await axiosClient(config);
        const {cartEntryList} = response.data;
        return cartEntryList.length;
    }
    catch {
        console.log("Unable to fetch cart data");
        return 0;
    }

}