import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("mongoose", () => ({
    default: {
        connect: jest.fn(),
    }
}))

const mongoose = (await import("mongoose")).default;
const { default: connectDB } = await import("../../../src/db/index.js");

it("should connect to MongoDB successfully", async () => {
    mongoose.connect.mockResolvedValue({
        connection: { host: "localhost"},
    })

    await expect(connectDB()).resolves.not.toThrow();
    expect(mongoose.connect).toHaveBeenCalled();
})

it("should exit process if connection fails", async () => {
    mongoose.connect.mockRejectedValue(
        new Error("DB error")
    )

    await expect(connectDB()).rejects.toThrow("DB error");

})
