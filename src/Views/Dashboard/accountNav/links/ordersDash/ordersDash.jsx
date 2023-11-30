import React, { useState, useEffect } from "react";
import {  useDispatch } from 'react-redux';
import { getOrders, canceledOrder } from "../../../../../redux/actions";
import styles from "./ordersDash.module.css"
import { Link } from "react-router-dom";

//❌❌

const Orders = () => {
  const [localOrders, setLocalOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders()).then((data) => {
      setLocalOrders(data.payload);
    });
  }, [dispatch]);

  const handleCancelOrder = (orderId) => {
    dispatch(canceledOrder(orderId));
  };

  return (
    <div className={styles.container}>
      {/* <h1>Estoy en orders!</h1>


      
      <h2>Order List</h2>

      <ul>
        {localOrders.map((order) => (
          <div key={order.orderId}>
            <Link to={`/dashboard/Orders/${order.order}`}>
              <div className={styles.cards}>
                <li key={order.orderId}>
                  <h2>ID:{order.order}</h2>
                  
                  <p>User ID: {order.userId}</p>
                  <p>Amount: {order.amount}</p>
                  <p>Products:</p>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.productId}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        {/* Otras propiedades del producto */}
                      {/* </li>
                    ))}
                  </ul>
                  {!order.cancelled && (
                    <button onClick={() => handleCancelOrder(order.order)}className={styles.button}>
                      Cancelar Orden
                    </button>
                  )}
                </li>
              </div>
            </Link>
          </div>
        ))} */}
      {/* </ul> */}
    </div>
  );
};

export default Orders;
