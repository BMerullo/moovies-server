const showWatchListController = require("../controllers/showWatchList.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
  app.get(
    "/api/user/showWatchList/:userId",
    showWatchListController.findAllShowWatchListsByUser
  )
  app.get(
    "/api/user/:userId/showWatchList/:showId",
    showWatchListController.findShowWatchListByUserAndMovie
  )
  app.post(
    "/api/showWatchList",
    authenticate,
    showWatchListController.createNewShowWatchList
  )
  app.delete(
    "/api/showWatchList/:id",
    showWatchListController.deleteShowWatchList
  )
}
