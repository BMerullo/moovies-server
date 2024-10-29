const Favorite = require("../models/favorite.model")
const jwt = require("jsonwebtoken")

module.exports = {
  findAllFavoritesByUser: (req, res) => {
    Favorite.find({ createdBy: req.params.userId })
      .then((allUserFavorites) => {
        console.log(allUserFavorites)
        res.json(allUserFavorites)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  createNewFavorite: (req, res) => {
    const newFavoriteObj = new Favorite(req.body)
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    })
    if (!decodedJWT || !decodedJWT.payload) {
      console.error("Invalid token or missing payload")
      return res.status(401).json({ error: "Unauthorized" })
    }

    newFavoriteObj.createdBy = decodedJWT.payload.id
    newFavoriteObj
      .save()
      .then((newFavorite) => {
        console.log(newFavorite, "newFavorite")
        res.json(newFavorite)
      })
      .catch((err) => {
        console.log("Something went wrong in createNewFavorite")
        res.status(400).json(err)
      })
  },

  deleteFavorite: (req, res) => {
    Favorite.deleteOne({ _id: req.params.id })
      .then((deletedFavorite) => {
        console.log(deletedFavorite)
        res.json(deletedFavorite)
      })
      .catch((err) => {
        console.log("deleteFavorite failed")
        res.json({
          message: "Something went wrong with deleteFavorite",
          error: err,
        })
      })
  },
}
