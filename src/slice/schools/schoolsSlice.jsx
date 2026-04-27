import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

import {
  getStates,
  addSchool,
  editSchool,
  getschools,
  getSchoolTypes,
  addSchoolAddress,
  editOrganization,
  editSchoolAddress,
  getEducationBoards,
  editSchoolAdminProfile,
} from "@MERedux/schools/schoolsAction";
import {
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
    isOrganizationFormValid: false,
    organizationMembersFormValues: [organizationMembersInitialValues],
    isOrganizationMembersFormValid: false,
    schoolFormValues: schoolFormInitialValues,
    isSchoolFormValid: false,
    schoolAddressesFormValues: [schoolAddressesInitialValues],
    isSchoolAddressesFormValid: false,
    isSchoolAdminsFormValidated: false,
    isFormHasError: false,
  },
  reducers: {
    resetFormValues: (state) => {
      state.organizationFormValues = organizationFormInitialValues;
      state.isOrganizationFormValid = false;
      state.organizationMembersFormValues = [organizationMembersInitialValues];
      state.isOrganizationMembersFormValid = false;
      state.schoolFormValues = schoolFormInitialValues;
      state.isSchoolFormValid = false;
      state.schoolAddressesFormValues = [schoolAddressesInitialValues];
      state.isSchoolAddressesFormValid = false;
      state.isSchoolAdminsFormValidated = false;
      state.isFormHasError = false;
    },
    setSchoolsInformationView: (state, action) => {
      state.schoolsInformationView = action.payload;
    },
    setSchoolsScreenDBOperation: (state, action) => {
      state.schoolsScreenDBOperation = action.payload;
    },
    setOrganizationFormValues: (state, action) => {
      state.organizationFormValues = action.payload;
    },
    setOrganizationFormValidationStatus: (state, action) => {
      state.isOrganizationFormValid = action.payload;
      state.isFormHasError = false;
    },
    setOrganizationMembersFormValues: (state, action) => {
      state.organizationMembersFormValues = action.payload;
    },
    setOrganizationMembersFormValidationStatus: (state, action) => {
      state.isOrganizationMembersFormValid = action.payload;
      state.isFormHasError = false;
    },
    addOrganizationMember: (state) => {
      state.organizationMembersFormValues = _.concat(
        state.organizationMembersFormValues,
        organizationMembersInitialValues,
      );
    },
    removeOrganizationMember: (state, action) => {
      _.pullAt(state.organizationMembersFormValues, action.payload);
    },
    setSchoolFormValues: (state, action) => {
      state.schoolFormValues = action.payload;
    },
    setSchoolFormValidationStatus: (state, action) => {
      state.isSchoolFormValid = action.payload;
      state.isFormHasError = false;
    },
    setSchoolAddressesFormValues: (state, action) => {
      state.schoolAddressesFormValues = action.payload;
    },
    setSchoolAddressesFormValidationStatus: (state, action) => {
      state.isSchoolAddressesFormValid = action.payload;
      state.isFormHasError = false;
    },
    addSchoolAddressForm: (state) => {
      state.schoolAddressesFormValues = _.concat(
        state.schoolAddressesFormValues,
        schoolAddressesInitialValues,
      );
    },
    removeSchoolAddress: (state, action) => {
      _.pullAt(state.schoolAddressesFormValues, action.payload);
    },
    setSchoolAdminsFormValidationStatus: (state, action) => {
      state.isSchoolAdminsFormValidated = action.payload;
      state.isFormHasError = false;
    },
    setFormHasError: (state, action) => {
      state.isFormHasError = action.payload;
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
      })
      .addCase(editSchool.pending, (state) => {
        state.schoolsScreenDBOperationLoader = true;
        state.schoolsScreenDBOperationError = "";
      })
      .addCase(editSchool.fulfilled, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(editSchool.rejected, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(addSchool.pending, (state) => {
        state.schoolsScreenDBOperationLoader = true;
        state.schoolsScreenDBOperationError = "";
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(editSchoolAddress.pending, (state) => {
        state.schoolsScreenDBOperationLoader = true;
        state.schoolsScreenDBOperationError = "";
      })
      .addCase(editSchoolAddress.fulfilled, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(editSchoolAddress.rejected, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(editSchoolAdminProfile.pending, (state) => {
        state.schoolsScreenDBOperationLoader = true;
        state.schoolsScreenDBOperationError = "";
      })
      .addCase(editSchoolAdminProfile.fulfilled, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(editSchoolAdminProfile.rejected, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(addSchoolAddress.pending, (state) => {
        state.schoolsScreenDBOperationLoader = true;
        state.schoolsScreenDBOperationError = "";
      })
      .addCase(addSchoolAddress.fulfilled, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
      .addCase(addSchoolAddress.rejected, (state, action) => {
        state.schoolsScreenDBOperationLoader = false;
        state.schoolsScreenDBOperationError = action.payload.error;
      })
  },
});

export const {
  resetFormValues,
  setSchoolsInformationView,
  setOrganizationFormValues,
  setOrganizationFormValidationStatus,
  setSchoolsScreenDBOperation,
  setOrganizationMembersFormValues,
  setOrganizationMembersFormValidationStatus,
  addOrganizationMember,
  removeOrganizationMember,
  setSchoolFormValues,
  setSchoolFormValidationStatus,
  setSchoolAddressesFormValues,
  setSchoolAddressesFormValidationStatus,
  addSchoolAddressForm,
  removeSchoolAddress,
  setSchoolAdminsFormValidationStatus,
  setFormHasError,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
