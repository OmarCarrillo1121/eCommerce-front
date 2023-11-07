import { useState } from "react";
import { Link } from 'react-router-dom';

import validateUser from "../../../util/validateUser/ValidateUser";
import style from "./FormUser.module.css";



const FormUser = ({ login }) =>{

    const [dataUser, setDataUser] = useState({
        email:"",
         password: ""
        });
    const [ errors, setErrors ] = useState({});

    const handleChange = (event) =>{

        const { name, value } = event.target;

        setDataUser({
            ...dataUser,
            [name]: value
        });

        const updatedData = {
            ...dataUser,
            [name]: value
        };
        setErrors(validateUser(updatedData));
    };

    const handleSubmit = ( event ) =>{
        event.preventDefault();
        login(dataUser)
    }

   


    return(

        <div className={style.container}>

            <form className={style.Form} onSubmit={handleSubmit}>

                <div className={style.grupo}>
                    <input className={style.input} type= "email" name = "email" value = {dataUser.email} onChange = {handleChange} required/>
                    <span className={style.barra}></span>
                    <label className={style.label } htmlFor = "email"> Email </label>
                    { errors.email && <p> {errors.email} </p>}
                </div>

                <div className={style.grupo}>
                    <input className={style.input} type ="password" name = "password" value = {dataUser.password} onChange = {handleChange} required/>
                    <span className={style.barra}></span>
                    <label className={style.label } htmFor = "password" > Password </label>
                    { errors.password && <p> {errors.password} </p>}
                </div>

                 <button className = {style.btn}>Entrar</button>

                 <p className = {style.p}>o</p>

                <Link to="/registro">
                    <h3>Registrarse</h3>
                </Link>
            </form>

        </div>
    )

} 

export default FormUser;