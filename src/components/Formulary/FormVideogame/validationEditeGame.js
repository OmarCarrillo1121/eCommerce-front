export const validation = (videogame) => {
    const error = {}

    /* REGEX */
    const nameRegex = /^(?:(?!\s{4})[^\s])*(?:\s[^\s]*){0,3}\s?$/
    const genreRegex = /^[^\s]*$/
    const descriptionRegex = /^(?:(?!\s{5})[^\s])*(?:\s[^\s]*){0,100}\s?$/
    const developerRegex = /^([^A-Za-z]+\s){3,}/;
    const numberRegex = /^[^0-9]+$/    ;
    const imageRegexUrl = /https?:\/\/[^\s]+\.(png|jpg|gif|svg)/;
    const regexUrl = new RegExp(imageRegexUrl)

    /* NAME */
    if(videogame.name && !nameRegex.test(videogame.name)) {
        error.name = "Contiene caracteres inválidos."
    }
    if(videogame.name && videogame.name.length > 30) {
        error.name = "Debe contener menos de 30 caracteres."
    }
    if(videogame.name && videogame.name.length < 5) {
        error.name = "Debe contener al menos 5 caracteres."
    }
    if(videogame.name.length === 0) {
        error.name = "El campo no puede estar vacio."
    }
    
    /* DESCRIPTION */
    if(videogame.description && !descriptionRegex.test(videogame.description)) {
        error.description = "Contiene caracteres inválidos."
    }
    if(videogame.description && videogame.description.length > 400) {
        error.description = "Debe contener menos de 400 caracteres."
    }
    if(videogame.description && videogame.description.length < 50 && videogame.description.length > 0) {
        error.description = "Debe contener al menos 50 caracteres."
    }
    if(videogame.description.length === 0) {
        error.description = "El campo no puede estar vacio."
    }

    /* DEVELOPER */
    if(videogame.developer && developerRegex.test(videogame.developer)) {
        error.developer = "Contiene caracteres inválidos."
    }
    if(videogame.developer && videogame.developer.length > 30) {
        error.developer = "Debe contener menos de 30 caracteres."
    }
    if(videogame.developer.length === 0) {
        error.developer = "El campo no puede estar vacio."
    }
    
    
    /* IMAGE */
    if(videogame.image && !videogame.image.match(regexUrl)){
        error.image = "URL inválido."
    }
    
    /* GENRE */
    if(videogame.genre && !genreRegex.test(videogame.genre)) {
        error.genre = "Contiene caracteres inválidos."   
    }
    if(videogame.genre.length === 0) {
        error.genre = "El campo no puede estar vacio."
    }
    if(videogame.genre && videogame.genre.length > 20) {
        error.genre = "Máximo de caracteres superados."
    }
    
    /* PLATFORM */
    if(videogame.platform && videogame.platform.length === 0) {
        error.platform = "Must select one platform."
    }
    
    /* PRICE */
    if(videogame.price && numberRegex.test(videogame.price)){
        error.price = "El precio debe contener solo números."
    }
    if(videogame.price && videogame.price < 10){
        error.price = "El precio debe ser mayor a $10."
    }
    if(videogame.price && videogame.price > 1000){
        error.price = "The value cannot be greater than 1000."
    }

    /* STOCK */
    if(videogame.stock && numberRegex.test(videogame.stock)) {
        error.stock = "El stock contiene caracteres inválidos."
    }
    if(videogame.stock && videogame.stock > 500) {
        error.stock = "There can't be more than 500 products for sale"
    }


    /* DISCOUNT */
    if(videogame.discount && numberRegex.test(videogame.discount)) {
        error.discount = "The discount must contain just numbers."
    }
    if(videogame.discount > 60) {
        error.discount = "Maximo de descuento alcanzado."
    }

    return error
}