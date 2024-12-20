const favoriteController = require("../controllers/favorite.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
  app.get(
    "/api/user/favorite/:userId",
    favoriteController.findAllFavoritesByUser
  )
  app.get(
    "/api/user/:userId/favorite/:movieId",
    favoriteController.findFavoriteByUserAndMovie
  )
  app.post("/api/favorite", authenticate, favoriteController.createNewFavorite)
  app.delete("/api/favorite/:id", favoriteController.deleteFavorite)
}
