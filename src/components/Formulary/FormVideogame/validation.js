export const validation = (videogame) => {
    const error = {}

    /* REGEX */
    const nameRegexFirst = /^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+){0,2}$/;
    const nameRegex = /^(?=(?:\S*\s){0,3})(?=(?:\D*\d){0,4})[A-Za-z0-9\s]*$/;
    const genreRegex = /^[A-Za-z]+$/
    const descriptionRegex = /^[A-Za-z0-9,?*\s]+[A-Za-z0-9]+/;
    const developerRegex = /^([^A-Za-z]+\s){3,}/;
    const numberRegex = /^[^0-9]+$/    ;
    const imageRegexUrl = /https?:\/\/[^\s]+\.(png|jpg|gif)/;
    const regexUrl = new RegExp(imageRegexUrl)
    
    /* NAME */
    if (!nameRegexFirst.test(videogame.name)) {
        error.name = "Name must start and finish with a letter or number"
    }
    if(!nameRegex.test(videogame.name)) {
        error.name = "Name contains invalid characters."
    }
    if(videogame.name.length > 30) {
        error.name = "Name must be less than 30 characters."
    }
    if(videogame.name.length === 0) {
        error.name = "Name field can't be empty."
    }
    
    /* DESCRIPTION */
    if(!descriptionRegex.test(videogame.description)) {
        error.description = "The description contains invalid characters"
    }
    if(videogame.description.length > 400) {
        error.description = "The description must be less than 400 characters"
    }
    if(videogame.description.length < 50 && videogame.description.length > 0) {
        error.description = "The description field must be at least 50 characters long."
    }
    if(videogame.description.length === 0) {
        error.description = "The description field can't be empty."
    }

    /* DEVELOPER */
    if(developerRegex.test(videogame.developer)) {
        error.developer = "Developer's name contains invalid characters."
    }
    if(videogame.developer.length > 20) {
        error.developer = "Developer's name must be less than 20 characters."
    }
    if(videogame.developer.length === 0) {
        error.developer = "Developer's name field can't be empty."
    }
    
    
    /* IMAGE */
    if(videogame.image && !videogame.image.match(regexUrl)){
        error.image = "Invalid image URL."
    }
    if(videogame.image.length === 0) {
        error.image = "Image field can't be empty."
    }
    
    
    /* GENRE */
    if(!genreRegex.test(videogame.genre)) {
      error.genre = "Genre must be just letters"   
    }
    if(videogame.genre.length === 0) {
        error.genre = "Genre field can't be empty."
    }
    if(videogame.genre.length > 20) {
        error.genre = "The genre can't be more than 20 characters"
    }
    
    /* PLATFORM */
    if(videogame.platform.length === 0) {
        error.platform = "Must select one platform."
    }
    
    /* PRICE */
    if(numberRegex.test(videogame.price)){
        error.price = "The price must contain just numbers."
    }
    if(videogame.price < 10){
        error.price = "The price must be greater than $10."
    }
    if(videogame.price > 1000){
        error.price = "The value cannot be greater than 1000."
    }
    if(videogame.price.length === 0) {
        error.price = "Price must be a number."
    }

    /* STOCK */
    if(numberRegex.test(videogame.stock)) {
        error.stock = "The stock must contain just numbers."
    }
    if(videogame.stock < 10) {
        error.stock = "The product's stock must be at least 10 for sell."
    }
    if(videogame.stock > 500) {
        error.stock = "There can't be more than 500 products for sale"
    }
    if(videogame.stock.length === 0) {
        error.stock = "Stock field can't be empty."
    }

    /* DISCOUNT */
    if(numberRegex.test(videogame.stock)) {
        error.discount = "The discount must contain just numbers."
    }
    if(videogame.discount > 60) {
        error.discount = "The discount must be less than 60 porcent"
    }

    return error
}
