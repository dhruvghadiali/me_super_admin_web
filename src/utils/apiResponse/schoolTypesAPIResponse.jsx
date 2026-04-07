import _ from "lodash";

const setSchoolTypesDropdownOptions = (schoolTypes) => {
  if (_.isEmpty(schoolTypes) || _.isNull(schoolTypes)) {
    return [];
  }
  
  return _.map(schoolTypes, (schoolType) => ({
    label: _.get(schoolType, "school_type", ""),
    value: _.get(schoolType, "id", ""),
  }));
};

export { setSchoolTypesDropdownOptions };