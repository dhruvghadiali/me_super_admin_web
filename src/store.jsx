import { configureStore } from "@reduxjs/toolkit";

import loggerMiddleware from "@MERedux/middleware/logger";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
