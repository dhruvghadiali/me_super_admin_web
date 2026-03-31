import { createSlice } from "@reduxjs/toolkit";

import { SCHOOL_FORM_OPERATION_STATES } from "@MEHelpers/enums";

const organizationFormInitialValues = {
  name: "",
  shortName: "",
  email: "",
  phoneNumber: "",
  governmentRegisterNumber: "",
  address: "",
  state: "",
  district: "",
  city: "",
  areaName: "",
  zipCode: "",
};

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    organizationFormValues: organizationFormInitialValues,
    schoolFormOperationState: SCHOOL_FORM_OPERATION_STATES.ADD,
  },
  reducers: {
    setOrganizationFormValues: (state, action) => {
      state.organizationFormValues = action.payload;
    },
    setSchoolFormOperationState: (state, action) => {
      state.schoolFormOperationState = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setOrganizationFormValues, setSchoolFormOperationState } =
  schoolsSlice.actions;

export default schoolsSlice.reducer;
