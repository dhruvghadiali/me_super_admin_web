import { configureStore } from "@reduxjs/toolkit";

import statesSlice from "@MERedux/states/statesSlice";
import schoolsSlice from "@MERedux/schools/schoolsSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import districtsSlice from "@MERedux/districts/districtsSlice";
import facilityTypesSlice from "@MERedux/facilityTypes/facilityTypesSlice";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    states: statesSlice,
    schools: schoolsSlice,
    districts: districtsSlice,
    facilityTypes: facilityTypesSlice,
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
