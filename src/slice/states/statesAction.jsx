import { createAsyncThunk } from "@reduxjs/toolkit";

import { statesAPIRoute } from "@/utils/apiRoutes";
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

const addState = createAsyncThunk(
  "schools/addState",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`${statesAPIRoute}`, payload, {
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
              : "Failed to add state information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to add state information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const editState = createAsyncThunk(
  "schools/editState",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const { id, data } = payload;
      const response = await axiosInstance.put(
        `${statesAPIRoute}/${id}`,
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
              : "Failed to edit state information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to edit state information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const deleteState = createAsyncThunk(
  "schools/deleteState",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `${statesAPIRoute}/${payload}`,
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
              : "Failed to delete state information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to delete state information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { getStates, addState, editState, deleteState };
