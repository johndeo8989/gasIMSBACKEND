const {
  signup,
  login,
  verifyEmail,
  getUserById,
  updateUser,
  forget,
  reset,
} = require("../controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/AuthValidation");
const ensureAuthenticated = require("../middlewares/Auth");
const upload = require("../middlewares/upload");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/register", signupValidation, signup);
router.get("/verify-email", verifyEmail);
router.get("/getuser", ensureAuthenticated, getUserById);
router.put(
  "/updateuser",
  ensureAuthenticated,
  upload.single("photo"),
  updateUser
);
router.post("/forget-password", forget);
router.post("/reset-password/:token", reset);

module.exports = router;
