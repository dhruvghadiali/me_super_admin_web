import _ from "lodash";

const setAddSchoolAPIPayload = (formValues) => {
  let payload = _.cloneDeep(formValues);
  console.log("payload", payload);
  return {
  };
};

export { setAddSchoolAPIPayload };