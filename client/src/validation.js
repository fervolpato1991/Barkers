const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
const regexNAME = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;

const validation = (form) => {
    let errors = {};

    if (form.name.length <= 3) {
        errors.name = "The name cannot be less than 3 letters";
    }

    if (!regexNAME.test(form.name)) {
        errors.name = "The name must be composed of letters";
    }

    if (!regexURL.test(form.image)) {
        errors.image = "Wrong URL";
    }

    if (form.minHeight <= 0) {
        errors.minHeight = "The minimum height must be greater than 0 cm";
    } 

    if (form.minWeight <= 0) {
        errors.minWeight = "The minWeight must be greater than 0 kg";
    }

    if (form.minLifeSpan <= 0) {
        errors.minLifeSpan = "The minLifeSpan must be greater than 0 years";
    } else if (form.minLifeSpan > 20) {
        errors.minLifeSpan = "The minLifeSpan must be less than 20 years";
    }

    if (form.maxHeight <= 0) {
        errors.maxHeight = "The max height must be greater than 0 cm";
    } else if (form.maxHeight < form.minHeight) {
        errors.maxHeight = "The max height must be greater than the min height";
    } else if (form.maxHeight > 100) {
        errors.maxHeight = "The max height must be less than 100 cm";
    }

    if (form.maxWeight <= 0) {
        errors.maxWeight = "The max weight must be greater than 0 kg";
    } else if (form.maxWeight < form.minWeight) {
        errors.maxWeight = "The max weight must be greater than the min weight";
    } else if (form.maxWeight > 100) {
        errors.maxWeight = "The max weight must be less than 100 kg";
    }

    if (form.maxLifeSpan <= 0) {
        errors.maxLifeSpan = "The max Life Span must be greater than 0 years";
    } else if (form.maxLifeSpan > 20) {
        errors.maxLifeSpan = "The max Life Span must be less than 20 years";
    } else if (form.maxLifeSpan < form.minLifeSpan) {
        errors.maxLifeSpan = "The max Life Span must be greater than the min Life Span";
    }

    if (form.temperaments.length <= 0) {
        errors.temperaments = "Need at least one temperament";
    }

    return Object.keys(errors).length > 0 ? errors : null;
};

export default validation;