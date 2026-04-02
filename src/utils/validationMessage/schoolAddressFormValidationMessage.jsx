import {
  schoolAddressesMinLimit,
  schoolAddressesMaxLimit,
} from "@MEUtils/validationConst";

const schoolAddressesMinRequired = `Minimum ${schoolAddressesMinLimit} school address is required`;
const schoolAddressesMaxAllowed = `Maximum ${schoolAddressesMaxLimit} school addresses are allowed`;

export {
  schoolAddressesMinRequired,
  schoolAddressesMaxAllowed,
};