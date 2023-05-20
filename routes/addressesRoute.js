const express = require("express");

const authService = require("../services/authService");

const {
  getLoggedUserAddresses,
  addAddresses,
  removeAddresses,
} = require("../services/addressesService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router.route("/").get(getLoggedUserAddresses).post(addAddresses);

router.delete("/:addressesId", removeAddresses);

module.exports = router;
