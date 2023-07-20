"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../src/controllers/AuthController");
const AuthService_1 = require("../src/services/AuthService");
jest.mock("../src/services/AuthService");
describe("signUpController", () => {
    it("should create a new user and return 201 status code", async () => {
        const mockRequest = {
            body: {
                email: "test@example.com",
                password: "test123"
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        AuthService_1.signUp.mockResolvedValue({
            _id: "mockedUserId",
            email: mockRequest.body.email
        });
        await (0, AuthController_1.signUpController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            _id: "mockedUserId",
            email: mockRequest.body.email
        });
    });
    it("should return 500 status code if an error occurs", async () => {
        const mockRequest = {
            body: {
                email: "test@example.com",
                password: "test123"
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        AuthService_1.signUp.mockRejectedValue(new Error("Error creating user"));
        await (0, AuthController_1.signUpController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error creating user"
        });
    });
});
