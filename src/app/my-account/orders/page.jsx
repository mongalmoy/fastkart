import "@/styles/app/my-account/orders/style.css";

const MyOrders = () => {
  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      <p className="orders-subtitle">Your orders in one place</p>
      <p className="orders-help">If you have any questions, feel free to contact us. Our Customer Service works 24/7</p>
      
      <div className="order_table_container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>ON:</th>
            <th>Due Amount:</th>
            <th>Invoice no:</th>
            <th>Qty:</th>
            <th>Size</th>
            <th>Order Date:</th>
            <th>Paid/Unpaid</th>
            <th>Status</th>
          </tr>
        </thead>
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
      </table>
      </div>
    </div>
  )
}

export default MyOrders