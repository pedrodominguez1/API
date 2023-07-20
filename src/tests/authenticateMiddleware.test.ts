import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import authenticateMiddleware from "../middlewares/authenticate"

jest.mock("jsonwebtoken")

describe("authenticateMiddleware", () => {
  it("should return 401 if token is not provided in the headers", () => {
    const mockRequest = {
      headers: {
        // No token provided in the headers
      }
    } as Request

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    const mockNext = jest.fn()

    // Mockear jwt.verify para que arroje un error (token no proporcionado)
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new jwt.JsonWebTokenError("Token not provided")
    })

    authenticateMiddleware(mockRequest, mockResponse, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Token de autenticación no proporcionado."
    })
  })

  it("should return 500 if an unexpected error occurs", () => {
    const mockRequest = {
      headers: {
        authorization: "Bearer valid_token"
      }
    } as Request

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    const mockNext = jest.fn()

    // Mockear jwt.verify para que arroje un error inesperado
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Unexpected error")
    })

    authenticateMiddleware(mockRequest, mockResponse, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Error de autenticación."
    })
  })
})
