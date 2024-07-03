const express = require("express");
const {
  Userlogin,
  UserSignup,
  updateUser,
  getUserById,
  deleteUser,
  getUsers,
} = require("../controller/user.controller");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Define specific routes first
router.post("/signup", UserSignup);
router.post("/login", Userlogin);
router.get('/',getUsers)
router.put('/:userId', upload.single('file'), updateUser);
router.get('/:id', getUserById);
router.delete('/:userId', deleteUser);

module.exports = router;
