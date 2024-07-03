require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer')
const path= require('path')
const UserRoutes = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

// Routes
app.use("/api/users", upload.single('image'), UserRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
