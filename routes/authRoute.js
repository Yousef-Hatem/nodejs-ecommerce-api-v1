const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const { signup, login } = require("../services/authService");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);
// router
//   .route("/:id")
//   .get(getAuthValidator, getAuth)
//   .put(uploadAuthImage, resizeImage, updateAuthValidator, updateAuth)
//   .delete(deleteAuthValidator, deleteAuth);

module.exports = router;
