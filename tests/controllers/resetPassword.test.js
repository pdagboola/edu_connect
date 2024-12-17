const resetPassword = require("../../controllers/resetPasswordController");
const { getUserByEmail } = require("../../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const express = require("express");

jest.mock("../../models/userModel");
jest.mock("nodemailer");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.post("/auth/reset", resetPassword);

describe("resetPassword", () => {
  let sendMailMock;

  beforeEach(() => {
    sendMailMock = jest.fn();
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send a password reset email when the user exists", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    getUserByEmail.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue("mockedToken");

    const response = await request(app)
      .post("/auth/reset")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: "Password reset link sent to your email.",
    });

    expect(getUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    expect(sendMailMock).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: "Password Reset",
      html: expect.stringContaining("Click <a href="),
    });
  });

  it("should return 404 if the user is not found", async () => {
    getUserByEmail.mockResolvedValue(null);

    const response = await request(app)
      .post("/auth/reset")
      .send({ email: "nonexistent@example.com" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      data: "User not found",
    });

    expect(getUserByEmail).toHaveBeenCalledWith("nonexistent@example.com");
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("should return 500 if there is an error sending the email", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    getUserByEmail.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue("mockedToken");

    sendMailMock.mockRejectedValue(new Error("Email send error"));

    const response = await request(app)
      .post("/auth/reset")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      data: "Failed to send reset email.",
    });

    expect(sendMailMock).toHaveBeenCalled();
  });
});
