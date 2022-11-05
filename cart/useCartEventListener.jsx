import { useEffect } from "react";
import { getTotalCartItems } from "./readCartDataFromLocalStorage";

const useCartEventListener = (eventType, listener, targetElement, setNumberOfItems) => {
    useEffect(() => {
      if (targetElement?.addEventListener) {
        // listener(getTotalCartItems());
        // console.log(getTotalCartItems());
        console.log("here");
        setNumberOfItems(getTotalCartItems());
        targetElement.addEventListener(eventType, listener);
      }
  
      return () => {
        if (targetElement?.removeEventListener) {
          targetElement.removeEventListener(eventType, listener);
        }
      };
    }, [eventType, listener, targetElement]);
  };
  
  export default useCartEventListener;