const mongoose = require("mongoose");
const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// signup
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //check email password or name not empty
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, password and name are required",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }
    // check email is valid or not
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email is not valid",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }

    // check password is valid or not
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password is not valid",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }
    // check email is already exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exist",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }

    // hash password
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    // create user
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
    });

    return res.status(200).json({
      message: "User created",
      status: 1,
      items: [
        {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id,
        },
      ],
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      items: [],
      totalCount: 0,
      status: 0,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email and password not empty
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }

    // check email is valid or not
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Something Went Wrong",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }

    // check email is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Something Went Wrong",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }
    // check password is valid or not
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Something Went Wrong",
        status: 0,
        items: [],
        totalCount: 0,
      });
    }
    // generate token
    console.log("request reached");
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    // send response
    res.status(200).json({
      message: "Login Success",
      status: 1,
      items: [
        {
          name: user.name,
          email: user.email,
          id: user._id,
          token,
        },
      ],
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      items: [],
      totalCount: 0,
      status: 0,
    });
  }
};
