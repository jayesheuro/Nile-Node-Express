const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();

const WatchlistRoutes = require("../../controllers/modules/watchlist");
router.use(bodyParser.json());

const auth = require("../../services/auth/firebaseAuth");

router.post(
  "/watchlists",
  auth.checkAuthWithFirebase,
  WatchlistRoutes.userWatchlist
);
router.post(
  "/",
  auth.checkAuthWithFirebase,
  WatchlistRoutes.displayUserWatchlist
);
router.put(
  "/update/:ind",
  auth.checkAuthWithFirebase,
  WatchlistRoutes.updateUserWatchlist
);
router.post(
  "/delete/:product_id",
  auth.checkAuthWithFirebase,
  WatchlistRoutes.deleteUserWatchlist
);

module.exports = router;
