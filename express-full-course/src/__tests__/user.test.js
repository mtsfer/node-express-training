const userController = require('../controllers/user-controller');
const User = require('../models/user');
const HttpError = require("../utils/http-error");
const {expect} = require("@jest/globals");

jest.mock("../utils/helpers.js");

describe("get user by id", () => {
    it("returns user when found by id", async () => {
        // Given
        const id = 1;
        const expected = {
            id: id,
            displayName: "John Smith",
            username: "john_smith",
            password: "john_pass123"
        };

        jest.spyOn(User, "findById").mockImplementationOnce(() => Promise.resolve(expected));

        // When
        const actual = await userController.getUserById(id);

        // Then
        expect(actual).toStrictEqual(expected);
    });

    it("fails when user not found", async () => {
        // Given
        const id = 99;
        const expected = new HttpError(404, "User not found");

        jest.spyOn(User, "findById").mockImplementationOnce(() => Promise.resolve(null));

        // When + Then
        await expect(userController.getUserById(id)).rejects.toThrow(expected);
    });
});

describe("create user", () => {
    it("creates an user when request body is valid", async () => {
        // Given
        const requestBody = {
            displayName: "John Smith",
            username: "john_smith",
            password: "john_pass123"
        };
        const expected = {
            displayName: "John Smith",
            username: "john_smith",
            password: "hashed_john_pass123"
        };

        jest.spyOn(User, "exists").mockImplementationOnce(() => Promise.resolve(false));
        jest.spyOn(User.prototype, "save").mockImplementationOnce(() => Promise.resolve(expected));

        // When
        const actual = await userController.createUser(requestBody);

        // Then
        expect(actual).toStrictEqual(expected);
    });

    it("fails when username already taken", async () => {
        // Given
        const requestBody = {
            displayName: "John Smith",
            username: "john_smith",
            password: "john_pass123"
        };
        const expected = new HttpError(409, "Username already taken");

        jest.spyOn(User, "exists").mockImplementationOnce(() => true);

        // When + Then
        await expect(userController.createUser(requestBody)).rejects.toThrow(expected);
    });
});

describe("update user", () => {
    it("updates an user when exists and request body is valid", async () => {
        // Given
        const id = 1;
        const expected = {
            displayName: "John Smith",
            username: "john_smith",
            password: "john_pass123"
        };

        jest.spyOn(User, "findById").mockImplementationOnce(() => Promise.resolve(new User(expected)));
        jest.spyOn(User.prototype, "save").mockImplementationOnce(() => Promise.resolve(expected));

        // When
        const actual = await userController.updateUser(id, expected);

        // Then
        expect(actual).toStrictEqual(expected);
    });

    it("fails when user not found", async () => {
        // Given
        const id = 99;
        const requestBody = {
            displayName: "John Smith",
            username: "john_smith",
            password: "john_pass123"
        };
        const expected = new HttpError(404, "User not found");

        jest.spyOn(User, "findById").mockImplementationOnce(() => Promise.resolve(null));

        // When + Then
        await expect(userController.updateUser(id, requestBody)).rejects.toThrow(expected);
    });
});
