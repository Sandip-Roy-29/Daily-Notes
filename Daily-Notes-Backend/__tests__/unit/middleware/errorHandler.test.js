import { jest } from "@jest/globals";
import errorHandler from "../../../src/middlewares/error.middleware.js";
import { ApiError } from "../../../src/utils/ApiError.js";

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    jest.clearAllMocks();
});

it("should handle ApiError correcytly", () => {
    const err = new ApiError(400,"Invalid input");
    const req = {};
    const res = mockRes();
    const next =jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid input",
        errors: [],
    });
});

it("should handle error correctly in development mode", () => {
    process.env.NODE_ENV === "development";

    const err = new Error("Something broke while developing");
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Something broke while developing",
    });
});

it("should handle error correctly in test mode", () => {
    process.env.NODE_ENV === "test";

    const err = new Error("Something broke while testing");
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Something broke while testing",
    });
});

it("should handle error correctly in production mode", () => {
    process.env.NODE_ENV === "produntion";

    const err = new Error("Sensitive info");
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sensitive info",
    });
});