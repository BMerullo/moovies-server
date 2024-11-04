const showFavoriteController = require("../controllers/showFavorite.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
  app.get(
    "/api/user/showFavorite/:userId",
    showFavoriteController.findAllShowFavoritesByUser
  )
}
