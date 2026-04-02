import {
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

export {
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
