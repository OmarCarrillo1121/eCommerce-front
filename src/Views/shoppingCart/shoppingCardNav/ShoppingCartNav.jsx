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
            <span>1</span>
            <span>Shopping Cart</span>
            <span className={Style.spacer}></span>
          </span>
          <span className={Style.shoppingcart_nav_progress_info}>
            <span>2</span>
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