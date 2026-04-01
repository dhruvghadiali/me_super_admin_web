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
  schoolNameMaxChar,
  schoolNameMinChar,
  schoolShortNameMaxChar,
  schoolShortNameMinChar,
  schoolAffiliateNumberMaxChar,
  schoolAffiliateNumberMinChar,
  schoolEstablishedYearMinNumber,
  schoolEditionBoardMaxLimit,
  schoolEditionBoardMinLimit,
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

const schoolNameRequired = `School name is required`;
const schoolNameMaxLength = `School name must be at most ${schoolNameMaxChar} characters`;
const schoolNameMinLength = `School name must be at least ${schoolNameMinChar} characters`;

const schoolShortNameRequired = `School short name is required`;
const schoolShortNameMaxLength = `School short name must be at most ${schoolShortNameMaxChar} characters`;
const schoolShortNameMinLength = `School short name must be at least ${schoolShortNameMinChar} characters`;

const schoolAffiliateNumberRequired = `School affiliate number is required`;
const schoolAffiliateNumberMaxLength = `School affiliate number must be at most ${schoolAffiliateNumberMaxChar} characters`;
const schoolAffiliateNumberMinLength = `School affiliate number must be at least ${schoolAffiliateNumberMinChar} characters`;

const schoolEstablishedYearRequired = `School established year is required`;
const schoolEstablishedYearInvalid = `School established year must be a 4-digit number`;
const schoolEstablishedYearMaxYear = `School established year cannot be in the future`;
const schoolEstablishedYearMinYear = `School established year cannot be before ${schoolEstablishedYearMinNumber}`;

const schoolTypeRequired = `School type is required`;

const educationBoardsRequired = `Education board is required`;
const educationBoardsMin = `Select at least ${schoolEditionBoardMinLimit} education board`;
const educationBoardsMax = `You can select up to ${schoolEditionBoardMaxLimit} education boards only`;

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
  schoolNameRequired,
  schoolNameMaxLength,
  schoolNameMinLength,
  schoolShortNameRequired,
  schoolShortNameMaxLength,
  schoolShortNameMinLength,
  schoolAffiliateNumberRequired,
  schoolAffiliateNumberMaxLength,
  schoolAffiliateNumberMinLength,
  schoolEstablishedYearInvalid,
  schoolEstablishedYearMinYear,
  schoolEstablishedYearMaxYear,
  schoolEstablishedYearRequired,
  schoolTypeRequired,
  educationBoardsMin,
  educationBoardsMax,
  educationBoardsRequired,
};
