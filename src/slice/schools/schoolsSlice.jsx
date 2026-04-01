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

const schoolFormInitialValues = {
  name: "",
  shortName: "",
  email: "",
  phoneNumber: "",
  affiliateNumber: "",
  establishedYear: "",
  schoolType: "",
  educationBoards: [],
};

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    schoolFormValues: schoolFormInitialValues,
    organizationFormValues: organizationFormInitialValues,
    schoolFormOperationState: SCHOOL_FORM_OPERATION_STATES.ADD,
  },
  reducers: {
    setOrganizationFormValues: (state, action) => {
      state.organizationFormValues = action.payload;
    },
    setSchoolFormValues: (state, action) => {
      state.schoolFormValues = action.payload;
    },
    setSchoolFormOperationState: (state, action) => {
      state.schoolFormOperationState = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSchoolFormValues,
  setOrganizationFormValues,
  setSchoolFormOperationState,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
