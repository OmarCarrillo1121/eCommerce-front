import React from 'react'
import Style from './responsiveNav.module.css'
import { useNavigate, NavLink } from 'react-router-dom'
import { useHandle } from '../../../util/hook/common/useHandle'
import ExtendedNav from './extendedNav/extendedNav'
import Search from '../../Search/Search'
import categoryIcon from '../../../Assets/img/icon/menu/categoria.png'
import logo from '../../../Assets/img/icon/nav/logo.png'

export default function ResponsiveNav () {
  const { handle, handleChange } = useHandle()
    const navigate = useNavigate()
    return (
      <div>
        <header className={Style.scrolled_nav}>
        <NavLink to={'/'}>
          <img src={logo} alt="logo" className={Style.nav_logo}/>
        </NavLink>
        <Search/>
        <div className={Style.nav_icon}>
          <img src={categoryIcon} alt="category" onClick={() => navigate('/catalogo')}/>
          <button className={Style.nav_extend} onClick={handleChange}>≡</button>
        </div>
      </header> 
      {!handle && <ExtendedNav handleChange={handleChange}/>}
      </div>
    )
}