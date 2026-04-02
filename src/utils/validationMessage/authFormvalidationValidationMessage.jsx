import {
  authUsernameMaxChar,
  authUsernameMinChar,
  authPasswordMaxChar,
  authPasswordMinChar,
} from "@MEUtils/validationConst";

  const usernameRequired = "Username is required";
  const usernameMaxLength = `Maximum ${authUsernameMaxChar} characters allowed`;
  const usernameMinLength = `Minimum ${authUsernameMinChar} characters required`;
  const passwordRequired = "Password is required";
  const passwordMaxLength = `Maximum ${authPasswordMaxChar} characters allowed`;
  const passwordMinLength = `Minimum ${authPasswordMinChar} characters required`;

export {
  usernameRequired,
  usernameMaxLength,
  usernameMinLength,
  passwordRequired,
  passwordMaxLength,
  passwordMinLength,
};
