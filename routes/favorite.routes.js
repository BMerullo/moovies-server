const favoriteController = require("../controllers/favorite.controller")
const { authenticate } = require("../config/jwt.config")
const { deleteOne } = require("../models/favorite.model")

module.exports = (app) => {
  app.get(
    "api/user/favorite/:userId",
    favoriteController.findAllFavoritesByUser
  )
  app.post("/api/favorite", authenticate, favoriteController.createNewFavorite)
  app.delete("/api/favorite/:id", favoriteController.deleteFavorite)
}
