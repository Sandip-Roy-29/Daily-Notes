import { ApiError } from "../utils/ApiError.js";

export const validatePasswordStrength = (password) => {
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    throw new ApiError(400, "Password must contain at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, "Password must contain at least one number");
  }

  return true;
};