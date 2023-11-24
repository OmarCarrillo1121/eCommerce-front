import React from "react";
import Style from './accountNav.module.css'
import userIcon from '../../../Assets/img/icon/dashboard/usuario.png'
import dashIcon from '../../../Assets/img/icon/dashboard/tablero.png'
import shops from '../../../Assets/img/icon/dashboard/shopping.png'
import settingIcon from '../../../Assets/img/icon/dashboard/settings.png'
import { Links, DashBoardCloseLogout, DashboardUserInfo } from "./accountNavComponents/navComponents";
import { useLocation } from 'react-router-dom'
import { Dashboard } from "./links/dashboard/Dashboard";

const AccountNav = () => {
  const locate = useLocation().pathname.includes(`/dashboard/dashboard`)

  return (<>
    <nav className={Style.dashboard_nav}>
     <DashboardUserInfo/>
     <div className={Style.dashboard_nav_links}>
       <Links url={'account'} img={userIcon} name={'Account'}/>
       <Links url={'Orders/active'} img={shops} name={'Orders'}/>
       <Links url={'dashboard'} img={dashIcon} name={'DashBoard'}/>
       <Links url={'settings'} img={settingIcon} name={'Settings'}/>
       <DashBoardCloseLogout/>
     </div>
    </nav>
    <main className={Style.containerDashboard}>
      { locate ? <Dashboard/> : null}
    </main>
    </>
   )
  }


export default AccountNav