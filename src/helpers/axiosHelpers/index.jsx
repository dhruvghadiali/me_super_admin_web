
import axios from "axios";
import { clearAuthData } from "@MEHelpers/authHelpers";
import { HTTP_STATUS_CODES, API_RESPONSE_MESSAGES } from "@/helpers/enums";

import _ from "lodash";

// API Configuration
const API_CONFIG = {
  BASE_URL_PUBLIC: import.meta.env.VITE_API_BASE_URL_PUBLIC,
  BASE_URL_ADMIN: import.meta.env.VITE_API_BASE_URL_ADMIN,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    CONTENT_TYPE: "application/json",
  },
  // Control automatic logout and redirect on unauthorized errors
  AUTO_LOGOUT_ON_UNAUTHORIZED: true,
};

// Authorization utility functions
const isAPIServedSuccessfully = (response) =>
  response &&
  response.status &&
  (response.status === HTTP_STATUS_CODES.OK ||
    response.status === HTTP_STATUS_CODES.CREATED);

// Check if API response contains data
const apiResponseHaveData = (response) =>
  response &&
  response.data &&
  Array.isArray(response.data) &&
  _.size(response.data) > 0 &&
  response.status &&
  (response.status === HTTP_STATUS_CODES.OK ||
    response.status === HTTP_STATUS_CODES.CREATED);

/**
 * Check if user is authorized based on response
 * @param {Object} response - Axios response object
 * @returns {boolean} - Whether user is authorized
 */
const isAuthorizedUser = (response) => {
  // Check if response indicates valid authorization
  if (!response) return false;

  // If 401 or 403, user is not authorized
  if (
    response.status === HTTP_STATUS_CODES.UNAUTHORIZED ||
    response.status === HTTP_STATUS_CODES.FORBIDDEN
  ) {
    return false;
  }

  // Check if response data indicates authorization issues
  const responseData = response.data;
  if (responseData && responseData.message) {
    const authErrorKeywords = [
      "unauthorized",
      "forbidden",
      "invalid token",
      "expired token",
    ];
    const message = responseData.message.toLowerCase();
    return !authErrorKeywords.some((keyword) => message.includes(keyword));
  }

  return true;
};

/**
 * Handle user logout and redirect
 * @param {string} redirectPath - Path to redirect to after logout
 */
const handleUnauthorizedUser = (redirectPath = "/signin") => {
  clearAuthData();

  // Dispatch sign out action if store is available
  // This will be handled by the Redux store when integrated

  // Redirect to sign-in page
  if (typeof window !== "undefined") {
    window.location.href = redirectPath;
  }
};

/**
 * Axios instance with standardized response format
 *
 * Returns consistent response structure:
 * {
 *   message: string,  // Success/error message
 *   status: number,   // HTTP status code
 *   data: array      // Response data (always array)
 * }
 *
 * @example
 * // Success response
 * {
 *   message: "Operation completed successfully",
 *   status: 200,
 *   data: [{ id: 1, name: "John" }]
 * }
 *
 * @example
 * // Error response
 * {
 *   message: "Unauthorized access",
 *   status: 401,
 *   data: []
 * }
 */
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL_ADMIN,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": API_CONFIG.HEADERS.CONTENT_TYPE,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = config.state;
    delete config.state;

    // Determine base URL based on callPublicAPI flag (default: false for student API)
    const callPublicAPI = config.callPublicAPI || false;
    config.baseURL = callPublicAPI
      ? API_CONFIG.BASE_URL_PUBLIC
      : API_CONFIG.BASE_URL_ADMIN;

    // Store auto-logout preference from config (can be overridden per request)
    if (config.autoLogoutOnUnauthorized === undefined) {
      config.autoLogoutOnUnauthorized = API_CONFIG.AUTO_LOGOUT_ON_UNAUTHORIZED;
    }

    if (
      state &&
      state.authentication &&
      state.authentication.token 
    ) {
      config.headers.Authorization = `Bearer ${state.authentication.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Response format: {message, status, data}
    if (response && response.status && isAPIServedSuccessfully(response)) {
      return {
        message:
          response.data?.message ||
          response.statusText ||
          API_RESPONSE_MESSAGES.SUCCESS,
        status: response.status,
        data: Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : response.data
              ? [response.data]
              : [],
      };
    }

    // Fallback for unsuccessful responses
    return {
      message:
        response?.data?.message ||
        response?.statusText ||
        API_RESPONSE_MESSAGES.UNKNOWN_ERROR,
      status: response?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      data: [],
    };
  },
  (error) => {
    // Enhanced error response format: {message, status, data}
    let standardizedErrorResponse = {
      message: API_RESPONSE_MESSAGES.UNKNOWN_ERROR,
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      data: [],
    };

    if (error && error.response) {
      const statusCode = error.response.status;

      // Handle authorization errors with automatic logout and redirect
      if (statusCode === HTTP_STATUS_CODES.UNAUTHORIZED) {
        // Check if auto-logout is enabled for this request
        const autoLogout = error.config?.autoLogoutOnUnauthorized !== false;

        if (autoLogout && !isAuthorizedUser(error.response)) {
          console.warn("User authorization failed - redirecting to sign-in");

          // Handle unauthorized user with cleanup and redirect
          handleUnauthorizedUser("/");

          // Return early with standardized unauthorized response
          return Promise.reject({
            message: API_RESPONSE_MESSAGES.UNAUTHORIZED,
            status: HTTP_STATUS_CODES.UNAUTHORIZED,
            data: [],
          });
        }
      }

      // Handle forbidden access (different from unauthorized)
      if (statusCode === HTTP_STATUS_CODES.FORBIDDEN) {
        console.warn("Access forbidden - user lacks required permissions");
      }

      // Extract error message from response or provide default based on status code
      let errorMessage =
        error.response.data?.message || error.response.statusText;

      // Provide user-friendly default messages for common HTTP status codes
      if (!errorMessage) {
        switch (statusCode) {
          case HTTP_STATUS_CODES.BAD_REQUEST:
            errorMessage = API_RESPONSE_MESSAGES.VALIDATION_ERROR;
            break;
          case HTTP_STATUS_CODES.UNAUTHORIZED:
            errorMessage = API_RESPONSE_MESSAGES.UNAUTHORIZED;
            break;
          case HTTP_STATUS_CODES.FORBIDDEN:
            errorMessage = API_RESPONSE_MESSAGES.ACCESS_DENIED;
            break;
          case HTTP_STATUS_CODES.NOT_FOUND:
            errorMessage = API_RESPONSE_MESSAGES.NOT_FOUND;
            break;
          case HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
            errorMessage = API_RESPONSE_MESSAGES.VALIDATION_ERROR;
            break;
          case HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
            errorMessage = API_RESPONSE_MESSAGES.RATE_LIMIT_EXCEEDED;
            break;
          case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
          case HTTP_STATUS_CODES.BAD_GATEWAY:
          case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
          case HTTP_STATUS_CODES.GATEWAY_TIMEOUT:
            errorMessage = API_RESPONSE_MESSAGES.SERVER_ERROR;
            break;
          default:
            errorMessage = `HTTP ${statusCode} Error`;
        }
      }

      standardizedErrorResponse = {
        message: errorMessage,
        status: statusCode,
        data: error.response.data?.data || [],
      };

      return Promise.reject(standardizedErrorResponse);
    }

    // Handle network connectivity errors
    if (error.request) {
      standardizedErrorResponse = {
        message: API_RESPONSE_MESSAGES.NETWORK_ERROR,
        status: HTTP_STATUS_CODES.NETWORK_ERROR,
        data: [],
      };
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout errors
      standardizedErrorResponse = {
        message: API_RESPONSE_MESSAGES.TIMEOUT_ERROR,
        status: HTTP_STATUS_CODES.GATEWAY_TIMEOUT,
        data: [],
      };
    } else if (error.message) {
      // Handle other request setup errors
      standardizedErrorResponse = {
        message: error.message || API_RESPONSE_MESSAGES.REQUEST_FAILED,
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        data: [],
      };
    }

    console.error("API Error Details:", {
      originalError: error,
      standardizedResponse: standardizedErrorResponse,
      timestamp: new Date().toISOString(),
    });

    return Promise.reject(standardizedErrorResponse);
  }
);

// Export enums and utilities for use in other components
export {
  API_CONFIG,
  axiosInstance,
  isAPIServedSuccessfully,
  handleUnauthorizedUser,
  apiResponseHaveData,
};
