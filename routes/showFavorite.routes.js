const showFavoriteController = require("../controllers/showFavorite.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
  app.get(
    "/api/user/showFavorite/:userId",
    showFavoriteController.findAllShowFavoritesByUser
  )
  app.get(
    "/api/user/:userId/showFavorite/:showId",
    showFavoriteController.findShowFavoritesByUserAndMovie
  )
  app.post(
    "/api/showFavorite",
    authenticate,
    showFavoriteController.createNewShowFavorite
  )
  app.delete("/api/showFavorite/:id", showFavoriteController.deleteShowFavorite)
}
