const {
  facebookLogin,
  facebookCallback,
} = require("../../controllers/facebookController");
const passport = require("../../auth/passport");
const generateState = require("../../helpers/generateState");

jest.mock("../../auth/passport");
jest.mock("../../helpers/generateState");

describe("Facebook Authentication Controllers", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      session: {},
      login: jest.fn((user, callback) => callback()),
    };
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("facebookLogin", () => {
    it("should generate state and call passport.authenticate", () => {
      const mockState = "randomStateString";
      generateState.mockReturnValue(mockState);
      const mockAuthenticate = jest.fn();
      passport.authenticate.mockReturnValue(mockAuthenticate);

      facebookLogin(req, res, next);

      expect(generateState).toHaveBeenCalled();
      expect(req.session.oauthState).toBe(mockState);
      expect(passport.authenticate).toHaveBeenCalledWith("facebook", {
        state: mockState,
      });
      expect(mockAuthenticate).toHaveBeenCalledWith(req, res, next);
    });

    it("should call next with an error if something goes wrong", () => {
      const error = new Error("Something went wrong");
      generateState.mockImplementation(() => {
        throw error;
      });

      facebookLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("facebookCallback", () => {
    it("should redirect to /questions on successful authentication", () => {
      const mockUser = { id: 1, name: "John Doe" };

      passport.authenticate.mockImplementation((strategy, callback) => {
        return (req, res, next) => {
          callback(null, mockUser, null);
        };
      });

      facebookCallback(req, res, next);
      req.login = jest.fn((user, callback) => callback(null));

      expect(passport.authenticate).toHaveBeenCalledWith(
        "facebook",
        expect.any(Function)
      );
      expect(req.login).toHaveBeenCalledWith(mockUser, expect.any(Function));
      expect(res.redirect).toHaveBeenCalledWith("/questions");
    });

    it("should redirect to /auth/facebook if authentication fails", () => {
      const mockAuthenticate = jest.fn((req, res, next) => {
        return (callback) => callback(null, false, null);
      });
      passport.authenticate.mockReturnValue(mockAuthenticate);

      facebookCallback(req, res, next);

      expect(passport.authenticate).toHaveBeenCalledWith(
        "facebook",
        expect.any(Function)
      );
      expect(res.redirect).toHaveBeenCalledWith("/auth/facebook");
    });

    it("should call next with an error if authentication throws an error", () => {
      const error = new Error("Authentication failed");
      const mockAuthenticate = jest.fn((req, res, next) => {
        return (callback) => callback(error, null, null);
      });
      passport.authenticate.mockReturnValue(mockAuthenticate);

      facebookCallback(req, res, next);

      expect(passport.authenticate).toHaveBeenCalledWith(
        "facebook",
        expect.any(Function)
      );
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with an error if req.login fails", () => {
      const mockUser = { id: 1, name: "John Doe" };
      const loginError = new Error("Login failed");
      req.login = jest.fn((user, callback) => callback(loginError));

      const mockAuthenticate = jest.fn((req, res, next) => {
        return (callback) => callback(null, mockUser, null);
      });
      passport.authenticate.mockReturnValue(mockAuthenticate);

      facebookCallback(req, res, next);

      expect(passport.authenticate).toHaveBeenCalledWith(
        "facebook",
        expect.any(Function)
      );
      expect(req.login).toHaveBeenCalledWith(mockUser, expect.any(Function));
      expect(next).toHaveBeenCalledWith(loginError);
    });
  });
});
