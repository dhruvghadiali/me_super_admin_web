import _ from "lodash";

const setAddSchoolInformation = (school) => ({
  affiliate_number: _.get(school, "affiliateNumber", ""),
  name: _.get(school, "name", ""),
  short_name: _.get(school, "shortName", ""),
  email: _.get(school, "email", ""),
  phone_number: _.get(school, "phoneNumber", ""),
  established_year: _.get(school, "establishedYear", ""),
  school_type: _.get(school, "schoolType", ""),
  education_boards: _.get(school, "educationBoards", []),
});

const setAddOrganizationInformation = (organization) => ({
  name: _.get(organization, "name", ""),
  short_name: _.get(organization, "shortName", ""),
  email: _.get(organization, "email", ""),
  phone_number: _.get(organization, "phoneNumber", ""),
  government_registration_number: _.get(
    organization,
    "governmentRegistrationNumber",
    "",
  ),
  address: _.get(organization, "address", ""),
  state: _.get(organization, "state", ""),
  district: _.get(organization, "district", ""),
  city: _.get(organization, "city", ""),
  area_name: _.get(organization, "areaName", ""),
  zipcode: _.get(organization, "zipcode", ""),
});

const setAddOrganizationMembersInformation = (members) =>
  _.map(members, (member) => ({
    first_name: _.get(member, "firstName", ""),
    last_name: _.get(member, "lastName", ""),
    email: _.get(member, "email", ""),
    phone_number: _.get(member, "phoneNumber", ""),
    position: _.get(member, "position", ""),
    aadhaar_number: _.get(member, "aadhaarNumber", ""),
    address: _.get(member, "address", ""),
    state: _.get(member, "state", ""),
    district: _.get(member, "district", ""),
    city: _.get(member, "city", ""),
    area_name: _.get(member, "areaName", ""),
    zipcode: _.get(member, "zipcode", ""),
  }));

const setAddSchoolAddressesInformation = (addresses, admins) =>
  _.map(addresses, (address, index) => ({
    user_phone_number: _.get(admins, `[${index}].phoneNumber`, ""),
    address: _.get(address, "address", ""),
    state: _.get(address, "state", ""),
    district: _.get(address, "district", ""),
    city: _.get(address, "city", ""),
    area_name: _.get(address, "area_name", ""),
    zipcode: _.get(address, "zipcode", ""),
  }));

const setAddSchoolAdminsInformation = (admins) =>
  _.map(admins, (admin) => ({
    first_name: _.get(admin, "firstName", ""),
    last_name: _.get(admin, "lastName", ""),
    email: _.get(admin, "email", ""),
    phone_number: _.get(admin, "phoneNumber", ""),
  }));

const setAddSchoolAPIPayload = (formValues) => {
  return {
    school: setAddSchoolInformation(_.get(formValues, "school", {})),
    organization: setAddOrganizationInformation(
      _.get(formValues, "organization", {}),
    ),
    organization_members: setAddOrganizationMembersInformation(
      _.get(formValues, "members", []),
    ),
    school_addresses: setAddSchoolAddressesInformation(
      _.get(formValues, "addresses", []),
      _.get(formValues, "admins", []),
    ),
    school_admins: setAddSchoolAdminsInformation(
      _.get(formValues, "admins", []),
    ),
  };
};

const setEditOrganizationInformation = (organization) => ({
  id: _.get(organization, "id", ""),
  data: {
    name: _.get(organization, "name", ""),
    short_name: _.get(organization, "shortName", ""),
    email: _.get(organization, "email", ""),
    phone_number: _.get(organization, "phoneNumber", ""),
    government_registration_number: _.get(
      organization,
      "governmentRegistrationNumber",
      "",
    ),
    address: _.get(organization, "address", ""),
    state: _.get(organization, "state", ""),
    district: _.get(organization, "district", ""),
    city: _.get(organization, "city", ""),
    area_name: _.get(organization, "areaName", ""),
    zipcode: _.get(organization, "zipcode", ""),
  },
});

const setEditSchoolInformation = (school) => ({
  id: _.get(school, "id", ""),
  data: {
    name: _.get(school, "name", ""),
    short_name: _.get(school, "shortName", ""),
    email: _.get(school, "email", ""),
    phone_number: _.get(school, "phoneNumber", ""),
    established_year: _.get(school, "establishedYear", ""),
    school_type: _.get(school, "schoolType", ""),
    education_boards: _.get(school, "educationBoards", []),
  },
});

export {
  setAddSchoolAPIPayload,
  setEditOrganizationInformation,
  setEditSchoolInformation,
};
