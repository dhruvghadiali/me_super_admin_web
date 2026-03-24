import moment from "moment";

export const setAuthData = (user, token) => {
  localStorage.setItem("meSuperAdminAuthData", JSON.stringify(user));
  localStorage.setItem("meSuperAdminAuthToken", token);
};

export const getAuthData = () => {
  const userData = localStorage.getItem("meSuperAdminAuthData");
  const authToken = localStorage.getItem("meSuperAdminAuthToken");

  if (userData && authToken) {
    try {
      if (authToken) {
        // Decode JWT token to get expiration time
        const tokenParts = authToken.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const expirationTime = payload.exp ? moment.unix(payload.exp) : null;

          console.log(
            "Token expiration time:",
            expirationTime
              ? expirationTime.format("DD-MM-YYYY HH:mm:ss")
              : "N/A",
          );
          console.log("Current time:", moment().format("DD-MM-YYYY HH:mm:ss"));
          console.log(
            "Time until expiration:",
            expirationTime
              ? expirationTime.diff(moment(), "minutes") + " minutes"
              : "N/A",
          );

          if (expirationTime && moment().isSameOrAfter(expirationTime)) {
            console.warn("Token has expired");
            clearAuthData();
            return null;
          } else {
            return {
              user: JSON.parse(userData),
              token: authToken,
            };
          }
        } else {
          clearAuthData();
          return null;
        }
      } else {
        clearAuthData();
        return null;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      clearAuthData();
      return null;
    }
  }

  clearAuthData();
  return null;
};

export const clearAuthData = () => {
  localStorage.removeItem("meSuperAdminAuthData");
  localStorage.removeItem("meSuperAdminAuthToken");
};

export const isAuthenticated = () => {
  const authData = getAuthData();
  return authData !== null;
};
