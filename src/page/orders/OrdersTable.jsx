"use client"

import { apis } from "@/lib/constants"
import axios from "axios"
import { useState } from "react"

const OrdersTable = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersRes = await axios.get(apis.SERVER_BASE_URL + "api/orders");
      setLoading(false);
      
      if(ordersRes.status===200) {
        setOrders(ordersRes.data)
      }
    } catch(error) {
      console.log("Error while fetching order lists ============")
      console.log(error)
      console.log("==============================================")
      setOrders([])
    }
  }
  return (
    <tbody>
          <tr>
            <td>#1</td>
            <td>P1499.00</td>
            <td>3639662</td>
            <td>1</td>
            <td>Small</td>
            <td>12-29-2021</td>
            <td>Paid/Unpaid</td>
            <td><button className="status-button">Confirm Payment</button></td>
          </tr>
          <tr>
            <td>#1</td>
            <td>P1499.00</td>
            <td>3639662</td>
            <td>1</td>
            <td>Small</td>
            <td>12-29-2021</td>
            <td>Paid/Unpaid</td>
            <td><button className="status-button">Confirm Payment</button></td>
          </tr>
          <tr>
            <td>#1</td>
            <td>P1499.00</td>
            <td>3639662</td>
            <td>1</td>
            <td>Small</td>
            <td>12-29-2021</td>
            <td>Paid/Unpaid</td>
            <td><button className="status-button">Confirm Payment</button></td>
          </tr>
        </tbody>
  )
}

export default OrdersTable