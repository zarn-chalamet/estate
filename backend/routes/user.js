const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  user,
  refresh,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/user", validateToken, user);

router.post("/refresh", refresh);

module.exports = router;
