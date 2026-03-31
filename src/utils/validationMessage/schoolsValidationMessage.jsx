import {
  emailMaxChar,
  emailMinChar,
  addressMaxChar,
  addressMinChar,
  phoneNumberChar,
  organizationNameMaxChar,
  organizationNameMinChar,
  organizationShortNameMaxChar,
  organizationShortNameMinChar,
  governmentRegistrationNumberMaxChar,
  governmentRegistrationNumberMinChar,
} from "@MEUtils/validationConst";

const organizationNameRequired = `Organization name is required`;
const organizationNameMaxLength = `Maximum ${organizationNameMaxChar} characters allowed`;
const organizationNameMinLength = `Minimum ${organizationNameMinChar} characters required`;

const organizationShortNameRequired = `Organization short name is required`;
const organizationShortNameMaxLength = `Maximum ${organizationShortNameMaxChar} characters allowed`;
const organizationShortNameMinLength = `Minimum ${organizationShortNameMinChar} characters required`;

const governmentRegistrationNumberRequired = `Government registration number is required`;
const governmentRegistrationNumberMaxLength = `Maximum ${governmentRegistrationNumberMaxChar} characters allowed`;
const governmentRegistrationNumberMinLength = `Minimum ${governmentRegistrationNumberMinChar} characters required`;

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

const cityRequired = `City is required`;
const stateRequired = `State is required`;
const zipCodeRequired = `Zip code is required`;
const districtRequired = `District is required`;
const areaNameRequired = `Area name is required`;

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
  phoneNumberLength,
  phoneNumberInvalid,
  phoneNumberRequired,
  organizationNameRequired,
  organizationNameMaxLength,
  organizationNameMinLength,
  organizationShortNameRequired,
  organizationShortNameMaxLength,
  organizationShortNameMinLength,
  governmentRegistrationNumberRequired,
  governmentRegistrationNumberMaxLength,
  governmentRegistrationNumberMinLength,
};
