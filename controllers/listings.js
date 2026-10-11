const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  let { category, search } = req.query;
  let filter = {};
  if (category && category !== "Trending") {
    filter.category = category;
  }
  if (search && search.trim() !== "") {
    filter.$or = [
      { title: { $regex: search.trim(), $options: "i" } },
      { location: { $regex: search.trim(), $options: "i" } },
      { country: { $regex: search.trim(), $options: "i" } }
    ];
  }
  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", {
    allListings,
    selectedCategory: category || "Trending",
    search: search || ""
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/show.ejs", { listing, mapToken: process.env.MAP_TOKEN });
};

module.exports.createListing = async (req, res) => {
  if (req.body.listing && typeof req.body.listing.image === "string") {
    req.body.listing.image = {
      filename: "listingimage",
      url: req.body.listing.image || "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60"
    };
  }
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid listing data");
  }
  if (typeof req.body.listing.image === "string") {
    req.body.listing.image = {
      filename: "listingimage",
      url: req.body.listing.image
    };
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
};
