import _ from "lodash";

const setAddStateAPIPayload = (values) => {
  return {
    name: _.get(values, "name", ""),
  };
};

const setEditStateAPIPayload = (values) => {
  return {
    id: _.get(values, "id", ""),
    data: {
      name: _.get(values, "name", ""),
    },
  };
};

const setDeleteStateAPIPayload = (values) => {
  return _.get(values, "id", "");
};

export {
  setAddStateAPIPayload,
  setEditStateAPIPayload,
  setDeleteStateAPIPayload,
};
