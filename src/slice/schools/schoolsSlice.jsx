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

const organizationMembersInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  position: "",
  aadhaarNumber: "",
  address: "",
  state: "",
  district: "",
  city: "",
  areaName: "",
  zipcode: "",
};

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    schoolFormValues: schoolFormInitialValues,
    organizationFormValues: organizationFormInitialValues,
    organizationMembersFormValues: [organizationMembersInitialValues],
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
    setOrganizationMembersFormValues: (state, action) => {
      state.organizationMembersFormValues = action.payload;
    },
    addOrganizationMember: (state) => {
      if (state.organizationMembersFormValues.length < 5) {
        state.organizationMembersFormValues.push(organizationMembersInitialValues);
      }
    },
    removeOrganizationMember: (state, action) => {
      const index = action.payload;
      if (state.organizationMembersFormValues.length > 1 && index >= 0 && index < state.organizationMembersFormValues.length) {
        state.organizationMembersFormValues.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSchoolFormValues,
  setOrganizationFormValues,
  setSchoolFormOperationState,
  setOrganizationMembersFormValues,
  addOrganizationMember,
  removeOrganizationMember,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
