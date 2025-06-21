import { useEffect, useState } from "react";
import { SPRING_BOOT_BASE_URL } from "../../constants";
import axiosClient from "../../../oauth/client/axiosClient";

const useOrder = (username) => {
  const [orders, setOrders] = useState([]);
  const [requestedPage, setRequestedPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAllOrders = async (pageNumber) => {
    if (username != undefined && username != null) {
      const data = JSON.stringify({
        username,
        pageNumber
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
        var response = await axiosClient(config);
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
        setRequestedPage(pageNumber);
      } catch (exception) {
        console.log("Error in fetching order: ", exception);
      }
    } else {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchAllOrders(requestedPage);
  }, [username]);

  return {
    orders,
    totalPages,
    requestedPage,
    setRequestedPage,
    fetchAllOrders,
  };
};

export default useOrder;
