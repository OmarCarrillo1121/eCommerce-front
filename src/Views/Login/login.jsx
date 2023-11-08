import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../../util/hook/form/useField'
import Input from '../../components/input/input'
import logo from '../../Assets/img/icon/nav/logo.png'
import Button from '../../components/button/button'
import Middle from './middle/middle'
import Services from './services/services'
import Style from './login.module.css'

export default function Login () {
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const email = useField({type: 'email'})
    const password = useField({type: 'password'})

    return (
      <form autoComplete='off' className={Style.form}>
        <img src={logo} alt="logo" className={Style.form_logo} />
        <section className={Style.form_login}>
          <Services/>
          <article className={Style.form_interface}>
            <Middle/>
            <Input userInfo={email} name='Email Adress'/>
            <Input userInfo={password} name='Password'/>
            <Button onClick={() => console.log('register')} children={'Register'}/>
            <Button onClick={() => console.log('register')} children={'Login'}/>
          </article>
        </section>
        <section className={Style.form_img}>
          <span className={Style.form_exit_button} onClick={() => navigate('/')}>X</span>
        </section>
      </form>
    )
}