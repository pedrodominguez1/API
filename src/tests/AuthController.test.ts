import { Request, Response } from "express"
import { signUpController } from "../controllers/AuthController"
import { signUp } from "../services/AuthService"

jest.mock("../services/AuthService")

describe("signUpController", () => {
  it("should create a new user and return 201 status code", async () => {
    const mockRequest = {
      body: {
        email: "test@example.com",
        password: "test123"
      }
    } as Request

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    // Mockear la función signUp
    ;(signUp as jest.Mock).mockResolvedValue({
      _id: "mockedUserId",
      email: mockRequest.body.email
    })

    await signUpController(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      _id: "mockedUserId",
      email: mockRequest.body.email
    })
  })

  it("should return 500 status code if an error occurs", async () => {
    const mockRequest = {
      body: {
        email: "test@example.com",
        password: "test123"
      }
    } as Request

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    // Mockear la función signUp para que arroje un error
    ;(signUp as jest.Mock).mockRejectedValue(new Error("Error creating user"))

    try {
      await signUpController(mockRequest, mockResponse)
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Error creating user"
      })
    }
  })
})
