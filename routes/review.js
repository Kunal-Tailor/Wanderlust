const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviews.js");

// Post Review
router.post("/", wrapAsync(reviewController.createReview));

// Delete Review
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;
