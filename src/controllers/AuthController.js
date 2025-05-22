const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
require("dotenv").config(); // Ensure dotenv is loaded at the top of the file

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }
    // Logic to save user to the database

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exists, You can Login",
        success: false,
      });
    }

    const verificationToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const userModal = new UserModel({
      name,
      email,
      password,
      verificationToken,
    });

    userModal.password = await bcrypt.hash(password, 10);
    await userModal.save();

    const verifyLink = `http://localhost:5173/reset-password?token=${verificationToken}`;

    const html = `
    <div style="font-family: 'Verdana', sans-serif; line-height: 1.8; color: #2C3E50; background-color: #F9F9F9; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #E74C3C; text-shadow: 1px 1px 2px #000;">gas IMS Email Verification</h2>
      <p>Hello <strong style="color: #3498DB;">${name}</strong>,</p>
      <p>Thank you for signing up. Please click the button below to verify your email address:</p>
      <a href="${verifyLink}" style="display: inline-block; padding: 12px 25px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 2px 2px 5px #888;">Verify Email</a>
      <p style="margin-top: 20px;">If you did not request this, please ignore this email.</p>
      <p style="font-style: italic; color: #8E44AD;">Best regards,<br><br><a href="https://www.netarioinnovations.com/" style="font-weight: bold;">Netario Innovations Team</a></p>
    </div>
    `;

    await sendEmail(email, "Verify Your Email", html);

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findOne({
      email: decode.email,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Token", success: false });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "Email is already verified", success: false });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({
      message: "Email Verified Successfully",
      success: true,
    });

    return res.redirect("http://localhost:5173/login");
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(400).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }
    // Logic to save user to the database

    const user = await UserModel.findOne({ email });

    const errMess = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errMess,
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({
        message: errMess,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "User Login successfully",
      success: true,
      jwtToken,
      email,
      role: user.role,
      name: user.name,
      id: user._id,
      address: user.address,
      contact: user.contactNumber,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error..." });
  }
};



const getUserById = async (req, res) => {
  try {
    const userId = req?.user?._id; // 👈 JWT se mila
    console.log("id____",userId);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("id____update",userId);

    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      dob: req.body.dob,
    };

    if (req.file) {
      updateData.photo = `http://localhost:8080/uploads/${req.file.filename}`;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

const forget = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 3600000;
  user.resetPasswordToken = token;
  user.resetPasswordExpires = expiry;
  await user.save();
  const resetLink = `http://localhost:5173/reset-password/${token}`;
  const html = `
   <div style="text-align: center;
        background-color: rgb(230, 230, 230);
        padding: 15px;
        font-family: sans-serif;
        border-radius: 10px;
        width:450px
        ;color:black
      "
    >
      <h1 style="color: rebeccapurple">Gas IMS</h1>
      <h2 style="font-weight: normal">Password Reset</h2>
      <p style="text-align: left; margin-bottom: 35px; font-size: small">
        It seems you forget your password, for gas IMS, if this is true, click
        below to reset your password.
      </p>
      <a
        href="${resetLink}"
        style="
          background-color: slateblue;
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-decoration: none;"
        >Reset Password</a>
      <p style="text-align: left; font-size: small; margin-top: 39px">
        If you did not forget/request for reset then you can safely ignore this
        email.
      </p>
      <p style="text-align: left; margin-top: 10px; font-size: 12px">
        Best regards,<br />
        <a
          style="color: blue; font-weight: bold; text-decoration: none"
          href="https://www.netarioinnovations.com/"
        >
          Netario Innovations Team
        </a>
      </p>
    </div>
    `;

  await sendEmail(email, "Reser Your Password", html);
  res.status(201).json({ message: "Sent Mail Successfully", success: true });
};
const reset = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res
    .status(201)
    .json({ message: "Reset Password Successfully", success: true });
};
module.exports = {
  signup,
  verifyEmail,
  login,
  getUserById,
  updateUser,
  forget,
  reset,
};
