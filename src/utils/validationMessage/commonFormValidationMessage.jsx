import {
  emailMaxChar,
  emailMinChar,
  addressMaxChar,
  addressMinChar,
  phoneNumberChar,
  firstNameMaxChar,
  firstNameMinChar,
  lastNameMaxChar,
  lastNameMinChar,
  aadhaarNumberChar,
} from "@MEUtils/validationConst";

const emailRequired = `Email is required`;
const emailInvalid = `Invalid email address`;
const emailMaxLength = `Email must be at most ${emailMaxChar} characters`;
const emailMinLength = `Email must be at least ${emailMinChar} characters`;

const phoneNumberRequired = `Phone number is required`;
const phoneNumberInvalid = `Phone number must contain only digits`;
const phoneNumberLength = `Phone number must be exactly ${phoneNumberChar} characters`;

const addressRequired = `Address is required`;
const addressMaxLength = `Address must be at most ${addressMaxChar} characters`;
const addressMinLength = `Address must be at least ${addressMinChar} characters`;

const firstNameRequired = `First name is required`;
const firstNameMaxLength = `First name must be at most ${firstNameMaxChar} characters`;
const firstNameMinLength = `First name must be at least ${firstNameMinChar} characters`;

const lastNameRequired = `Last name is required`;
const lastNameMaxLength = `Last name must be at most ${lastNameMaxChar} characters`;
const lastNameMinLength = `Last name must be at least ${lastNameMinChar} characters`;

const aadhaarNumberRequired = `Aadhaar number is required`;
const aadhaarNumberInvalid = `Aadhaar number must contain only digits`;
const aadhaarNumberLength = `Aadhaar number must be exactly ${aadhaarNumberChar} characters`;

const cityRequired = `City selection is required`;
const stateRequired = `State selection is required`;
const zipCodeRequired = `Zip code selection is required`;
const districtRequired = `District selection is required`;
const areaNameRequired = `Area name selection is required`;

export {
  emailInvalid,
  cityRequired,
  stateRequired,
  emailRequired,
  emailMaxLength,
  emailMinLength,
  addressRequired,
  zipCodeRequired,
  addressMaxLength,
  addressMinLength,
  districtRequired,
  areaNameRequired,
  firstNameRequired,
  firstNameMaxLength,
  firstNameMinLength,
  lastNameRequired,
  lastNameMaxLength,
  lastNameMinLength,
  phoneNumberLength,
  phoneNumberInvalid,
  phoneNumberRequired,
  aadhaarNumberLength,
  aadhaarNumberInvalid,
  aadhaarNumberRequired,
};
