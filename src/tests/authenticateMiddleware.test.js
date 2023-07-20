"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate_1 = __importDefault(require("../src/middlewares/authenticate"));
jest.mock("jsonwebtoken");
describe("authenticateMiddleware", () => {
    const mockRequest = {
        headers: {
            authorization: "Bearer mockToken"
        }
    };
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockNext = jest.fn();
    it("should call next() if a valid token is provided", () => {
        // Mockear jwt.verify para que no arroje errores
        ;
        jsonwebtoken_1.default.verify.mockReturnValue({});
        (0, authenticate_1.default)(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });
    it("should return 401 if token is not provided in the headers", () => {
        mockRequest.headers.authorization = undefined;
        (0, authenticate_1.default)(mockRequest, mockResponse, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Token de autenticación no proporcionado."
        });
    });
    it("should return 401 if token is invalid", () => {
        // Mockear jwt.verify para que arroje un error de token inválido
        ;
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new jsonwebtoken_1.default.JsonWebTokenError("Invalid token");
        });
        (0, authenticate_1.default)(mockRequest, mockResponse, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Token de autenticación inválido."
        });
    });
    it("should return 401 if token is expired", () => {
        // Mockear jwt.verify para que arroje un error de token expirado
        ;
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new jsonwebtoken_1.default.TokenExpiredError("Token expired", new Date(Date.now()));
        });
        (0, authenticate_1.default)(mockRequest, mockResponse, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Token de autenticación expirado."
        });
    });
    it("should return 500 if an unexpected error occurs", () => {
        // Mockear jwt.verify para que arroje un error inesperado
        ;
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error("Unexpected error");
        });
        (0, authenticate_1.default)(mockRequest, mockResponse, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error de autenticación."
        });
    });
});
