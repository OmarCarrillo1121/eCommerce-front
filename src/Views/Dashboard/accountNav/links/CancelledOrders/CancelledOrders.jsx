import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderCancelled, restoreOrder } from "../../../../../redux/actions";
import styles from "./CancelledOrders.module.css";
import { Link } from "react-router-dom";
import AccountNav from "../../accountNav";
import ActiveOrders from "../ActiveOrders/ActiveOrders";

//⭐ORDENES QUE ESTAN CANCELADAS Y QUIERO RESTAURAR:
const CancelledOrders = () => {
  const dispatch = useDispatch();
  const cancelledOrders = useSelector((state) => state.canceledOrder);

  console.log("⭐⭐⭐", cancelledOrders);

   useEffect(() => {
     const fetchData = async () => {
       try {
         await dispatch(getOrderCancelled());
       } catch (error) {
         console.error("Error al obtener las órdenes canceladas👀:", error);
       }
     };

     fetchData();
   }, [dispatch]);

  //✅ useEffect(()=>{
  //   dispatch(getOrderCancelled());
  //  }, []);


  const handleRestoreOrder = (id) => {
    dispatch(restoreOrder(id));
    alert("Orden restaurada con éxito⭐");
    window.location.reload();
  };
  

  return (
    <div>
      <div className={styles.container}>
        <AccountNav />

        <button className={styles.button2}>
          <Link to={`/dashboard/Orders/active`}>Active orders</Link>
        </button>

        <div className={styles.cardContainer}>
          <ul>
            {cancelledOrders?.map((order, i) => (
              <div key={i}>
                <div className={styles.cards} key={i} >
                  <li>
                    <Link to={`/dashboard/Orders/${order.id}`} className={styles.link}>
                      <h2>ID: {order.id}</h2>
                    </Link>
                    <p>User ID: {order.userId}</p>
                    <p>Amount: {order.amount}</p>
                    <p>Products:</p>
                    <ul>
                      {order?.products?.map((product) => (
                        <li key={product.id}>
                          <p>Name: {product.name}</p>
                          <p>Price: {product.price}</p>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleRestoreOrder(order.id)} className={styles.button}>
                      Restore order
                    </button>
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CancelledOrders;