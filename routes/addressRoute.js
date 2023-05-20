const express = require("express");

const authService = require("../services/authService");

const {
  getLoggedUserAddresses,
  addAddress,
  removeAddress,
} = require("../services/addressService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router.route("/").get(getLoggedUserAddresses).post(addAddress);

router.delete("/:addressId", removeAddress);

module.exports = router;
