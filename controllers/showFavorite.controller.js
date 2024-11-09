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
  findShowFavoritesByUserAndMovie: (req, res) => {
    const { userId, showId } = req.params

    ShowFavorite.findOne({
      createdBy: userId.trim(),
      showId: showId.trim(),
    })
      .then((showFavorite) => {
        if (showFavorite) {
          console.log(showFavorite)
          res.json(showFavorite)
        } else {
          res.status(400).json({ msseage: "showFavorite not found" })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  createNewShowFavorite: (req, res) => {
    const newShowFavoriteObj = new ShowFavorite(req.body)
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    })
    if (!decodedJWT || !decodedJWT.payload) {
      console.error("Invlaid token or missing payload")
      return res.status(401).json({ error: "Unauthorized" })
    }

    newShowFavoriteObj.createdBy = decodedJWT.payload.id
    newShowFavoriteObj
      .save()
      .then((newShowFavorite) => {
        console.log(newShowFavorite, "newShowFavorite")
        res.json(newShowFavorite)
      })
      .catch((err) => {
        console.log("Something went wrong in createNewShowFavorite")
        res.status(400).json(err)
      })
  },

  deleteShowFavorite: (req, res) => {
    ShowFavorite.deleteOne({ _id: req.params.id.trim() })
      .then((deletedShowFavorite) => {
        console.log(deletedShowFavorite)
        res.json(deletedShowFavorite)
      })
      .catch((err) => {
        console.log("deleteShowFavorite failed")
        res.json({
          message: "Something went wrong with deleteShowFavorite",
          error: err,
        })
      })
  },
}
