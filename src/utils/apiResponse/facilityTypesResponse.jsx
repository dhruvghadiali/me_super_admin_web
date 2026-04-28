import _ from "lodash";
import moment from "moment";

const setDateTimeFormat = (value) => {
  return moment(value).format("DD-MMM-YYYY HH:mm A");
};

const setFacilityTypesInformation = (facilityTypes) => {
  if (_.isEmpty(facilityTypes) || _.isNull(facilityTypes)) {
    return [];
  }
  
  return _.map(facilityTypes, (facilityType) => ({
    id: _.get(facilityType, "id", ""),
    facilityType: _.get(facilityType, "facility_type", ""),
    createdBy: _.get(facilityType, "created_by", ""),
    createdAt: setDateTimeFormat(_.get(facilityType, "created_at", "")),
    updatedBy: _.get(facilityType, "updated_by", ""),
    updatedAt: setDateTimeFormat(_.get(facilityType, "updated_at", ""))
  }));
};

export { setFacilityTypesInformation };