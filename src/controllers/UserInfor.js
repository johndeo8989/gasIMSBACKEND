const UserModel = require("../models/User");

// ALL USER DATA
const AllUserData = async (req, res) => {
  try {
    const usersData = await UserModel.find();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// SINGLE USER DATA

const SingleUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await UserModel.findById(id);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({
      error: "Failed To Get User",
    });
  }
};

// UPDATE USER DATA

const UpdateUserData = async (req, res) => {
  const { id } = req.params;
  const { name, address, contactNumber, email } = req.body;
  try {
    const updatedData = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        address,
        contactNumber,
        email,
      },
      { new: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update user",
    });
  }
};

module.exports = {
  AllUserData,
  SingleUserData,
  UpdateUserData,
};
