import {
  schoolNameMaxChar,
  schoolNameMinChar,
  schoolShortNameMaxChar,
  schoolShortNameMinChar,
  schoolEditionBoardMaxLimit,
  schoolEditionBoardMinLimit,
  schoolAffiliateNumberMaxChar,
  schoolAffiliateNumberMinChar,
  schoolEstablishedYearMinNumber,
} from "@MEUtils/validationConst";

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
  schoolNameRequired,
  schoolNameMaxLength,
  schoolNameMinLength,
  schoolTypeRequired,
  educationBoardsMin,
  educationBoardsMax,
  educationBoardsRequired,
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
};
