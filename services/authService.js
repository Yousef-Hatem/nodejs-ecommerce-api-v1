const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");

const User = require("../models/userModel");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signup = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

const getToken = (req, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }
};

const getUser = async (userId, next) => {
  const user = await User.findById(userId);
  if (!user) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }
};

const checkIfUserChangeHisPassword = (user, decoded, next) => {
  if (user.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password, please login again..",
          401
        )
      );
    }
  }
};

exports.protect = asyncHandler(async (req, res, next) => {
  const token = getToken(req, next);

  const decoded = jwt.verify({ token }, process.env.JWT_SECRET_KEY);

  const currentUser = getUser(decoded.userId, next);

  checkIfUserChangeHisPassword(currentUser, decoded, next);

  req.user = currentUser;

  next();
});
