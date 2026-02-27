import { validatePasswordStrength } from "../../../src/utils/passwordValidator.js";

it("should fail if password length is less than 8", () => {
    expect(() => validatePasswordStrength("Sort1"))
    .toThrow("Password must be at least 8 characters long");
})

it("should fail if password not contain one uppercase letter", () => {
    expect(() => validatePasswordStrength("securepass1"))
    .toThrow("Password must contain at least one uppercase letter");
})

it("should fail if password not contain at least one number", () => {
    expect(() => validatePasswordStrength("SecurePass"))
    .toThrow("Password must contain at least one number");
})