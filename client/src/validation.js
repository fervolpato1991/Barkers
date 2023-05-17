const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
const regexNAME = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;

const validation = (form) => {
    let isError = false;
    let error = {};
    if (form.name.length <= 3) {
        error.name = "The name cannot be less than 3 letters";
        isError = true;
    } else if(!regexNAME.test(form.name)){
        error.name = "The name must be composed of letters";
        isError = true
    }
    if(!regexURL.test(form.image)){
        error.image = "Wrong url";
        isError = true;
    }
    if(form.minHeight <= 0){
        error.minHeight = "The minHeight must be greater than 0";
        isError = true;
    }
    if(form.minWeight <= 0){
        error.minWeight = "The minWeight must be greater than 0";
        isError = true;
    }
    if(form.minLifeSpan <= 0){
        error.minLifeSpan = "The minLifeSpan must be greater than 0";
        isError = true;
    }else if(form.minLifeSpan > 20) {
        error.minLifeSpan = "The minLifeSpan must be less than 20";
        isError = true;
    }
    if(form.maxLifeSpan <= 0 ) {
        error.maxLifeSpan = "The maxLifeSpan must be greater than 0";
        isError = true;
    }else if(form.maxLifeSpan > 20) {
        error.maxLifeSpan = "The maxLifeSpan must be less than 20";
        isError = true;
    }
    if(form.temperaments.length <= 0) {
        error.temperaments = "Need at least one temperament";
        isError = true;
    }
    return isError ? error : null;
};

export default validation;