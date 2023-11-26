import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrders, canceledOrder } from "../../../../../redux/actions";
import styles from "./ActiveOrders.module.css";
import { Link } from "react-router-dom";
import AccountNav from "../../accountNav";


//⭐ORDENES QUE ESTAN ACTIVAS:
const ActiveOrders = () => {
  const dispatch = useDispatch();
  const activeOrders = useSelector(state => state.activeOrder);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getActiveOrders()); 
      } catch (error) {
        console.error("Error al obtener las órdenes activas👀:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleCancelOrder = (id) => {
    dispatch(canceledOrder(id));
    alert("Orden cancelada con éxito⭐");
  };

  return (
    <div>
      <div className={styles.container}>
        <AccountNav />

        <button className={styles.button2}>
          <Link to={`/dashboard/Orders/cancel`} className={styles.link}>
            Cancelled orders
          </Link>
        </button>

        <div className={styles.cardContainer}>
          <ul>
            {activeOrders?.map((order) => (
              <div key={order.id}>
                <div className={styles.cards}>
                  <li key={order.id}>
                    <Link to={`/dashboard/Orders/${order.id}`} className={styles.link}>
                      <h2>ID:{order.id}</h2>
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
                    <button onClick={() => handleCancelOrder(order.id)} className={styles.button}>
                      Cancelar Orden
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

export default ActiveOrders;