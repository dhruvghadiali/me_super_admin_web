const yearDigitRegex = /^\d{4}$/;
const aadharCardRegex = /^\d{12}$/;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const phoneNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export {
    timeRegex,
    objectIdRegex,
    yearDigitRegex,
    aadharCardRegex,
    phoneNumberRegex,
}