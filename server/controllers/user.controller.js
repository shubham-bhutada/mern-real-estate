const listingModel = require("../models/listing.model.js");
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

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can oncly delete your own account!"));
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted successfully!");
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await listingModel.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

module.exports = { updateUser, deleteUser, getUserListings };
