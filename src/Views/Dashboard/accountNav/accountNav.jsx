import React from "react";
import Style from './accountNav.module.css'
import userIcon from '../../../Assets/img/icon/dashboard/usuario.png'
import dashIcon from '../../../Assets/img/icon/dashboard/tablero.png'
import shops from '../../../Assets/img/icon/dashboard/shopping.png'
import { Links, DashBoardCloseLogout, DashboardUserInfo } from "./accountNavComponents/navComponents";
import { useLocation } from 'react-router-dom'
import { Dashboard } from "./links/dashboard/Dashboard";
import Insights from "./links/insights/Insights";
import ActiveOrders from "./links/ActiveOrders/ActiveOrders";
import CancelledOrders from './links/CancelledOrders/CancelledOrders'

const AccountNav = () => {
  const locateDashboard = useLocation().pathname.includes(`/dashboard/dashboard`)
  const locateInsights = useLocation().pathname.includes('/dashboard/insights')
  const locateOrdersAc = useLocation().pathname.includes('/dashboard/Orders/active')
  const locateOrderCan = useLocation().pathname.includes('/dashboard/Orders/cancel')

  return (<>
    <nav className={Style.dashboard_nav}>
     <DashboardUserInfo/>
     <div className={Style.dashboard_nav_links}>
       <Links url={'dashboard'} img={userIcon} name={'DashBoard'}/>
       <Links url={'Orders/active'} img={shops} name={'Ordenes'}/>
       <Links url={'insights'} img={dashIcon} name={'Estadísticas'}/>
       <DashBoardCloseLogout/>
     </div>
    </nav>
    <main className={Style.containerDashboard}>
      { locateDashboard ? <Dashboard/> : null}
      { locateInsights ? <Insights/> : null}
      { locateOrdersAc ? <ActiveOrders/> : null} 
      { locateOrderCan ? <CancelledOrders/> : null}
    </main>
    </>
   )
  }


export default AccountNav