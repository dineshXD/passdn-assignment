import React, { useEffect, useState } from "react";
import "./orderTable.css"; // Import the CSS file
import { Nav } from "../navigation/Nav";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../state/orderSlice";

export const RestaurantOrderTable = ({ orders }) => {
  const orderS = [
    "Pending",
    "Confirmed",
    "In Progress",
    "Delivered",
    "Cancelled",
  ];
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    // Initialize order statuses when orders change
    const initialStatuses = {};
    orders.forEach((order) => {
      initialStatuses[order._id] = order.status;
    });
    setOrderStatuses(initialStatuses);
  }, [orders]);
  const handleStatusChange = async (orderId, status) => {
    console.log(orderId, status);
    try {
      setLoading(true);
      await dispatch(updateOrderStatus({ orderId: orderId, status: status }));
      setOrderStatuses((prevStatuses) => ({
        ...prevStatuses,
        [orderId]: status,
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  //   useEffect(() => {
  //     const updateStatus = async () => {
  //       setLoading(true);
  //       console.log(selectedRestaurant);
  //       try {
  //         await dispatch(updateOrderStatus(orderId));
  //       } catch (error) {
  //         console.error("Error:", error);
  //       } finally {
  //         // setUserRole(userR);
  //         setLoading(false);
  //       }
  //     };
  //   }, [dispatch]);

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
          {orders.map((order) => (
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
              <td>
                <select
                  value={orderStatuses[order._id] || order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {orderS.map((o) => {
                    return <option key={o}>{o}</option>;
                  })}
                </select>
                )
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              {/* <td>
                <button
                  onClick={() => updateOrder(order._id, orderStatus)}
                ></button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
