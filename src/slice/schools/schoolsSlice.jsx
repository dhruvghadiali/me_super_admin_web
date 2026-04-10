import { createSlice } from "@reduxjs/toolkit";

import {
  getStates,
  addSchool,
  getschools,
  getSchoolTypes,
  editOrganization,
  getEducationBoards,
} from "@MERedux/schools/schoolsAction";
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
    isSchoolFormValidated: false,
    organizationFormValues: organizationFormInitialValues,
    isOrganizationFormValidated: false,
    organizationMembersFormValues: [organizationMembersInitialValues],
    isOrganizationMembersFormValidated: false,
    schoolAddressesFormValues: [schoolAddressesInitialValues],
    isSchoolAddressesFormValidated: false,
    schoolAdminsFormValues: [schoolAdminsInitialValues],
    isSchoolAdminsFormValidated: false,
    schoolInformationView: SCHOOL_INFORMATION_VIEW.TABLE,
    schoolScreenDBOperation: SCHOOL_SCREEN_DB_OPERATIONS.VIEW,
    schoolScreenDBOperationLoader: false,
    schoolScreenDBOperationError: "",
    states: [],
    stateListLoader: false,
    schools: [],
    schoolListLoader: false,
    schoolListError: "",
    tableRows: [],
    schoolTypes: [],
    schoolTypeListLoader: false,
    educationBoards: [],
    educationBoardsLoader: false,
    addSchoolFormHasError: false,
    addSchoolError: "",
  },
  reducers: {
    resetFormValues: (state) => {
      state.schoolFormValues = schoolFormInitialValues;
      state.isSchoolFormValidated = false;
      state.organizationFormValues = organizationFormInitialValues;
      state.isOrganizationFormValidated = false;
      state.organizationMembersFormValues = [organizationMembersInitialValues];
      state.isOrganizationMembersFormValidated = false;
      state.schoolAddressesFormValues = [schoolAddressesInitialValues];
      state.isSchoolAddressesFormValidated = false;
      state.schoolAdminsFormValues = [schoolAdminsInitialValues];
      state.isSchoolAdminsFormValidated = false;
    },
    setOrganizationFormValues: (state, action) => {
      state.organizationFormValues = action.payload;
    },
    setOrganizationFormValidationStatus: (state, action) => {
      state.isOrganizationFormValidated = action.payload;
    },
    setSchoolFormValues: (state, action) => {
      state.schoolFormValues = action.payload;
    },
    setSchoolFormValidationStatus: (state, action) => {
      state.isSchoolFormValidated = action.payload;
    },
    setOrganizationMembersFormValues: (state, action) => {
      state.organizationMembersFormValues = action.payload;
    },
    setOrganizationMembersFormValidationStatus: (state, action) => {
      state.isOrganizationMembersFormValidated = action.payload;
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
    setSchoolAddressesFormValidationStatus: (state, action) => {
      state.isSchoolAddressesFormValidated = action.payload;
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
    setSchoolAdminsFormValidationStatus: (state, action) => {
      state.isSchoolAdminsFormValidated = action.payload;
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
      })
      .addCase(getStates.pending, (state) => {
        state.stateListLoader = true;
        state.states = [];
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.stateListLoader = false;
        state.states = action.payload.states;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.stateListLoader = false;
        state.states = [];
      })
      .addCase(getSchoolTypes.pending, (state) => {
        state.schoolTypeListLoader = true;
        state.schoolTypes = [];
      })
      .addCase(getSchoolTypes.fulfilled, (state, action) => {
        state.schoolTypeListLoader = false;
        state.schoolTypes = action.payload.schoolTypes;
      })
      .addCase(getSchoolTypes.rejected, (state, action) => {
        state.schoolTypeListLoader = false;
        state.schoolTypes = [];
      })
      .addCase(getEducationBoards.pending, (state) => {
        state.educationBoardsLoader = true;
        state.educationBoards = [];
      })
      .addCase(getEducationBoards.fulfilled, (state, action) => {
        state.educationBoardsLoader = false;
        state.educationBoards = action.payload.educationBoards;
      })
      .addCase(getEducationBoards.rejected, (state, action) => {
        state.educationBoardsLoader = false;
        state.educationBoards = [];
      })
      .addCase(addSchool.pending, (state) => {
        state.schoolScreenDBOperationLoader = true;
        state.addSchoolFormHasError = false;
        state.addSchoolError = "";
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.schoolScreenDBOperationLoader = false;
        state.addSchoolFormHasError = false;
        state.addSchoolError = "";
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.schoolScreenDBOperationLoader = false;
        state.addSchoolFormHasError = true;
        state.addSchoolError = action.payload.error;
      })
      .addCase(editOrganization.pending, (state) => {
        state.schoolScreenDBOperationLoader = true;
        state.schoolScreenDBOperationError = "";
      })
      .addCase(editOrganization.fulfilled, (state, action) => {
        state.schoolScreenDBOperationLoader = false;
        state.schoolScreenDBOperationError = action.payload.error;

        if (!action.payload.error) {
          state.schoolInformationView = SCHOOL_INFORMATION_VIEW.TABLE;
          state.schoolScreenDBOperation = SCHOOL_SCREEN_DB_OPERATIONS.VIEW;
        }
      })
      .addCase(editOrganization.rejected, (state, action) => {
        state.schoolScreenDBOperationLoader = false;
        state.schoolScreenDBOperationError = action.payload.error;
      });
  },
});

export const {
  addSchoolAdmin,
  resetFormValues,
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
  setSchoolFormValidationStatus,
  setOrganizationMembersFormValues,
  setOrganizationFormValidationStatus,
  setSchoolAdminsFormValidationStatus,
  setSchoolAddressesFormValidationStatus,
  setOrganizationMembersFormValidationStatus,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
