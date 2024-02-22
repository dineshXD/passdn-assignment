import React, { useEffect, useState } from "react";
import "./orderTable.css"; // Import the CSS file
import { Nav } from "../navigation/Nav";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const OrderTable = ({ orders }) => {
  const [orderData, setOrders] = useState(orders);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("statusUpdated", (data) => {
      // setResponse(data);
      // Update the status of the specific order in the orders array
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order._id === data.orderId) {
            // Update the status of the matching order
            return { ...order, status: data.status };
          }
          return order;
        });
      });
    });
    // Cleanup function to disconnect when the component unmounts
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.items.map((item, index) => (
                  <div key={index} className="item">
                    <p>Quantity: {item.quantity}</p>
                    <p>Food Price: {item.foodPrice}</p>
                  </div>
                ))}
              </td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderTable;
