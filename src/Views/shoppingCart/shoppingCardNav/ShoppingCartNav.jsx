import React from 'react'
import Style from './shoppingCartNav.module.css'
import logo from '../../../Assets/img/icon/nav/logo.png'
import { useParams } from 'react-router-dom'

export default function ShoppingCartNav () {
  const { id } = useParams()
    return (
      <header className={Style.shoppingcart_nav}>
        <img src={logo} alt="logo" />
        <nav className={Style.shoppingcart_nav_progress}>
          <span className={Style.shoppingcart_nav_progress_info}>
            <span style={{borderColor: '#E6541B'}}>1</span>
            <span>Shopping Cart</span>
            <span style={{backgroundColor: `${id === 'payment' && '#E6541B'}`}}></span>
          </span>
          <span className={Style.shoppingcart_nav_progress_info}>
            <span style={{borderColor: `${id === 'payment' && '#E6541B'}`}}>2</span>
            <span>Payment</span>
            <span></span>
          </span>
          <span className={Style.shoppingcart_nav_progress_info}>
            <span>3</span>
            <span>Game activation</span>
          </span>
        </nav>
        <span>_</span>
      </header>
    )
}