import React from "react";
import Style from './register.module.css'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { useField } from '../../util/hook/form/useField'

export default function Register ({ handleChange }) {
    // las variables de useField tienen la propiedad value y onChange, para acceder a sus valores o modificarlos, por ej: emanil.value o userName.onChange
    const userName = useField({type: 'user'})
    const email = useField({type: 'email'})
    const password = useField({type: 'password'})
    const adress = useField({type: 'adress'})
    return (
        <div className={Style.form_register}>
            <h1>Register</h1>
            <div className={Style.form_register_inp}>
                <Input userInfo={userName} name={'User Name'} width={250}/>
                <Input userInfo={email} name={'Email Adress'} width={250}/>
                <Input userInfo={password} name={'Password'} width={250}/>
                <Input userInfo={adress} name={'Adress'} width={250}/>
                <div className={Style.form_register_button}>
                    <Button children={'Atras'} onClick={handleChange}/>
                    <Button children={'Register'} onClick={() => console.log('register')}/>
                </div>
            </div>
        </div>
    )
}