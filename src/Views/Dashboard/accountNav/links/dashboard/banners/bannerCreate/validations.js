export const validations = (banner) => {
    const error = {};
  
    /* REGEX */
    const nameRegex = /^(?:(?!\s{4})[^\s])*(?:\s[^\s]*){0,3}\s?$/;
    const imageRegexUrl = /https?:\/\/[^\s]+\.(png|jpg|gif|svg)/;
    const regexUrl = new RegExp(imageRegexUrl);
  
    /* TITLE */
    if (banner.title && !nameRegex.test(banner.title)) {
      error.name = "El titulo contiene caracteres invalidos.";
    }
    if (banner.title && banner.title.length > 30) {
      error.name = "El titulo debe contener menos de 30 caracteres.";
    }
    if (banner.title && banner.title.length < 5) {
      error.name = "El titulo debe contener mas de 5 caracteres.";
    }
    if (banner.title && banner.title.length <= 0) {
      error.name = "El campo del titulo no puede estar vacio.";
    }
  
    /* LOGOTYPE */
    if (
      banner.logotypeUrl &&
      banner.logotypeUrl &&
      !banner.logotypeUrl.match(regexUrl)
    ) {
      error.logotypeUrl = "URL invalida.";
    }
    if (banner.logotypeUrl && banner.logotypeUrl.length === 0) {
      error.logotypeUrl = "El campo de la imagen del logotipo no puede estar vacio.";
    }
  
    /* BACKGROUND */
    if (
      banner.backgroundUrl &&
      banner.backgroundUrl &&
      !banner.backgroundUrl.match(regexUrl)
    ) {
      error.backgroundUrl = "URL invalida.";
    }
    if (banner.backgroundUrl && banner.backgroundUrl.length === 0) {
      error.backgroundUrl = "El campo de la imagen del fondo no puede estar vacio.";
    }
  
    return error;
  };
  