export const validation = (user) => {
    const error = {}

    //REGEX 
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,3}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
   // const addressRegex = /^[a-zA-Z0-9\s]+$/; 
   // const imageRegexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
   // const regexUrl = new RegExp(imageRegexUrl);

    // NAME 
    if(user.name && !nameRegex.test(user.name)) {
        error.name = "EL nombre contiene caracteres invalidos."
    }
    if(user.name && user.name.length > 30) {
        error.name = "Máximo de caracteres alcanzado."
    }
    if(user.name && user.name.length < 5) {
        error.name = "El mínimo son 5 caracteres."
    }
    if(user.name.length === 0) {
        error.name = "Debe agregar un nombre."
    }

    // EMAIL 
    if(user.email && !emailRegex.test(user.email)) {
        error.email = "Email invalido"
    }
    if(user.email && user.email.length > 40) {
        error.email = "Máximo de caracteres alcanzado."
    }
    if(user.email && user.email.length < 13) {
        error.email = "El mínimo son 13 caracteres."
    }
    if(user.email.length === 0) {
        error.email = "Debe agregar un email."
    }

    // ADDRESS 
    // if(user.address && addressRegex.test(user.address)) {
    //     error.address = "La dirección contiene caracteres invalidos"
    // }
    if(user.address && user.address.length < 5) {
        error.address = "El mínimo son 10 caracteres."
    }
    if(user.address && user.address.length > 30) {
        error.address = "Máximo de caracteres alcanzado."
    }

    // IMAGE 
    //if(user.image && !user.image.match(regexUrl)){
       // error.image = "El URL de la imagen es invalido."
   // }


    return error;
}