"use client";

import { apis } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const OrdersTable = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  console.log("orders", orders);

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersRes = await axios.get(apis.SERVER_BASE_URL + "api/orders");
      setLoading(false);

      if (ordersRes.status === 200) {
        setOrders(ordersRes.data);
      }
    } catch (error) {
      console.log("Error while fetching order lists ============");
      console.log(error);
      console.log("==============================================");
      setOrders([]);
    }
  };
  return (
    <tbody>
      {orders?.map((el, ind) => {
        return (
          <tr key={ind}>
            <td>{ind + 1}</td>
            <td>{el?.payment_flag === "D" ? 0 : el?.order_amount}</td>
            <td>{el?.invoice_no}</td>
            <td>{el?.order_date?.slice(0, 10)}</td>
            <td>{el?.payment_flag === "D" ? "Paid" : "Unpaid"}</td>
            <td>
              <button
                className="status-button"
                disabled={el?.payment_flag === "D" ? true : false}
              >
                {el?.payment_flag === "D" ? "Already Paid" : "Confirm Payment"}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default OrdersTable;
