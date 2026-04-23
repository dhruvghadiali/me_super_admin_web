import { createSlice } from "@reduxjs/toolkit";

import _, { set } from "lodash";

import {
  getStates,
  addSchool,
  editSchool,
  getschools,
  getSchoolTypes,
  editOrganization,
  getEducationBoards,
} from "@/slice/schools1/schoolsAction1";
import {
  SCHOOL_FORM_STEPERS,
  SCHOOL_INFORMATION_VIEW,
  SCHOOL_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  organizationFormInitialValues,
  organizationMembersInitialValues,
  schoolFormInitialValues,
  schoolAddressesInitialValues,
} from "@MEUtils/formInitialValues";





export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    states: [],
    statesLoader: false,
    statesError: "",
    educationBoards: [],
    educationBoardsLoader: false,
    educationBoardsError: "",
    schoolTypes: [],
    schoolTypesLoader: false,
    schoolTypesError: "",
    schools: [],
    schoolsLoader: false,
    schoolsError: "",
    schoolsInformationView: SCHOOL_INFORMATION_VIEW.TABLE,
    schoolsScreenDBOperation: SCHOOL_SCREEN_DB_OPERATIONS.VIEW,
    schoolsScreenDBOperationLoader: false,
    schoolsScreenDBOperationError: "",
    organizationFormValues: organizationFormInitialValues,
    organizationMembersFormValues: [organizationMembersInitialValues],
    schoolFormValues: schoolFormInitialValues,
    schoolAddressesFormValues: schoolAddressesInitialValues,
  },
  reducers: {
    resetFormValues: (state) => {
      state.organizationFormValues = organizationFormInitialValues;
      state.organizationMembersFormValues = [organizationMembersInitialValues];
      state.schoolFormValues = schoolFormInitialValues;
      state.schoolAddressesFormValues = schoolAddressesInitialValues;
    },
    setSchoolsInformationView: (state, action) => {
      state.schoolsInformationView = action.payload;
    },
    setschoolsScreenDBOperation: (state, action) => {
      state.schoolsScreenDBOperation = action.payload;
    },
    setOrganizationFormValues: (state, action) => {
      state.organizationFormValues = action.payload;
    },
    setOrganizationMembersFormValues: (state, action) => {
      state.organizationMembersFormValues = action.payload;
    },
    addOrganizationMember: (state) => {
      state.organizationMembersFormValues.push(organizationMembersInitialValues);
    },
    removeOrganizationMember: (state, action) => {
      state.organizationMembersFormValues.splice(action.payload, 1);
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
      .addCase(getSchoolTypes.pending, (state) => {
        state.schoolTypesLoader = true;
        state.schoolTypes = [];
        state.schoolTypesError = "";
      })
      .addCase(getSchoolTypes.fulfilled, (state, action) => {
        state.schoolTypesLoader = false;
        state.schoolTypes = action.payload.schoolTypes;
        state.schoolTypesError = action.payload.error;
      })
      .addCase(getSchoolTypes.rejected, (state, action) => {
        state.schoolTypesLoader = false;
        state.schoolTypes = [];
        state.schoolTypesError = action.payload.error;
      })
      .addCase(getEducationBoards.pending, (state) => {
        state.educationBoardsLoader = true;
        state.educationBoards = [];
        state.educationBoardsError = "";
      })
      .addCase(getEducationBoards.fulfilled, (state, action) => {
        state.educationBoardsLoader = false;
        state.educationBoards = action.payload.educationBoards;
        state.educationBoardsError = action.payload.error;
      })
      .addCase(getEducationBoards.rejected, (state, action) => {
        state.educationBoardsLoader = false;
        state.educationBoards = [];
        state.educationBoardsError = action.payload.error;
      })
      .addCase(getschools.pending, (state) => {
        state.schoolsLoader = true;
        state.schools = [];
        state.tableRows = [];
        state.schoolsError = "";
        state.schoolsInformationView = SCHOOL_INFORMATION_VIEW.TABLE;
      })
      .addCase(getschools.fulfilled, (state, action) => {
        state.schoolsLoader = false;
        state.schools = action.payload.schools;
        state.tableRows = action.payload.tableRows;
        state.schoolsError = action.payload.error;
      })
      .addCase(getschools.rejected, (state, action) => {
        state.schoolsLoader = false;
        state.schools = [];
        state.tableRows = [];
        state.schoolsError = action.payload.error;
      })
      .addCase(editOrganization.pending, (state) => {
        state.schoolsScreenDBOperationLoader = true;
        state.schoolsScreenDBOperationError = "";
      })
      .addCase(editOrganization.fulfilled, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(editOrganization.rejected, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      });
  },
});

export const {
  resetFormValues,
  setSchoolsInformationView,
  setOrganizationFormValues,
  setschoolsScreenDBOperation,
  setOrganizationMembersFormValues,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
