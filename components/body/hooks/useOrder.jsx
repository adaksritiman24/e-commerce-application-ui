import axios from "axios";
import { useEffect, useState } from "react";
import { SPRING_BOOT_BASE_URL } from "../../constants";

const useOrder = (username) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (username != undefined && username != null) {
      const data = JSON.stringify({
        username,
      });
      const config = {
        method: "post",
        url: `${SPRING_BOOT_BASE_URL}/order/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        var response = await axios(config);
        setOrders(response.data);
      } catch (exception) {
        console.log("Error in fetching order: ", exception);
      }
    } else {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [username]);

  return {
    orders,
  };
};

export default useOrder;
