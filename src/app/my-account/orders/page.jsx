import OrdersTable from "@/page/orders/OrdersTable";
import "@/styles/app/my-account/orders/style.css";

const MyOrders = () => {
  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      <p className="orders-subtitle">Your orders in one place</p>
      <p className="orders-help">
        If you have any questions, feel free to contact us. Our Customer Service
        works 24/7
      </p>

      <div className="order_table_container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Sl No:</th>
              <th>Due Amount:</th>
              <th>Invoice no:</th>
              <th>Order Date:</th>
              <th>Paid/Unpaid</th>
              <th>Status</th>
            </tr>
          </thead>
          <OrdersTable />
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
