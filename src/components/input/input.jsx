import React from 'react'
import Style from './input.module.css'

const Input = ({ userInfo, name, error, width }) => {
    return (
    <div className={Style.group}>
        <input 
        {...userInfo} 
        name={name} 
        id={name} 
        className={Style.input} 
        placeholder=' ' 
        style={{width: `${width}px`}}/>
        <label htmlFor={name} className={Style.label} >{name}</label>
        <span>{error}</span>
    </div>
    
  )

}

export default Input