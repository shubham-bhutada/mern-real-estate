const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User Created Succcessfully')    
  } catch (error) {
    next(error)
  }
};

module.exports = { signup };
