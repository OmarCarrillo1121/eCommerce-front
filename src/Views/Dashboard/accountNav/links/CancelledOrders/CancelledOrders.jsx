import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByIdOrders, getOrderCancelled, restoreOrder, setCurrentPage } from "../../../../../redux/actions";
import styles from "./CancelledOrders.module.css";
import { Link, NavLink } from "react-router-dom";
import AccountNav from "../../accountNav";
import userIcon from  "../../../../../Assets/img/icon/dashboard/usuario.png"
import dashIcon from "../../../../../Assets/img/icon/dashboard/tablero.png"
import shops from "../../../../../Assets/img/icon/dashboard/shopping.png"
import { DashBoardCloseLogout, DashboardUserInfo, Links } from "../../accountNavComponents/navComponents";
import Pagination from "../dashboard/pagination/Pagination";
//import ActiveOrders from "../ActiveOrders/ActiveOrders";

//⭐ORDENES QUE ESTAN CANCELADAS Y QUIERO RESTAURAR:
const CancelledOrders = () => {
  const dispatch = useDispatch();
  const {canceledOrder, currentPage, detailOrders} = useSelector((state) => state);

  const ordersPerPage = 10;
  const totalOrders = canceledOrder.length

  const firstIndex = ordersPerPage * (currentPage - 1)
  const lastIndex = firstIndex + ordersPerPage

  let currentPageData = canceledOrder.slice(firstIndex, lastIndex)

  const [info, setInfo] = useState(false)
  const [changeOrder, setChangeOrder] = useState({})

  const onPageChange  = (pageNum) => {
      dispatch(setCurrentPage(pageNum))
  }



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
  
  const ChangeDate = (date) => {
    const fecha = new Date(date);

    // Obtener componentes de fecha
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, así que sumamos 1
    const día = fecha.getDate();

    // Crear una cadena de fecha en el formato deseado (por ejemplo, "dd/mm/aaaa")
    const fechaFormateada = `${día}/${mes}/${año}`;
    return fechaFormateada
  }
  const changedDate = (date) => {
    let fecha = new Date(date);

    // Restar 3 horas a la fecha
    fecha.setUTCHours(fecha.getUTCHours() - 3);

    // Obtener los componentes de la fecha después de restar 3 horas
    let dia = fecha.getUTCDate();
    let mes = fecha.getUTCMonth() + 1; // Los meses van de 0 a 11
    let anio = fecha.getUTCFullYear();
    let horas = fecha.getUTCHours();
    let minutos = fecha.getUTCMinutes();
    let segundos = fecha.getUTCSeconds();

    // Agregar ceros a la izquierda si es necesario
    dia = dia < 10 ? "0" + dia : dia;
    mes = mes < 10 ? "0" + mes : mes;
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Formatear la fecha como desees
    let fechaFormateada = " " + dia + "-" + mes + "-" + anio + " a las " + horas + ":" + minutos + ":" + segundos;
    return fechaFormateada
}

  const openInfo = (order) => {
    // dispatch(getByIdOrders(order.id))
    setChangeOrder(order)
    setInfo(true)
  }

  const closeInfo = () => {
    setInfo(false)
    setChangeOrder({})
  }

  return (<>
    <div className={styles.container}>
      {/* ASIDE */}
      <aside>
        <DashboardUserInfo/>
        <div className={styles.containerLinks}>
          <Links url={'dashboard'} img={userIcon} name={'DashBoard'}/>
          <Links url={'Orders/cancel'} img={shops} name={'Ordenes'}/>
          <Links url={'insights'} img={dashIcon} name={'Estadísticas'}/>
        </div>
        <DashBoardCloseLogout/>
      </aside>
      {/* MAIN */}
      <div className={styles.containerMain}>
        <nav>
          <h1>Sección de Ordenes</h1>
        </nav>
        <div className={styles.containerTable}>
          <h2>Ordenes Canceladas</h2>
          <NavLink className={styles.verOtras} to={`/dashboard/Orders/active`}>Ver Ordenes activas</NavLink>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Id del Usuario</th>
                <th className={styles.productTh}>Productos</th>
                <th>Fecha</th>
                <th>Monto total</th>
                <th>Activar Orden</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData?.map((order, index) => {
                const rowClass = index % 2 === 0 ? styles['rowEven'] : styles['rowOdd']
                
                return(
                <tr className={`${styles.row} ${rowClass}`} key={order.id}>
                  <th><button onClick={() => openInfo(order)} className={styles.openInfo}>⁝</button></th>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td className={styles.productTh}>{order.products.length}</td>
                  <td>{ChangeDate(order.date)}</td>
                  <td>$ {order.amount}</td>
                  <td><button onClick={() => handleRestoreOrder(order.id)}>X</button></td>
                </tr>
              )})}
            </tbody>
          </table>
          <Pagination
            totalUsers={totalOrders}
            currentPage={currentPage}
            pageSize={ordersPerPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      {
        info && <div className={styles.overlay}>
        <div className={styles.containerOrder}>
            <button className={styles.closeInfoOrder} onClick={closeInfo}>X</button>
            <div className={styles.containerText}>
                <h2>{changeOrder.products.length > 1 ? 'Compras realizadas': 'Compra realizada'}</h2>
                <b>Id: {changeOrder.id}</b>
            </div>
            <div className={styles.productsContainer}>
                <div className={styles.containerProductMax}>
                    {
                        changeOrder.products.map((product) => {
                            let amount = (product.discount/100) * product.price
                            let totalAmount = product.price - amount

                            return (<div className={styles.cardProduct}>
                                <img src={product.image} alt={product.name} />
                                <span className={styles.productDiscount}>-{product.discount}%</span>
                                <div className={styles.containerproductxxx}>
                                    <span className={styles.productName}>{product.name}</span>
                                    <div className={styles.precio}>
                                        <p>Precio $:</p>
                                        <div className={styles.priceAmount}>
                                            <span className={styles.productPrice}>Antes: ${product.price}</span>
                                            <span className={styles.productAmount}>Ahora: ${totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <p className={styles.dateOrder}> La compra se realizó el 
                    {
                        changedDate(changeOrder.date)
                    }
                </p>
                <small className={styles.amountOrder}>Monto total de la compra: <b>{changeOrder.amount}</b></small>
            </div>
            </div>
        </div>
      }
    </div>
  </>);
};

export default CancelledOrders;