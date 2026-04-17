import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

import { stateFormInitalValues } from "@MEUtils/formInitialValues";
import {
  getStates,
  addState,
  editState,
  deleteState,
} from "@MERedux/states/statesAction";
import {
  STATES_SCREEN_VIEW,
  STATES_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";

export const statesSlice = createSlice({
  name: "states",
  initialState: {
    states: [],
    statesLoader: false,
    statesFormLoader: false,
    statesError: "",
    statesFormError: "",
    stateFormValues: stateFormInitalValues,
    statesScreenView: STATES_SCREEN_VIEW.TABLE,
    statesScreenFormDBOperation: STATES_SCREEN_DB_OPERATIONS.ADD,
  },
  reducers: {
    resetPageStates: (state) => {
      state.states = [];
      state.statesLoader = false;
      state.statesError = "";
      state.stateFormValues = stateFormInitalValues;
      state.statesScreenView = STATES_SCREEN_VIEW.TABLE;
      state.statesScreenFormDBOperation = STATES_SCREEN_DB_OPERATIONS.ADD;
    },
    setStatesScreenView: (state, action) => {
      state.statesScreenView = action.payload;
    },
    setStatesScreenFormDBOperation: (state, action) => {
      state.statesScreenFormDBOperation = action.payload;
    },
    setStatesScreenFormValues: (state, action) => {
      state.stateFormValues = action.payload;
      state.statesFormError = "";
      state.statesFormLoader = false;
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
      .addCase(addState.pending, (state) => {
        state.statesFormLoader = true;
        state.statesFormError = "";
      })
      .addCase(addState.fulfilled, (state, action) => {
        state.statesFormLoader = false;
        state.statesFormError = action.payload.error;

        if (!action.payload.error) {
          state.stateFormValues = stateFormInitalValues;
          state.statesScreenView = STATES_SCREEN_VIEW.TABLE;
          state.statesScreenFormDBOperation = STATES_SCREEN_DB_OPERATIONS.ADD;
        }
      })
      .addCase(addState.rejected, (state, action) => {
        state.statesFormLoader = false;
        state.statesFormError = action.payload.error;
      })
      .addCase(editState.pending, (state) => {
        state.statesFormLoader = true;
        state.statesFormError = "";
      })
      .addCase(editState.fulfilled, (state, action) => {
        state.statesFormLoader = false;
        state.statesFormError = action.payload.error;

        if (!action.payload.error) {
          state.stateFormValues = stateFormInitalValues;
          state.statesScreenView = STATES_SCREEN_VIEW.TABLE;
          state.statesScreenFormDBOperation = STATES_SCREEN_DB_OPERATIONS.ADD;
        }
      })
      .addCase(editState.rejected, (state, action) => {
        state.statesFormLoader = false;
        state.statesFormError = action.payload.error;
      })
      .addCase(deleteState.pending, (state) => {
        state.statesLoader = true;
        state.statesError = "";
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.statesError = action.payload.error;
        if (action.payload.error) {
          state.statesLoader = false;
        }
      })
      .addCase(deleteState.rejected, (state, action) => {
        state.statesLoader = false;
        state.statesError = action.payload.error;
      });
  },
});

export const {
  resetPageStates,
  setStatesScreenView,
  setStatesScreenFormValues,
  setStatesScreenFormDBOperation,
} = statesSlice.actions;

export default statesSlice.reducer;
