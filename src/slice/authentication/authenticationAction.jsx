import { createAsyncThunk } from "@reduxjs/toolkit";

// import { signInAPIRoute } from "@MEUtils/apiRoutes";
// import { setAuthData } from "@MEHelpers/authHelpers";
// import { SIDEBAR_MENU_NAMES } from "@MEHelpers/enums";
// import { setUserInformation } from "@MEUtils/apiResponse";
// import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
// import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";

const signIn = createAsyncThunk(
  "authentication/signIn",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      // // Use the pre-configured axios instance (baseURL + timeout + headers)
      // const response = await axiosInstance.post(signInAPIRoute, payload, {
      //   autoLogoutOnUnauthorized: false,
      // });

      // if (apiResponseHaveData(response)) {
      //   let user = setUserInformation(response.data[0]);
      //   setAuthData(user, response.data[0].token);
      //   dispatch(changeActiveMenu(SIDEBAR_MENU_NAMES.DASHBOARD));
      //   return { user: user, token: response.data[0].token };
      // } else {
      //   return { user: {}, token: "" };
      // }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) || "Sign-in request failed";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { signIn };
