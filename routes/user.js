const express = require("express");
const {
  createUser,
  login,
  getMe,
  getUser,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").post(createUser).get(advancedResults(User), getUser);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
