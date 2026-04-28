import { createAsyncThunk } from "@reduxjs/toolkit";

import { facilityTypesAPIRoute } from "@MEUtils/apiRoutes";
import { setFacilityTypesInformation } from "@MEUtils/apiResponse";
import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEHelpers/axiosHelpers";

const getFacilityTypes = createAsyncThunk(
  "facilityTypes/getFacilityTypes",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`${facilityTypesAPIRoute}`, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          facilityTypes: setFacilityTypesInformation(response.data),
          error: "",
        };
      } else {
        return {
          facilityTypes: [],
          error:
            response && response.message
              ? response.message
              : "Failed to fetch facility types information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to fetch facility types information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { getFacilityTypes };