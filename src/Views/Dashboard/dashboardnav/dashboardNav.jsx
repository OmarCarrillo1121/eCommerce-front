import React from "react";
import Style from './dashBoardNav.module.css'
import userIcon from '../../../Assets/img/icon/dashboard/usuario.png'
import dashIcon from '../../../Assets/img/icon/dashboard/tablero.png'
import shops from '../../../Assets/img/icon/dashboard/shopping.png'
import settingIcon from '../../../Assets/img/icon/dashboard/settings.png'
import { Links, DashBoardCloseLogout, DashboardUserInfo } from "./dashboardNavComponents/dashComponents";

const DashBoardNav = () => {
  return (
    <nav className={Style.dashboard_nav}>
     <DashboardUserInfo/>
     <div className={Style.dashboard_nav_links}>
       <Links url={'account'} img={userIcon} name={'Account'}/>
       <Links url={'shops'} img={shops} name={'Shops'}/>
       <Links url={'dashboard'} img={dashIcon} name={'DashBoard'}/>
       <Links url={'settings'} img={settingIcon} name={'Settings'}/>
       <DashBoardCloseLogout/>
     </div>
    </nav>
   )
  }


export default DashBoardNav