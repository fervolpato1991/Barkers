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
        error.minHeight = "The minimum height must be greater than 0";
        isError = true;
    }
    if(form.minWeight <= 0){
        error.minWeight = "The minWeight must be greater than 0";
        isError = true;
    }
    if(form.minLifeSpan <= 0){
        error.minLifeSpan = "The minLifeSpan must be greater than 0";
        isError = true;
    }
    if(form.minLifeSpan > 20) {
        error.minLifeSpan = "The minLifeSpan must be less than 20";
        isError = true;
    }
    if(form.maxHeight <= 0 ) {
        error.maxHeight = "The max height must be greater than 0";
        isError = true;
    }
    if(form.maxHeight < form.minHeight ) {
        error.maxHeight = "The max height must be greater than the min height";
        isError = true;
    }
    if(form.maxWeight <= 0 ) {
        error.maxWeight = "The max weight must be greater than 0";
        isError = true;
    }
    if(form.maxWeight < form.minWeight ) {
        error.maxWeight = "The max weight must be greater than the min weight";
        isError = true;
        }
    if(form.maxLifeSpan <= 0 ) {
        error.maxLifeSpan = "The max Life Span must be greater than 0";
        isError = true;
    }
    if(form.maxLifeSpan > 20) {
        error.maxLifeSpan = "The max Life Span must be less than 20";
        isError = true;
    }
    if(form.maxLifeSpan < form.minLifeSpan){
        error.maxLifeSpan = "The max Life Span must be greater than the min Life Span";
        isError = true;
    }
    if(form.temperaments.length <= 0) {
        error.temperaments = "Need at least one temperament";
        isError = true;
    }
    return isError ? error : null;
};

export default validation;