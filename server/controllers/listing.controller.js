const listingModel = require("../models/listing.model.js");
const errorHandler = require("../utils/error.js");

const createListing = async (req, res, next) => {
  try {
    const listing = await listingModel.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id != listing.userRef) {
      return next(errorHandler(401, "You can delete only your listings!"));
    }
    await listingModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully!");
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id != listing.userRef) {
      return next(errorHandler(401, "You can only update your own listing!"));
    }
    const updatedListing = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

module.exports = { createListing, deleteListing, updateListing };
