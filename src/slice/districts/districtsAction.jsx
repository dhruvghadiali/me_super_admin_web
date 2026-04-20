import { createAsyncThunk } from "@reduxjs/toolkit";

import { statesAPIRoute, districtsAPIRoute } from "@/utils/apiRoutes";
import { setStatesInformation } from "@MEUtils/apiResponse";
import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEHelpers/axiosHelpers";

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

const addDistrict = createAsyncThunk(
  "schools/addDistrict",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`${districtsAPIRoute}`, payload, {
        state: getState(),
      });

      if (isAPIServedSuccessfully(response)) {
        dispatch(getStates());
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to add district information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to add district information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const editDistrict = createAsyncThunk(
  "schools/editDistrict",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const { id, data } = payload;
      const response = await axiosInstance.put(
        `${districtsAPIRoute}/${id}`,
        data,
        {
          state: getState(),
        },
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(getStates());
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to edit district information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to edit district information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const deleteDistrict = createAsyncThunk(
  "schools/deleteDistrict",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `${districtsAPIRoute}/${payload}`,
        {
          state: getState(),
        },
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(getStates());
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to delete district information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to delete district information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { getStates, addDistrict, editDistrict, deleteDistrict };
