import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_RESPONSE_MESSAGES } from "@MEHelpers/enums";
import {
  statesAPIRoute,
  schoolsAPIRoute,
  schoolTypesAPIRoute,
  organizationsAPIRoute,
  educationBoardsAPIRoute,
} from "@/utils/apiRoutes";
import {
  setSchoolsInformation,
  setSchoolsTableRows,
  setStatesInformation,
  setSchoolTypesDropdownOptions,
  setEducationBoardsDropdownOptions,
} from "@MEUtils/apiResponse";
import { axiosInstance, apiResponseHaveData, isAPIServedSuccessfully } from "@MEHelpers/axiosHelpers";

const getStates = createAsyncThunk(
  "schools/getStates",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`${statesAPIRoute}`, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          states: setStatesInformation(response.data),
          error: "",
        };
      } else {
        return {
          states: [],
          error:
            response && response.message
              ? response.message
              : "Failed to fetch states information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to fetch states information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const getSchoolTypes = createAsyncThunk(
  "schools/getSchoolTypes",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`${schoolTypesAPIRoute}`, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          schoolTypes: setSchoolTypesDropdownOptions(response.data),
          error: "",
        };
      } else {
        return {
          schoolTypes: [],
          error:
            response && response.message
              ? response.message
              : "Failed to fetch school types information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to fetch school types information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const getEducationBoards = createAsyncThunk(
  "schools/getEducationBoards",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`${educationBoardsAPIRoute}`, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          educationBoards: setEducationBoardsDropdownOptions(response.data),
          error: "",
        };
      } else {
        return {
          educationBoards: [],
          error:
            response && response.message
              ? response.message
              : "Failed to fetch education boards information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to fetch education boards information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const getschools = createAsyncThunk(
  "schools/getschools",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(schoolsAPIRoute, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          schools: setSchoolsInformation(response.data),
          tableRows: setSchoolsTableRows(response.data),
          error: "",
        };
      } else {
        return {
          schools: [],
          tableRows: [],
          error: "Schools information not available please try again later.",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        API_RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;
      return rejectWithValue({ error: errMsg });
    }
  },
);

const addSchool = createAsyncThunk(
  "schools/addSchool",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      // Use the pre-configured axios instance (baseURL + timeout + headers)
      const response = await axiosInstance.post(schoolsAPIRoute, payload, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        dispatch(getschools());
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to add school. Please try again.",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        API_RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;
      return rejectWithValue({ error: errMsg });
    }
  },
);

const editOrganization = createAsyncThunk(
  "schools/editOrganization",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(
        `${organizationsAPIRoute}/${payload.id}`,
        payload.data,
        {
          state: getState(),
        },
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(getschools());
        return { error: "" };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to edit organization. Please try again.",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        API_RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;
      return rejectWithValue({ error: errMsg });
    }
  },
);

const editSchool = createAsyncThunk(
  "schools/editSchool",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(
        `${schoolsAPIRoute}/${payload.id}`,
        payload.data,
        {
          state: getState(),
        },
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(getschools());
        return { error: "" };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to edit school. Please try again.",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        API_RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;
      return rejectWithValue({ error: errMsg });
    }
  },
);

export {
  getStates,
  addSchool,
  editSchool,
  getschools,
  getSchoolTypes,
  editOrganization,
  getEducationBoards,
};
