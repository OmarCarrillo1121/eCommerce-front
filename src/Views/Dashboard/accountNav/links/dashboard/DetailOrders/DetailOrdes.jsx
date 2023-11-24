import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getByIdOrders, resetDetailOrders } from "../../../../../../redux/actions";


import styles from "./DetailOrders.module.css";


const DetailOrdes = () => {//DetailOrdes
    const [localOrders, setLocalOrders] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (id) {
        dispatch(getByIdOrders(id)).then((data) => {
          setLocalOrders(data.payload);
        });
      }
  
      return () => {
        dispatch(resetDetailOrders());
      };
    }, [dispatch, id]);
  
    return (
      <div className={styles.container}>
        <div>
        <button className={styles.button2}>
      <Link to={`/dashboard/Orders/active`}>
    Active orders
        </Link>
      </button>
          <div>
            <img alt="" />
          </div>
          <div>
            <ul>
              {/* Solo hay un detalle de pedido, no es necesario usar map */}
              <div key={localOrders.order}>
                <li>
                  <div className={styles.cards}>

                  <p> ORDER ID: {localOrders.order} </p>
                  
                  <p>Date: {localOrders.date}</p>
                 {/* <p> Cancelled: {localOrders.cancelled}</p> */}
                  <p>User ID: {localOrders.userId}</p>
                  <p>Amount: {localOrders.amount}</p>
                  <p>Products:</p>
                  <ul>
                    {localOrders.products &&
                      localOrders.products.map((product) => (
                        <li key={product.id}>
                          <p>Name: {product.name}</p>
                          <p>Price: {product.price}</p>
                          <img src={product.image} alt="" className={styles.image} />
                        </li>
                      ))}
                  </ul>
                </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default DetailOrdes;