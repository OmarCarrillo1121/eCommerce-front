import { useState } from "react";
import validateUser from "../../../util/validateUser/ValidateUser";


const FormUser = ({ login }) =>{
    const [dataUser, setdataUser] = useState({
        email:"",
         password: ""
        });
    const [ Errors, setErrors ] = useState({});

    const handleChange = (event) =>{
        setdataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        })

        setErrors(validateUser({
            ...dataUser,
            [event.target.name]: event.target.value

        }))
    }

    const handleSubmit = ( event ) =>{
        event.preventDefault();
        login(dataUser)
    }


    return(

        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <input type= "email" name = "email" value = {dataUser.email} onChange = {handleChange} required/>
                    <spam></spam>
                    { Errors.email && <p> {Errors.email} </p>}
                    <label  htmlFor = "email"> Email </label>
                </div>

                <div>
                    <input  type ="password" name = "password" value = {dataUser.password} onChange = {handleChange} required/>
                    <spam></spam>
                    { Errors.password && <p> {Errors.password} </p>}
                    <label htmForm = "password" > Password </label>
                </div>
            
                <button>Entrar</button>

            </form>

        </div>
    )

} 

export default FormUser;