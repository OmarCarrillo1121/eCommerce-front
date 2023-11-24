// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrderCancelled, restoreOrder } from "../../../../../redux/actions";
// import styles from "./CancelledOrders.module.css"; // Ajusta la ruta según tu estructura de carpetas

// const CancelledOrders = () => {
//   const [cancelledOrders, setCancelledOrders] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getOrderCancelled()).then((data) => {
//       setCancelledOrders(data.payload);
//     });
//   }, [dispatch]);

//   const handleRestoreOrder = (orderId) => {
//     dispatch(restoreOrder(orderId));
//     alert("Orden restaurada con exito!");
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Órdenes Canceladas</h1>
//       <h2>Lista de Órdenes Canceladas</h2>

//       <ul>
//         {cancelledOrders.map((order) => (
//           <div key={order.orderId}>
//             <div className={styles.cards}>
//               <li key={order.orderId}>
//                 <h2>ID:{order.order}</h2>
//                 <p>User ID: {order.userId}</p>
//                 <p>Amount: {order.amount}</p>
//                 <p>Products:</p>
//                 <ul>
//                   {order.products.map((product) => (
//                     <li key={product.productId}>
//                       <p>Name: {product.name}</p>
//                       <p>Price: {product.price}</p>
//                     </li>
//                   ))}
//                 </ul>
//                 <button onClick={() => handleRestoreOrder(order.order)}>
//                   Restaurar Orden
//                 </button>
//               </li>
//             </div>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CancelledOrders;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderCancelled, restoreOrder } from "../../../../../redux/actions";
import styles from "./CancelledOrders.module.css";
import { Link } from "react-router-dom";
import AccountNav from "../../accountNav";
import ActiveOrders from "../ActiveOrders/ActiveOrders";

//⭐ORDENES QUE ESTAN CANCELADAS Y QUIERO RESTAURAR:

//const CancelledOrders = () => {
//    const [cancelledOrders, setCancelledOrders] = useState([]); //⭐
 
//   const dispatch = useDispatch();


// //codigo que funciona:
//      useEffect(() => {
//        dispatch(getOrderCancelled()).then((data) => {
//          setCancelledOrders(data.payload);
//         // dispatch(getOrderCancelled());//AGREGADO
//        });
//    }, [dispatch]);//cancelledOrders⭐



//    const handleRestoreOrder = (orderId) => {
//       dispatch(restoreOrder(orderId));
//       // Actualiza el estado local después de restaurar la orden
//      setCancelledOrders(cancelledOrders.filter((id) => id !== orderId));
//      alert("Orden restaurada con éxito!");
//     };


//   //❤
//   const dispatch = useDispatch();
//   const cancelledOrders = useSelector(state => state.canceledOrder);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(getOrderCancelled()); 
//       } catch (error) {
//         console.error("Error al obtener las órdenes activas👀:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleRestoreOrder = (id) => {
//     dispatch(restoreOrder(id));
//     alert("Orden cancelada con éxito⭐");
//   };

    
  
//     // Resto del código del componente
//     console.log("cancelledOrders:", cancelledOrders);

//   return (

// <div>
//     <div className={styles.container}>
     
// <AccountNav/>

//       <button className={styles.button2}>
//       <Link to={`/dashboard/Orders/active`}>
//     Active orders
//         </Link>
//       </button>

//       <div className={styles.cardContainer}>
//       <ul>
//         {cancelledOrders.map((order) => (
//           <div key={order.id}>
//             <div className={styles.cards}>
//               <li key={order.order}>
//               <Link to={`/dashboard/Orders/${id}`} className={styles.link}>
//                 <h2>ID:{order.id}</h2>
//                   </Link>
//                 <p>User ID: {order.userId}</p>
//                 <p>Amount: {order.amount}</p>
//                 <p>Products:</p>
//                 <ul>
//                   {order.products.map((product) => (
//                     <li key={product.id}>
//                       <p>Name: {product.name}</p>
//                       <p>Price: {product.price}</p>
//                     </li>
//                   ))}
//                 </ul>
//                 <button onClick={() => handleRestoreOrder(order.id)} className={styles.button}>
//                   Restore order
//                   </button>
//               </li>
//             </div>
//           </div>
//         ))}
//       </ul>
//       </div>
//     </div>
//    </div>
//   );
// };

// export default CancelledOrders;

const CancelledOrders = () => {
  const dispatch = useDispatch();
  const cancelledOrders = useSelector((state) => state.canceledOrder);

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

  const handleRestoreOrder = (id) => {
    dispatch(restoreOrder(id));
    alert("Orden restaurada con éxito⭐");
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
            {cancelledOrders.map((order) => (
              <div key={order.id}>
                <div className={styles.cards}>
                  <li key={order.order}>
                    <Link to={`/dashboard/Orders/${order.id}`} className={styles.link}>
                      <h2>ID: {order.id}</h2>
                    </Link>
                    <p>User ID: {order.userId}</p>
                    <p>Amount: {order.amount}</p>
                    <p>Products:</p>
                    <ul>
                      {order.products.map((product) => (
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