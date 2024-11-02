const WatchList = require("../models/watchList.model")
const jwt = require("jsonwebtoken") // Ensure the correct casing

module.exports = {
  findAllWatchListsByUser: (req, res) => {
    WatchList.find({ createdBy: req.params.userId.trim() })
      .then((allUserWatchLists) => {
        console.log(allUserWatchLists)
        res.json(allUserWatchLists)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  findWatchListByUserAndMovie: (req, res) => {
    const { userId, movieId } = req.params

    WatchList.findOne({ createdBy: userId.trim(), movieId: movieId.trim() })
      .then((watchList) => {
        if (watchList) {
          console.log(watchList)
          res.json(watchList)
        } else {
          res.status(404).json({ message: "WatchList not found" })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  createNewWatchList: (req, res) => {
    const newWatchListObj = new WatchList(req.body)
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    }) // Using lowercase 'jwt'

    if (!decodedJWT || !decodedJWT.payload) {
      console.error("Invalid token or missing payload")
      return res.status(401).json({ error: "Unauthorized" })
    }

    newWatchListObj.createdBy = decodedJWT.payload.id
    newWatchListObj
      .save()
      .then((newWatchList) => {
        console.log(newWatchList, "newWatchList")
        res.json(newWatchList)
      })
      .catch((err) => {
        console.log("Something went wrong in createNewWatchList")
        res.status(400).json(err)
      })
  },
  deleteWatchList: (req, res) => {
    WatchList.deleteOne({ _id: req.params.id.trim() })
      .then((deletedWatchList) => {
        console.log(deletedWatchList)
        res.json(deletedWatchList)
      })
      .catch((err) => {
        console.log("deletedWatchList Failed")
        res.json({
          message: "Something went wrong with deleteWatchList",
          error: err,
        })
      })
  },
}
