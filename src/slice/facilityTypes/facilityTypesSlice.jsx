import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

import { facilityTypeFormInitalValues } from "@MEUtils/formInitialValues";
import {
  getFacilityTypes,
} from "@MERedux/facilityTypes/facilityTypesAction";
import {
    FACILITY_TYPES_SCREEN_VIEW,
    FACILITY_TYPES_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";

export const facilityTypesSlice = createSlice({
  name: "facilityTypes",
  initialState: {
    facilityTypes: [],
    facilityTypesLoader: false,
    facilityTypesError: "",
    facilityTypesFormLoader: false,
    facilityTypesFormError: "",
    facilityTypesFormValues: facilityTypeFormInitalValues,
    facilityTypesScreenView: FACILITY_TYPES_SCREEN_VIEW.TABLE,
    facilityTypesScreenFormDBOperation: FACILITY_TYPES_SCREEN_DB_OPERATIONS.ADD,
  },
  reducers: {
    resetPageStates: (state) => {
      state.facilityTypes = [];
      state.facilityTypesLoader = false;
      state.facilityTypesError = "";
      state.facilityTypesFormLoader = false;
      state.facilityTypesFormError = "";
      state.facilityTypesFormValues = facilityTypeFormInitalValues;
      state.facilityTypesScreenView = FACILITY_TYPES_SCREEN_VIEW.TABLE;
      state.facilityTypesScreenFormDBOperation = FACILITY_TYPES_SCREEN_DB_OPERATIONS.ADD;
    },
    setFacilityTypesScreenView: (state, action) => {
      state.facilityTypesScreenView = action.payload;
    },
    setFacilityTypesScreenFormDBOperation: (state, action) => {
      state.facilityTypesScreenFormDBOperation = action.payload;
    },
    setFacilityTypesScreenFormValues: (state, action) => {
      state.facilityTypesFormValues = action.payload;
      state.facilityTypesFormError = "";
      state.facilityTypesFormLoader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFacilityTypes.pending, (state) => {
        state.facilityTypesLoader = true;
        state.facilityTypes = [];
        state.facilityTypesError = "";
      })
      .addCase(getFacilityTypes.fulfilled, (state, action) => {
        state.facilityTypesLoader = false;
        state.facilityTypes = action.payload.facilityTypes;
        state.facilityTypesError = action.payload.error;
      })
      .addCase(getFacilityTypes.rejected, (state, action) => {
        state.facilityTypesLoader = false;
        state.facilityTypes = [];
        state.facilityTypesError = action.payload.error;
      })
  },
});

export const {
  resetPageStates,
  setFacilityTypesScreenView,
  setFacilityTypesScreenFormValues,
  setFacilityTypesScreenFormDBOperation,
} = facilityTypesSlice.actions;

export default facilityTypesSlice.reducer;
