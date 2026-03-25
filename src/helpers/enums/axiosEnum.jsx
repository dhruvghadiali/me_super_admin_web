/**
 * Enumeration for HTTP status codes.
 */
const HTTP_STATUS_CODES = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  NETWORK_ERROR: 0,
});

/**
 * Enumeration for API response messages.
 */
const API_RESPONSE_MESSAGES = Object.freeze({
  SUCCESS: "Operation completed successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  VALIDATION_ERROR: "Please check your input and try again",
  UNAUTHORIZED: "You are not authorized to perform this action",
  ACCESS_DENIED: "Access denied - insufficient permissions",
  NOT_FOUND: "The requested resource was not found",
  SERVER_ERROR: "Internal server error - please try again later",
  NETWORK_ERROR: "Network error - unable to connect to server",
  REQUEST_FAILED: "Request failed - please try again",
  UNKNOWN_ERROR: "An unexpected error occurred",
  TIMEOUT_ERROR: "Request timeout - please try again",
  RATE_LIMIT_EXCEEDED: "Too many requests - please wait before trying again",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.", 
});

export { HTTP_STATUS_CODES, API_RESPONSE_MESSAGES };