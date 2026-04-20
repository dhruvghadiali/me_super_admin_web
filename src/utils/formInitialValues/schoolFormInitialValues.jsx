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

const schoolAddressesInitialValues = {
  address: "",
  state: "",
  district: "",
  city: "",
  area_name: "",
  zipcode: "",
  schoolAdmin: {
    schoolAddressId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
};

export {
    organizationFormInitialValues,
    organizationMembersInitialValues,
    schoolFormInitialValues,
    schoolAddressesInitialValues,
}