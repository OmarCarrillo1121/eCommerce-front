import React from "react";
import Style from './accountNav.module.css'
import userIcon from '../../../Assets/img/icon/dashboard/usuario.png'
import dashIcon from '../../../Assets/img/icon/dashboard/tablero.png'
import shops from '../../../Assets/img/icon/dashboard/shopping.png'
import { Links, DashBoardCloseLogout, DashboardUserInfo } from "./accountNavComponents/navComponents";
import { useLocation } from 'react-router-dom'
import { Dashboard } from "./links/dashboard/Dashboard";
import Insights from "./links/insights/Insights";

const AccountNav = () => {
  const locateDashboard = useLocation().pathname.includes(`/dashboard/dashboard`)
  const locateInsights = useLocation().pathname.includes('/dashboard/insights')

  return (<>
    <nav className={Style.dashboard_nav}>
     <DashboardUserInfo/>
     <div className={Style.dashboard_nav_links}>
       {/*<Links url={'account'} img={userIcon} name={'Account'}/>*/}
       {/*<Links url={'dashboard'} img={dashIcon} name={'DashBoard'}/>*/}
       {/*<Links url={'settings'} img={settingIcon} name={'Settings'}/>*/}
       <Links url={'dashboard'} img={userIcon} name={'DashBoard'}/>
       <Links url={'Orders/active'} img={shops} name={'Orders'}/>
       {/*<Links url={'shops'} img={shops} name={'Shops'}/>*/}
       <Links url={'insights'} img={dashIcon} name={'Insights'}/>
       <DashBoardCloseLogout/>
     </div>
    </nav>
    <main className={Style.containerDashboard}>
      { locateDashboard ? <Dashboard/> : null}
      { locateInsights ? <Insights/> : null}
    </main>
    </>
   )
  }


export default AccountNav