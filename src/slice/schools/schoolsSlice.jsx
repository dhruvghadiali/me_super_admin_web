import { createSlice } from "@reduxjs/toolkit";

import { getschools } from "@MERedux/schools/schoolsAction";
import {
  SCHOOL_INFORMATION_VIEW,
  SCHOOL_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";

const organizationFormInitialValues = {
  name: "",
  shortName: "",
  email: "",
  phoneNumber: "",
  governmentRegistrationNumber: "",
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

const schoolAddressesInitialValues = {
  address: "",
  state: "",
  district: "",
  city: "",
  area_name: "",
  zipcode: "",
};

const schoolAdminsInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    schoolFormValues: schoolFormInitialValues,
    organizationFormValues: organizationFormInitialValues,
    organizationMembersFormValues: [organizationMembersInitialValues],
    schoolAddressesFormValues: [schoolAddressesInitialValues],
    schoolAdminsFormValues: [schoolAdminsInitialValues],
    schoolInformationView: SCHOOL_INFORMATION_VIEW.TABLE,
    schoolScreenDBOperation: SCHOOL_SCREEN_DB_OPERATIONS.VIEW,
    schools: [],
    tableRows: [],
    schoolListError: "",
    schoolListLoader: false,
    addSchoolFormHasError: false,
  },
  reducers: {
    setOrganizationFormValues: (state, action) => {
      state.organizationFormValues = action.payload;
    },
    setSchoolFormValues: (state, action) => {
      state.schoolFormValues = action.payload;
    },
    setOrganizationMembersFormValues: (state, action) => {
      state.organizationMembersFormValues = action.payload;
    },
    addOrganizationMember: (state) => {
      if (state.organizationMembersFormValues.length < 5) {
        state.organizationMembersFormValues.push(
          organizationMembersInitialValues,
        );
      }
    },
    removeOrganizationMember: (state, action) => {
      const index = action.payload;
      if (
        state.organizationMembersFormValues.length > 1 &&
        index >= 0 &&
        index < state.organizationMembersFormValues.length
      ) {
        state.organizationMembersFormValues.splice(index, 1);
      }
    },
    setSchoolAddressesFormValues: (state, action) => {
      state.schoolAddressesFormValues = action.payload;
    },
    addSchoolAddress: (state) => {
      if (state.schoolAddressesFormValues.length < 5) {
        state.schoolAddressesFormValues.push(schoolAddressesInitialValues);
      }
    },
    removeSchoolAddress: (state, action) => {
      const index = action.payload;
      if (
        state.schoolAddressesFormValues.length > 1 &&
        index >= 0 &&
        index < state.schoolAddressesFormValues.length
      ) {
        state.schoolAddressesFormValues.splice(index, 1);
      }
    },
    setSchoolAdminsFormValues: (state, action) => {
      state.schoolAdminsFormValues = action.payload;
    },
    addSchoolAdmin: (state) => {
      if (state.schoolAdminsFormValues.length < 5) {
        state.schoolAdminsFormValues.push({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        });
      }
    },
    removeSchoolAdmin: (state, action) => {
      const index = action.payload;
      if (
        state.schoolAdminsFormValues.length > 1 &&
        index >= 0 &&
        index < state.schoolAdminsFormValues.length
      ) {
        state.schoolAdminsFormValues.splice(index, 1);
      }
    },
    setAddSchoolFormHasError: (state, action) => {
      state.addSchoolFormHasError = action.payload;
    },
    setSchoolInformationView: (state, action) => {
      state.schoolInformationView = action.payload;
    },
    setSchoolScreenDBOperation: (state, action) => {
      state.schoolScreenDBOperation = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getschools.pending, (state) => {
        state.schools = [];
        state.tableRows = [];
        state.schoolListError = "";
        state.schoolListLoader = true;
      })
      .addCase(getschools.fulfilled, (state, action) => {
        state.schools = action.payload.schools;
        state.tableRows = action.payload.tableRows;
        state.schoolListError = action.payload.error;
        state.schoolListLoader = false;
      })
      .addCase(getschools.rejected, (state, action) => {
        state.schools = [];
        state.tableRows = [];
        state.schoolListLoader = false;
        state.schoolListError = action.payload.error;
      });
  },
});

export const {
  addSchoolAdmin,
  addSchoolAddress,
  removeSchoolAdmin,
  setSchoolFormValues,
  removeSchoolAddress,
  addOrganizationMember,
  setSchoolInformationView,
  setAddSchoolFormHasError,
  removeOrganizationMember,
  setSchoolAdminsFormValues,
  setOrganizationFormValues,
  setSchoolScreenDBOperation,
  setSchoolAddressesFormValues,
  setOrganizationMembersFormValues,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
