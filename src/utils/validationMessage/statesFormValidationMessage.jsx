import {
  stateNameMaxChar,
  stateNameMinChar,
} from "@MEUtils/validationConst";

const stateNameRequired = `State name is required`;
const stateNameMinLength = `State name must be at least ${stateNameMinChar} characters`;
const stateNameMaxLength = `State name must be at most ${stateNameMaxChar} characters`;

export {
  stateNameRequired,
  stateNameMinLength,
  stateNameMaxLength,
};