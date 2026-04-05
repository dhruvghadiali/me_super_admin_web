import { createAsyncThunk } from "@reduxjs/toolkit";

import { schoolsAPIRoute } from "@/utils/apiRoutes";
import { API_RESPONSE_MESSAGES } from "@MEHelpers/enums";
import {
  setSchoolsInformation,
  setSchoolsTableRows,
} from "@MEUtils/apiResponse";
import { axiosInstance, apiResponseHaveData } from "@MEHelpers/axiosHelpers";

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

export { getschools };
