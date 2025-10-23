const { asyncHandaler } = require("../utils/asyncHandaler");
const { apiResponse } = require("../utils/apiResponse");
const { CustomError } = require("../utils/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

// register
exports.userRegister = asyncHandaler(async (req, res) => {
  const { userName, email, password } = req.body;

  const checkUser = await userModel.findOne({ email });
  if (checkUser)
    throw new CustomError(401, "Email already exist. Try Another", null);

  const hasHPassword = await bcrypt.hash(password, 12);

  const newUser = new userModel({
    userName,
    email,
    password: hasHPassword,
  });

  const user = await newUser.save();
  if (!user) throw new CustomError(501, "Register failed");
  apiResponse.sendSucess(res, 200, "User register successfully", null);
});

// Login
exports.userLogin = asyncHandaler(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await userModel.findOne({ email });
  if (!checkUser)
    throw new CustomError(401, "User doesn't exist.! Register frist", null);
  // Check password is vaid or not
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword)
    throw new CustomError(401, "Invalid password!! try again", null);
  // Create token
  const token = jwt.sign(
    {
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
    },
    "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
    })
    .json({
      success: true,
      message: "Logged in successfully",
      data: {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
    });
});

// LogOut
exports.userLogOut = asyncHandaler(async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "LogOut in successfully",
  });
});

// auth middleware
exports.authMiddleware = asyncHandaler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) throw new CustomError(401, "Unauthorize user");
  const decodeToken = jwt.verify(token, "CLIENT_SECRET_KEY");
  apiResponse.sendSucess(res, 200, "Authenticated user", decodeToken);
});
