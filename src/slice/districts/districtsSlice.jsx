import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

import { districtFormInitalValues } from "@MEUtils/formInitialValues";
import {
  getStates,
  addDistrict,
  editDistrict,
  deleteDistrict,
} from "@MERedux/districts/districtsAction";
import {
  DISTRICTS_SCREEN_VIEW,
  DISTRICTS_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";

export const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    states: [],
    statesLoader: false,
    districts: [],
    districtsLoader: false,
    districtsError: "",
    districtFormLoader: false,
    districtFormError: "",
    districtFormValues: districtFormInitalValues,
    districtsScreenView: DISTRICTS_SCREEN_VIEW.TABLE,
    districtsScreenFormDBOperation: DISTRICTS_SCREEN_DB_OPERATIONS.ADD,
  },
  reducers: {
    resetPageStates: (state) => {
      state.states = [];
      state.statesLoader = false;
      state.statesError = "";
      state.districts = [];
      state.districtsLoader = false;
      state.districtsError = "";
      state.districtFormLoader = false;
      state.districtFormError = "";
      state.districtFormValues = districtFormInitalValues;
      state.districtsScreenView = DISTRICTS_SCREEN_VIEW.TABLE;
      state.districtsScreenFormDBOperation = DISTRICTS_SCREEN_DB_OPERATIONS.ADD;
    },
    setDistrictsScreenView: (state, action) => {
      state.districtsScreenView = action.payload;
    },
    setDistrictsScreenFormDBOperation: (state, action) => {
      state.districtsScreenFormDBOperation = action.payload;
    },
    setDistrictsScreenFormValues: (state, action) => {
      state.districtFormValues = action.payload;
      state.districtFormError = "";
      state.districtFormLoader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStates.pending, (state) => {
        state.statesLoader = true;
        state.states = [];
        state.statesError = "";
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.statesLoader = false;
        state.states = action.payload.states;
        state.statesError = action.payload.error;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.statesLoader = false;
        state.states = [];
        state.statesError = action.payload.error;
      })
      .addCase(addDistrict.pending, (state) => {
        state.districtFormLoader = true;
        state.districtFormError = "";
      })
      .addCase(addDistrict.fulfilled, (state, action) => {
        state.districtFormLoader = false;
        state.districtFormError = action.payload.error;

        if (!action.payload.error) {
          state.districtFormValues = districtFormInitalValues;
          state.districtsScreenView = DISTRICTS_SCREEN_VIEW.TABLE;
          state.districtsScreenFormDBOperation = DISTRICTS_SCREEN_DB_OPERATIONS.ADD;
        }
      })
      .addCase(addDistrict.rejected, (state, action) => {
        state.districtFormLoader = false;
        state.districtFormError = action.payload.error;
      })
      .addCase(editDistrict.pending, (state) => {
        state.districtFormLoader = true;
        state.districtFormError = "";
      })
      .addCase(editDistrict.fulfilled, (state, action) => {
        state.districtFormLoader = false;
        state.districtFormError = action.payload.error;

        if (!action.payload.error) {
          state.districtFormValues = districtFormInitalValues;
          state.districtsScreenView = DISTRICTS_SCREEN_VIEW.TABLE;
          state.districtsScreenFormDBOperation = DISTRICTS_SCREEN_DB_OPERATIONS.ADD;
        }
      })
      .addCase(editDistrict.rejected, (state, action) => {
        state.districtFormLoader = false;
        state.districtFormError = action.payload.error;
      })
      .addCase(deleteDistrict.pending, (state) => {
        state.districtsLoader = true;
        state.districtsError = "";
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.districtsError = action.payload.error;
        if (action.payload.error) {
          state.districtsLoader = false;
        }
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.districtsLoader = false;
        state.districtsError = action.payload.error;
      });
  },
});

export const {
  resetPageStates,
  setDistrictsScreenView,
  setDistrictsScreenFormValues,
  setDistrictsScreenFormDBOperation,
} = districtsSlice.actions;

export default districtsSlice.reducer;
