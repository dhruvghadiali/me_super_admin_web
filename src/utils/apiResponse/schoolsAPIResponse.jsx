import _, { set } from "lodash";
import moment from "moment";

import { SCHOOL_WEEK_DAYS } from "@MEHelpers/enums";

const setDateTimeFormat = (value) => {
  return moment(value).format("DD-MMM-YYYY HH:mm A");
};

const mapDayHours = (hours, day) => ({
  openTime: _.get(hours, `${day}.open_time`, ""),
  closeTime: _.get(hours, `${day}.close_time`, ""),
  closed: _.get(hours, `${day}.closed`, day === SCHOOL_WEEK_DAYS.SUNDAY),
});

const mapWeeklyHours = (entity, hoursPath) => {
  const days = Object.values(SCHOOL_WEEK_DAYS);
  const hours = _.get(entity, hoursPath, {});

  return days.reduce((weeklyHours, day) => {
    weeklyHours[day] = mapDayHours(hours, day);
    return weeklyHours;
  }, {});
};

const setState = (state) => ({
  id: _.get(state, "id", null),
  value: _.get(state, "id", null),
  label: _.get(state, "name", ""),
  name: _.get(state, "name", ""),
});

const setDistrict = (district) => ({
  id: _.get(district, "id", null),
  value: _.get(district, "id", null),
  label: _.get(district, "name", ""),
  name: _.get(district, "name", ""),
});

const setCity = (city) => ({
  id: _.get(city, "id", null),
  value: _.get(city, "id", null),
  label: _.get(city, "name", ""),
  name: _.get(city, "name", ""),
});

const setAreaName = (areaName) => ({
  id: _.get(areaName, "id", null),
  value: _.get(areaName, "id", null),
  label: _.get(areaName, "name", ""),
  name: _.get(areaName, "name", ""),
});

const setZipcode = (zipcode) => ({
  id: _.get(zipcode, "id", null),
  value: _.get(zipcode, "id", null),
  label: _.get(zipcode, "zipcode", ""),
  zipcode: _.get(zipcode, "zipcode", ""),
});

const setSchoolType = (schoolType) => ({
  id: _.get(schoolType, "id", null),
  value: _.get(schoolType, "id", null),
  type: _.get(schoolType, "school_type", ""),
  label: _.get(schoolType, "school_type", ""),
});

const setEducationBoards = (educationBoards) =>
  _.map(educationBoards, (board) => ({
    id: _.get(board, "id", null),
    value: _.get(board, "id", null),
    label: _.get(board, "education_board", ""),
    educationBoard: _.get(board, "education_board", ""),
  }));

const setSchoolAdmin = (schoolAdmin) => ({
  id: _.get(schoolAdmin, "id", null),
  firstName: _.get(schoolAdmin, "first_name", ""),
  lastName: _.get(schoolAdmin, "last_name", ""),
  email: _.get(schoolAdmin, "email", ""),
  phoneNumber: _.get(schoolAdmin, "phone_number", ""),
  username: _.get(schoolAdmin, "username", ""),
  userType: _.get(schoolAdmin, "user_type", ""),
  isAccountVerified: _.get(schoolAdmin, "is_account_verified", false),
  isActive: _.get(schoolAdmin, "is_active", false),
  createdBy: _.get(schoolAdmin, "created_by", ""),
  updatedBy: _.get(schoolAdmin, "updated_by", ""),
  createdAt: setDateTimeFormat(_.get(schoolAdmin, "created_at", "")),
  updatedAt: setDateTimeFormat(_.get(schoolAdmin, "updated_at", "")),
});

const setSchoolAddresses = (addresses) =>
  _.map(addresses, (address) => ({
    id: _.get(address, "id", null),
    address: _.get(address, "address", ""),
    isActive: _.get(address, "is_active", false),
    createdBy: _.get(address, "created_by", ""),
    updatedBy: _.get(address, "updated_by", ""),
    createdAt: setDateTimeFormat(_.get(address, "created_at", "")),
    updatedAt: setDateTimeFormat(_.get(address, "updated_at", "")),
    latitude: _.get(address, "latitude", null),
    longitude: _.get(address, "longitude", null),
    state: setState(_.get(address, "state", {})),
    district: setDistrict(_.get(address, "district", {})),
    city: setCity(_.get(address, "city", {})),
    areaName: setAreaName(_.get(address, "area_name", {})),
    zipcode: setZipcode(_.get(address, "zipcode", {})),
    administrativeHours: mapWeeklyHours(address, "administrative_hours"),
    schoolHours: mapWeeklyHours(address, "school_hours"),
    schoolAdmin: {
      ...setSchoolAdmin(_.get(address, "user", {})),
      schoolAddressId: _.get(address, "id", null),
    },
  }));

const setOrganizationMembers = (members) =>
  _.map(members, (member) => ({
    id: _.get(member, "id", null),
    firstName: _.get(member, "first_name", ""),
    lastName: _.get(member, "last_name", ""),
    email: _.get(member, "email", ""),
    phoneNumber: _.get(member, "phone_number", ""),
    position: _.get(member, "position", ""),
    aadhaarNumber: _.get(member, "aadhaar_number", ""),
    address: _.get(member, "address", ""),
    state: setState(_.get(member, "state", {})),
    district: setDistrict(_.get(member, "district", {})),
    city: setCity(_.get(member, "city", {})),
    areaName: setAreaName(_.get(member, "area_name", {})),
    zipcode: setZipcode(_.get(member, "zipcode", {})),
    isActive: _.get(member, "is_active", false),
    createdBy: _.get(member, "created_by", ""),
    updatedBy: _.get(member, "updated_by", ""),
    createdAt: setDateTimeFormat(_.get(member, "created_at", "")),
    updatedAt: setDateTimeFormat(_.get(member, "updated_at", "")),
  }));

const setOrganization = (organization) => ({
  id: _.get(organization, "id", null),
  name: _.get(organization, "name", ""),
  shortName: _.get(organization, "short_name", ""),
  email: _.get(organization, "email", ""),
  phoneNumber: _.get(organization, "phone_number", ""),
  governmentRegistrationNumber: _.get(
    organization,
    "government_registration_number",
    "",
  ),
  address: _.get(organization, "address", ""),
  state: setState(_.get(organization, "state", {})),
  district: setDistrict(_.get(organization, "district", {})),
  city: setCity(_.get(organization, "city", {})),
  areaName: setAreaName(_.get(organization, "area_name", {})),
  zipcode: setZipcode(_.get(organization, "zipcode", {})),
  isActive: _.get(organization, "is_active", false),
  createdBy: _.get(organization, "created_by", ""),
  updatedBy: _.get(organization, "updated_by", ""),
  createdAt: setDateTimeFormat(_.get(organization, "created_at", "")),
  updatedAt: setDateTimeFormat(_.get(organization, "updated_at", "")),
  members: setOrganizationMembers(
    _.get(organization, "organization_members", []),
  ),
});

const setSchoolsInformation = (schools) => {
  return _.map(schools, (school) => ({
    id: _.get(school, "id", null),
    affiliateNumber: _.get(school, "affiliate_number", ""),
    name: _.get(school, "name", ""),
    shortName: _.get(school, "short_name", ""),
    email: _.get(school, "email", ""),
    phoneNumber: _.get(school, "phone_number", ""),
    establishedYear: _.get(school, "established_year", null),
    about: _.get(school, "about", ""),
    isActive: _.get(school, "is_active", false),
    createdBy: _.get(school, "created_by", ""),
    updatedBy: _.get(school, "updated_by", ""),
    createdAt: setDateTimeFormat(_.get(school, "created_at", "")),
    updatedAt: setDateTimeFormat(_.get(school, "updated_at", "")),
    schoolType: setSchoolType(_.get(school, "school_type", {})),
    educationBoards: setEducationBoards(_.get(school, "education_boards", [])),
    schoolAddresses: setSchoolAddresses(_.get(school, "school_address", [])),
    organization: setOrganization(_.get(school, "organization", {})),
  }));
};

const setSchoolsTableRows = (schools) =>
  _.map(schools, (school) => ({
    id: _.get(school, "id", null),
    name: _.upperCase(_.get(school, "name", "")),
    email: _.toLower(_.get(school, "email", "")),
    phoneNumber: _.toLower(_.get(school, "phone_number", "")),
    createdAt: setDateTimeFormat(_.get(school, "created_at", "")),
    organization: setOrganization(_.get(school, "organization", {})),
    schoolAddresses: setSchoolAddresses(_.get(school, "school_address", [])),
    school: {
      id: _.get(school, "id", null),
      name: _.get(school, "name", ""),
      shortName: _.get(school, "short_name", ""),
      email: _.get(school, "email", ""),
      phoneNumber: _.get(school, "phone_number", ""),
      affiliateNumber: _.get(school, "affiliate_number", ""),
      establishedYear: _.get(school, "established_year", null),
      schoolType: setSchoolType(_.get(school, "school_type", {})),
      educationBoards: setEducationBoards(
        _.get(school, "education_boards", []),
      ),
    },
  }));

export { setSchoolsInformation, setSchoolsTableRows };
