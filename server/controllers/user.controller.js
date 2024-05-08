const userModel = require("../models/user.model.js");
const errorHandler = require("../utils/error.js");
const bcrypt = require("bcrypt");

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "You are allowed to update only your account!")
    );

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.SALT_ROUND)
      );
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser };
