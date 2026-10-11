const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(wrapAsync(listingController.createListing));

// New Route
router.get("/new", listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(wrapAsync(listingController.updateListing))
  .delete(wrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", wrapAsync(listingController.renderEditForm));

module.exports = router;
