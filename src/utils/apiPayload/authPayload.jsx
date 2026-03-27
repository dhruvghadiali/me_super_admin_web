import _ from "lodash";

const setSigninPayload = (formValues) => {
  return {
    username: _.trim(_.get(formValues, "username", "")),
    password: _.get(formValues, "password", ""),
  };
};

export { setSigninPayload };