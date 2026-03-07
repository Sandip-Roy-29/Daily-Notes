import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
    default: {
        sign: jest.fn(),
    }
}))

const jwt = (await import("jsonwebtoken")).default;
const { User } = await import("../../../src/models/user.model.js");
import mongoose from "mongoose";

beforeEach(() => {
    jest.clearAllMocks();
})

it("should generate access token with correct payload", () => {
    process.env.ACCESS_TOKEN_SECRET = "secret";
    process.env.ACCESS_TOKEN_EXPIRY = "15m";

    jwt.sign.mockReturnValue("mockAccessToken");

    const user = new User({
        _id: "123",
        email: "test@gmail.com",
        username: "test"
    });

    const token = user.generateAccessToken();

    expect(jwt.sign).toHaveBeenCalledWith(
        {
            _id: user._id,
            email: user.email,
            username: user.username
        },
        "secret",
        {
            expiresIn: "15m",
        } 
    );
    expect(token).toBe("mockAccessToken");
})

it("should generate refresh token with correct payload", () => {
    process.env.REFRESH_TOKEN_SECRET = "secret";
    process.env.REFRESH_TOKEN_EXPIRY = "7d";

    jwt.sign.mockReturnValue("mockRefreshToken");

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "test@gmail.com",
        username: "test"
    });

    const token = user.generateRefreshToken();

    const callArgs = jwt.sign.mock.calls[0];

    const payload = callArgs[0];
    const secret = callArgs[1];
    const options = callArgs[2];

    expect(payload._id).toBeDefined();
    expect(payload._id).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(payload.jti).toBeDefined();
    expect(secret).toBe("secret");
    expect(options).toEqual({expiresIn: "7d"});
    expect(token).toBe("mockRefreshToken");
})
