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
        error.name = "Name contains invalid characters."
    }
    if(videogame.name && videogame.name.length > 30) {
        error.name = "Name must be less than 30 characters."
    }
    if(videogame.name && videogame.name.length < 5) {
        error.name = "Name must be at least 5 characters."
    }
    if(videogame.name && videogame.name.length === 0) {
        error.name = "Name field can't be empty."
    }
    
    /* DESCRIPTION */
    if(videogame.description && !descriptionRegex.test(videogame.description)) {
        error.description = "The description contains invalid characters"
    }
    if(videogame.description && videogame.description.length > 400) {
        error.description = "The description must be less than 400 characters"
    }
    if(videogame.description && videogame.description.length < 50 && videogame.description.length > 0) {
        error.description = "The description field must be at least 50 characters long."
    }
    if(videogame.description && videogame.description.length === 0) {
        error.description = "The description field can't be empty."
    }

    /* DEVELOPER */
    if(videogame.developer && developerRegex.test(videogame.developer)) {
        error.developer = "Developer's name contains invalid characters."
    }
    if(videogame.developer && videogame.developer.length > 20) {
        error.developer = "Developer's name must be less than 20 characters."
    }
    if(videogame.developer && videogame.developer.length === 0) {
        error.developer = "Developer's name field can't be empty."
    }
    
    
    /* IMAGE */
    if(videogame.image && videogame.image && !videogame.image.match(regexUrl)){
        error.image = "Invalid image URL."
    }
    if(videogame.image && videogame.image.length === 0) {
        error.image = "Image field can't be empty."
    }
    
    
    /* GENRE */
    if(videogame.genre && !genreRegex.test(videogame.genre)) {
      error.genre = "Genre contains invalid characters"   
    }
    if(videogame.genre && videogame.genre.length === 0) {
        error.genre = "Genre field can't be empty."
    }
    if(videogame.genre && videogame.genre.length > 20) {
        error.genre = "The genre can't be more than 20 characters"
    }
    
    /* PLATFORM */
    if(videogame.platform && videogame.platform.length === 0) {
        error.platform = "Must select one platform."
    }
    
    /* PRICE */
    if(videogame.price && numberRegex.test(videogame.price)){
        error.price = "The price must contain just numbers."
    }
    if(videogame.price && videogame.price < 10){
        error.price = "The price must be greater than $10."
    }
    if(videogame.price && videogame.price > 1000){
        error.price = "The value cannot be greater than 1000."
    }
    if(videogame.price && videogame.price.length === 0) {
        error.price = "Price must be a number."
    }

    /* STOCK */
    if(videogame.stock && numberRegex.test(videogame.stock)) {
        error.stock = "The stock must contain just numbers."
    }
    if(videogame.stock && videogame.stock < 10) {
        error.stock = "The product's stock must be at least 10 for sell."
    }
    if(videogame.stock && videogame.stock > 500) {
        error.stock = "There can't be more than 500 products for sale"
    }
    if(videogame.stock && videogame.stock.length === 0) {
        error.stock = "Stock field can't be empty."
    }

    /* DISCOUNT */
    if(videogame.discount && numberRegex.test(videogame.stock)) {
        error.discount = "The discount must contain just numbers."
    }
    if(videogame.discount && videogame.discount > 60) {
        error.discount = "The discount must be less than 60 porcent"
    }

    return error
}
