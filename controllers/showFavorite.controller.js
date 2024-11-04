const ShowFavorite = require("../models/showFavorite.model")
const jwt = require("jsonwebtoken")

module.exports = {
  findAllShowFavoritesByUser: (req, res) => {
    ShowFavorite.find({ createdBy: req.params.userId.trim() })
      .then((allUserShowFavorites) => {
        console.log(allUserShowFavorites)
        res.json(allUserShowFavorites)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
}
