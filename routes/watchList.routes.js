const watchListController = require("../controllers/watchList.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
  app.get(
    "/api/user/watchList/:userId",
    watchListController.findAllWatchListsByUser
  )
  app.get(
    "/api/user/:userId/watchList/:movieId",
    watchListController.findWatchListByUserAndMovie
  )
  app.post(
    "/api/watchlist",
    authenticate,
    watchListController.createNewWatchList
  )
  app.delete("/api/watchList/:id", watchListController.deleteWatchList)
}
