import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrdersByUserId, resetDetailOrders } from "../../../redux/actions";
import style from "./OrderHis.module.css"

const OrderHis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderUser = useSelector(state => state.orderUser);

  useEffect(() => {
    if (id) {
      dispatch(getOrdersByUserId(id));
    }

    return () => {
      dispatch(resetDetailOrders());
    };
  }, [dispatch, id]);

  return (
      <div className={style.container}>
        <div className={style.cards}>

          <h2>Historial de Compras:</h2>
        </div>
          <div className={style.cardContainer}>
          {orderUser.map((order) => (
              <div key={order.id} >
                <div className={style.cards}>

                 <p>Date: {new Date(order.date).toLocaleString()}</p>
                 <p>Total Amount: ${order.amount}</p>
                 <p>Number of Products: {order.products.length}</p>
                 <div>
                     <h3>Products:</h3>
                     {order.products.map((product) => (
                       <div key={product.id}>
                             <p>Name: {product.name}</p>
                             <p>Price: ${product.price}</p>
                             <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }}className={style.imageInfo} />
                         </div>
                     ))}
                 
                 </div>
                 
                 
                 
              </div>
                     </div>
          ))}
          </div>
      </div>
  );
};

export default OrderHis;