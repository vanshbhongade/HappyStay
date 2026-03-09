const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const  {isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router
    .route("/")
    // Index route
    .get(wrapAsync(listingControllers.index))
    // create route
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync( listingControllers.createListing)
);


// new route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router
    .route("/:id")
    // show route
    .get(wrapAsync(listingControllers.showListing))
    // update route
    .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.updateListing)
    )
    // delete route
    .delete(
    isLoggedIn,
    wrapAsync(listingControllers.distroyListing ));


// Edit route
router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(listingControllers.eidtListing));



module.exports = router;