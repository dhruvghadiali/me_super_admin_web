import { configureStore } from "@reduxjs/toolkit";

import schoolsSlice from "@MERedux/schools/schoolsSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    schools: schoolsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
