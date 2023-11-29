import React, { useEffect } from "react";
import Style from './navComponents.module.css'
import { useLocation, NavLink, useNavigate  } from "react-router-dom";
import userFirsIcon from '../../../../Assets/img/icon/nav/login.png'
import logoutIcon from '../../../../Assets/img/icon/dashboard/close.png'
import closeIcon from '../../../../Assets/img/icon/dashboard/closed.png'
   
export const Links = ({ url, img, name}) => {
    const locate = useLocation().pathname.includes(`/dashboard/${url}`)

    return (<>
        <NavLink to={`/dashboard/${url}`}>
          <div className={`${locate ? Style.dashboard_link_not : Style.dashboard_link}`}>
              <img src={img} alt="icon"/>
              <h2>{name}</h2>
          </div>
        </NavLink>
        </>
    )
}

export const DashboardUserInfo = () => {
    return (
      <div className={Style.dashboard_nav_user}>
        <img src={userFirsIcon} alt="user" width={70}/>
        <div className={Style.dashboard_nav_user_info}>
         <h2>UserName</h2>
         <h2>email@gmail.com</h2>
        </div>
      </div>
    )   
}

export const DashBoardCloseLogout = () => {
    const navigate = useNavigate()
    return (
      <div onClick={() => console.log('logout')}>
        <div style={{position: 'absolute', bottom: 0, left: 0}}>
            <Links img={logoutIcon} name={'Cerrar sesión'}/>
        </div>
        <div style={{position: 'absolute', bottom: 0, right: 10 + 'px'}} onClick={() => navigate('/')}>
            <Links img={closeIcon} name={'Cerrar'}/>
        </div>
      </div>
    )
}