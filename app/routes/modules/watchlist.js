const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const WatchlistRoutes = require('../../controllers/modules/watchlist');
router.use(bodyParser.json());

router.post('/watchlists', WatchlistRoutes.userWatchlist);

module.exports = router;