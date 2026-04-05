import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_RESPONSE_MESSAGES } from "@MEHelpers/enums";
import { schoolsAPIRoute, statesAPIRoute } from "@/utils/apiRoutes";
import {
  setSchoolsInformation,
  setSchoolsTableRows,
  setStatesInformation,
} from "@MEUtils/apiResponse";
import { axiosInstance, apiResponseHaveData } from "@MEHelpers/axiosHelpers";

const getStates = createAsyncThunk(
  "schools/getStates",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`${statesAPIRoute}`, {
        state: getState(),
        callPublicAPI: true,
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

export { getschools, getStates };
