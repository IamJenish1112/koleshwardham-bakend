const mongoose = require("mongoose");
const User = require("./user.model");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const genSalt = await bcypt.genSalt(10);
    const hashPassword = await bcypt.hash(password, genSalt);

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


