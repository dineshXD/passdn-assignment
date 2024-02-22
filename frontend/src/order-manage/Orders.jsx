import { useEffect, useState } from "react";
import { checkUserStatus } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../state/orderSlice";
import OrderTable from "./OrdetTable";

export const Orders = () => {
  // const [userRole, setUserRole] = useState("customer");
  const user = useSelector((state) => state.auth?.user?._id);
  const userRole = useSelector((state) => state.auth?.user?.role) || "customer";
  const userOrders = useSelector((state) => state.order?.userOrders);
  const [loading, setLoading] = useState(false);
  console.log(userOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserAndOrders = async () => {
      setLoading(true);
      try {
        await dispatch(checkUserStatus());
        await dispatch(getUserOrders(user));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, [dispatch, user]);
  // useEffect(() => {
  //   dispatch(checkUserStatus())
  //     .then(() => {
  //       // setUserRole(user?.role || "customer");
  //       // setCheckedUserStatus(true);
  //       console.log(user);
  //     })
  //     .then(() => {
  //       setLoading(true);
  //       dispatch(getUserOrders(user));
  //     })
  //     .catch((error) => {
  //       console.error("Error checking user status:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [dispatch, user]);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : userRole === "customer" && userOrders ? (
        <OrderTable orders={userOrders} />
      ) : (
        <h1>No order found</h1>
      )}
    </>
  );
};
