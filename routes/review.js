const express = require("express");
const router = express.Router({ mergeParams: true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor} =require("../middleware.js");

const reviewControllers = require("../controllers/reviews.js")

// Reviews
// Post Reviews Route
router.post("/",
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewControllers.createReview)
);

// Delete Reviews Route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview)
);


module.exports = router;