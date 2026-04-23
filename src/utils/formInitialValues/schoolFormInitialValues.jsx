import {SCHOOL_SCREEN_DB_OPERATIONS,} from "@MEHelpers/enums";

const organizationFormInitialValues = {
  name: "",
  shortName: "",
  email: "",
  phoneNumber: "",
  governmentRegistrationNumber: "",
  address: "",
  state: "",
  district: "",
  city: "",
  areaName: "",
  zipcode: "",
};

const organizationMembersInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  position: "",
  aadhaarNumber: "",
  address: "",
  state: "",
  district: "",
  city: "",
  areaName: "",
  zipcode: "",
};

const schoolFormInitialValues = {
  name: "",
  shortName: "",
  email: "",
  phoneNumber: "",
  affiliateNumber: "",
  establishedYear: "",
  schoolType: "",
  educationBoards: [],
};

const schoolAddressesInitialValues = (() => {
  const id = crypto.randomUUID();
  return {
    dbOperation: SCHOOL_SCREEN_DB_OPERATIONS.ADD,
    id: id,
    address: "",
    state: "",
    district: "",
    city: "",
    area_name: "",
    zipcode: "",
    schoolAdmin: {
      schoolAddressId: id,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  };
})();

export {
  organizationFormInitialValues,
  organizationMembersInitialValues,
  schoolFormInitialValues,
  schoolAddressesInitialValues,
};
