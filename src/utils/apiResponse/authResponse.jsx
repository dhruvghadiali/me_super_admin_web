import _ from "lodash";

const setUserInformation = (user) => {
  return {
    id: _.get(user, "id", null),
    username: _.get(user, "username", ""),
  };
};

export { setUserInformation };