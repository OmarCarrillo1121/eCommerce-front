

const ValidateUser = (dataUser) => {

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword = /^(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/;

    let Errors = {};

    if(!dataUser.email){
        Errors.email = "el email no puede estar vacio"
    }

    if(!regexEmail.test(dataUser.email)){
        Errors.email = "El email no es valido";
    }

    if(dataUser.email.length > 30){
        Errors.email = "El email no puede superar los 30 caracteres";
    }

    if(!dataUser.password){
        Errors.password = "la contraseña no puede estar vacia";
    }

    if(!regexPassword.test(dataUser.password)){
        if (!/\d/.test(dataUser.password)) {
            Errors.password = "La contraseña debe tener al menos un número.";
        }

        if(dataUser.password.length < 6 || dataUser.password.length > 10){
            if(Errors.password){
                Errors.password += " La contraseña debe tener entre seis y diez caracteres ";
            } else{
                Errors.password = "La contraseña debe tener entre seis y diez caracteres ";
            }
        }
    }

    return Errors;

}

export default ValidateUser;