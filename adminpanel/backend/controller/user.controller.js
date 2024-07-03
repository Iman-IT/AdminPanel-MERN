const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const Userlogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, email, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(400).json({ error: error.message });
  }
};

const UserSignup = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
   address,phone,
  } = req.body;

  const image = req.file ? req.file.path : '';

  console.log('Signup request:', req.body, image);

  try {
    const user = await User.signup(
        name,
        email,
        password,
        role,
       address,phone,
        image
    );
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, email, token });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(400).json({ error: error.message });
  }
};
//get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user by id error:', error.message);
    res.status(400).json({ error: error.message });
  }
};


const updateUser = async (req, res) => {
  const { userId } = req.params;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "No such User" });
  }

  // Extract updated user data from the request body
  const { name, email, password, role, address, phone, image } = req.body;

  try {
    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password, role, address, phone, image },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "No such User" });
    }

    console.log("Updated user:", updatedUser);

    // Respond with the updated user information
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
};


const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "No such user" });
    }
    // Find the user by userId and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  Userlogin,
  UserSignup,
  getUsers,
  getUserById,
  updateUser,
  deleteUser

};


