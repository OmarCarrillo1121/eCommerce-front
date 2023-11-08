import React from 'react'
import Style from './input.module.css'

const Input = ({ userInfo, name, error }) => {
    return (
    <div className={Style.group}>
        <input {...userInfo} name={name} id={name} className={Style.input} placeholder=' ' />
        <label htmlFor={name} className={Style.label} >{name}</label>
        <span>{error}</span>
    </div>
    
  )

}

export default Input