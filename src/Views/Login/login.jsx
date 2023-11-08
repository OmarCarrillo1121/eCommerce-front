import React from 'react'
import Style from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { useField } from '../../util/hook/form/useField'
import { useHandle } from '../../util/hook/common/useHandle'
import Register from '../register/register'
import Input from '../../components/input/input'
import logo from '../../Assets/img/icon/nav/logo.png'
import Button from '../../components/button/button'
import Middle from './middle/middle'
import Services from './services/services'

export default function Login () {
    const navigate = useNavigate()
    const { handle, handleChange } = useHandle()
    const email = useField({type: 'email'})
    const password = useField({type: 'password'})

    return (
      <form autoComplete='off' className={Style.form}>
        <img src={logo} alt="logo" className={Style.form_logo} />
        { handle 
        ? <section className={Style.form_login}>
          <Services/>
          <article className={Style.form_interface}>
            <Middle/>
            <Input userInfo={email} name='Email Adress' width={500}/>
            <Input userInfo={password} name='Password'/>
            <Button onClick={handleChange} children={'Register'}/>
            <Button onClick={() => console.log('register')} children={'Login'}/>
          </article>
        </section>
        : <Register handleChange={handleChange}/>}
        <section className={Style.form_img}>
          <span className={Style.form_exit_button} onClick={() => navigate('/')}>X</span>
        </section>
      </form>
    )
}