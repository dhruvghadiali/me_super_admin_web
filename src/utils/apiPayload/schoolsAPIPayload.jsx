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

const setAddSchoolAddressesInformation = (addresses) =>
  _.map(addresses, (address, index) => ({
    user_phone_number: _.get(address, "schoolAdmin.phoneNumber", ""),
    address: _.get(address, "address", ""),
    state: _.get(address, "state", ""),
    district: _.get(address, "district", ""),
    city: _.get(address, "city", ""),
    area_name: _.get(address, "areaName", ""),
    zipcode: _.get(address, "zipcode", ""),
  }));

const setAddSchoolAdminsInformation = (addresses) =>
  _.map(addresses, (address) => ({
    first_name: _.get(address, "schoolAdmin.firstName", ""),
    last_name: _.get(address, "schoolAdmin.lastName", ""),
    email: _.get(address, "schoolAdmin.email", ""),
    phone_number: _.get(address, "schoolAdmin.phoneNumber", ""),
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
    ),
    school_admins: setAddSchoolAdminsInformation(
      _.get(formValues, "addresses", []),
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

const setEditSchoolAddressAPIPayload = (address) => ({
  id: _.get(address, "id", ""),
  data: {
    address: _.get(address, "address", ""),
    state: _.get(address, "state", ""),
    district: _.get(address, "district", ""),
    city: _.get(address, "city", ""),
    area_name: _.get(address, "areaName", ""),
    zipcode: _.get(address, "zipcode", ""),
  },
});

const setEditSchoolAdminProfileAPIPayload = (schoolAdmin) => ({
  id: _.get(schoolAdmin, "id", ""),
  data: {
    first_name: _.get(schoolAdmin, "firstName", ""),
    last_name: _.get(schoolAdmin, "lastName", ""),
    email: _.get(schoolAdmin, "email", ""),
    phone_number: _.get(schoolAdmin, "phoneNumber", ""),
  },
});

const setAddSchoolAddressAPIPaylod = (formValues) => ({
  school_id: _.get(formValues, "schoolId", ""),
  school_address: {
    address: _.get(formValues, "address", ""),
    state: _.get(formValues, "state", ""),
    district: _.get(formValues, "district", ""),
    city: _.get(formValues, "city", ""),
    area_name: _.get(formValues, "areaName", ""),
    zipcode: _.get(formValues, "zipcode", ""),
  },
  school_admin: {
    first_name: _.get(formValues, "schoolAdmin.firstName", ""),
    last_name: _.get(formValues, "schoolAdmin.lastName", ""),
    email: _.get(formValues, "schoolAdmin.email", ""),
    phone_number: _.get(formValues, "schoolAdmin.phoneNumber", ""),
  },
});

const setSchoolAdminChangePasswordAPIPayload = (id = "") => ({
  id: id,
  data: {
    password: "123456789",
  },
});

export {
  setAddSchoolAPIPayload,
  setEditSchoolAddressAPIPayload,
  setEditOrganizationInformation,
  setEditSchoolInformation,
  setEditSchoolAdminProfileAPIPayload,
  setAddSchoolAddressAPIPaylod,
  setSchoolAdminChangePasswordAPIPayload,
};
