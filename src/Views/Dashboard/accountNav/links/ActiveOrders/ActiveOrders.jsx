import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrders, canceledOrder, setCurrentPage } from "../../../../../redux/actions";
import styles from "./ActiveOrders.module.css";
import { Link, NavLink } from "react-router-dom";
import AccountNav from "../../accountNav";
import Account from "../../../account";
import userIcon from  "../../../../../Assets/img/icon/dashboard/usuario.png"
import dashIcon from "../../../../../Assets/img/icon/dashboard/tablero.png"
import shops from "../../../../../Assets/img/icon/dashboard/shopping.png"
import { DashBoardCloseLogout, DashboardUserInfo, Links } from "../../accountNavComponents/navComponents";
import Pagination from "../dashboard/pagination/Pagination";


//⭐ORDENES QUE ESTAN ACTIVAS:
const ActiveOrders = () => {
  const dispatch = useDispatch();
  const { activeOrder, currentPage } = useSelector(state => state);


  const ordersPerPage = 10;
  const totalOrders = activeOrder.length

  const firstIndex = ordersPerPage * (currentPage - 1)
  const lastIndex = firstIndex + ordersPerPage

  let currentPageData = activeOrder.slice(firstIndex, lastIndex)


  const onPageChange  = (pageNum) => {
      dispatch(setCurrentPage(pageNum))
  }

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
          <h2>Ordenes Activas</h2>
          <NavLink className={styles.verOtras} to={`/dashboard/Orders/cancel`}>Ver Ordenes canceladas</NavLink>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Id del Usuario</th>
                <th>Productos</th>
                <th>Fecha</th>
                <th>Monto total</th>
                <th>Cancelar Orden</th>
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
                  <td><button onClick={() => handleCancelOrder(order.id)}>X</button></td>
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

export default ActiveOrders;