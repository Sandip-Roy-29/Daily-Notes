import { jest } from "@jest/globals";

// Mock jsonwebtoken
jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: jest.fn(),
  },
}));

// Mock User model
jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
  User: {
    findById: jest.fn(),
  },
}));

// Import AFTER mocking
const jwt = (await import("jsonwebtoken")).default;
const { User } = await import("../../../src/models/user.model.js");
const { verifyJWT } = await import("../../../src/middlewares/auth.middleware.js");
const { ApiError } = await import("../../../src/utils/ApiError.js");

// Test Setup
let req;
let res;
let next;

beforeEach(() => {
  req = {
    cookies: {},
    header: jest.fn(),
  };

  res = {};
  next = jest.fn();

  jest.clearAllMocks();
});

// Tests

it("should return 401 if no token provided", async () => {
  await verifyJWT(req, res, next);

  expect(next).toHaveBeenCalled();
  const error = next.mock.calls[0][0];
  expect(error).toBeInstanceOf(ApiError);
  expect(error.statusCode).toBe(401);
});

it("should attach user to req if token is valid", async () => {
  req.cookies.accessToken = "validToken";

  // Mock jwt.verify
  jwt.verify.mockReturnValue({ _id: "123" });

  // Mock User.findById().select()
  User.findById.mockReturnValue({
    select: jest.fn().mockResolvedValue({
      _id: "123",
      email: "test@gmail.com",
    }),
  });

  await verifyJWT(req, res, next);

  expect(jwt.verify).toHaveBeenCalled();
  expect(User.findById).toHaveBeenCalledWith("123");
  expect(req.user).toEqual({
    _id: "123",
    email: "test@gmail.com",
  });
  expect(next).toHaveBeenCalledWith();
});

it("should return 401 if token expired", async () => {
  req.cookies.accessToken = "ExpiredToken";

  jwt.verify.mockImplementation(() => {
    throw new Error("Expired access token");
  });

  await verifyJWT(req, res, next);

  expect(jwt.verify).toHaveBeenCalled();
  const error = next.mock.calls[0][0];
  expect(error).toBeInstanceOf(ApiError);
  expect(error.statusCode).toBe(401);
});

it("should return 401 if token invalid", async () => {
  req.cookies.accessToken = "InvalidToken";

  jwt.verify.mockImplementation(() => {
    throw new Error("Invalid access token");
  });

  await verifyJWT(req, res, next);

  expect(jwt.verify).toHaveBeenCalled();
  const error = next.mock.calls[0][0];
  expect(error).toBeInstanceOf(ApiError);
  expect(error.statusCode).toBe(401);
});