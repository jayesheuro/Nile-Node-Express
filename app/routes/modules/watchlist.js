const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const WatchlistRoutes = require('../../controllers/modules/watchlist');
router.use(bodyParser.json());

router.post('/watchlists', WatchlistRoutes.userWatchlist);
router.get('/', WatchlistRoutes.displayUserWatchlist);
router.put('/update/:ind', WatchlistRoutes.updateUserWatchlist);
router.delete('/delete/:product_id', WatchlistRoutes.deleteUserWatchlist);

module.exports = router;