import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderCancelled, restoreOrder, setCurrentPage } from "../../../../../redux/actions";
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
  const {canceledOrder, currentPage} = useSelector((state) => state.canceledOrder);

  const ordersPerPage = 10;
  const totalOrders = canceledOrder.length

  const firstIndex = ordersPerPage * (currentPage - 1)
  const lastIndex = firstIndex + ordersPerPage

  let currentPageData = canceledOrder.slice(firstIndex, lastIndex)


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

  return (
    <div className={styles.container}>
      {/* ASIDE */}
      <aside>
        <DashboardUserInfo/>
        <div className={styles.containerLinks}>
          <Links url={'dashboard'} img={userIcon} name={'DashBoard'}/>
          <Links url={'Orders/active'} img={shops} name={'Ordenes'}/>
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
                <th>Productos</th>
                <th>Fecha</th>
                <th>Monto total</th>
                <th>Activar Orden</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData?.map((order, index) => {
                const rowClass = index % 2 === 0 ? styles['rowEven'] : styles['rowOdd']
                const rowClassChange = index % 2 === 0 ? styles['rowOdd'] : styles['rowEven']
                return(
                <tr className={`${styles.row} ${rowClass}`} key={order.id}>
                  <th>⁝</th>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>
                    <select className={`${styles.rowChange} ${rowClassChange}`}>
                      {
                        order.products.map((product, index)=> {
                          return index === 0 ? <option selected>{product.name}</option> : <option>{product.name}</option>
                        })
                      }
                    </select>
                  </td>
                  <td>{ChangeDate(order.date)}</td>
                  <td>{order.amount}$</td>
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
    </div>
  );
};

export default CancelledOrders;