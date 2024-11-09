const ShowWatchList = require("../models/showWatchList.model")
const jwt = require("jsonwebtoken")

module.exports = {
  findAllShowWatchListsByUser: (req, res) => {
    ShowWatchList.find({ createdBy: req.params.userId.trim() })
      .then((allUserShowWatchLists) => {
        console.log(allUserShowWatchLists)
        res.json(allUserShowWatchLists)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  findShowWatchListByUserAndMovie: (req, res) => {
    const { userId, showId } = req.params

    ShowWatchList.findOne({
      createdBy: userId.trim(),
      showId: showId.trim(),
    })
      .then((showWatchList) => {
        if (showWatchList) {
          console.log(showWatchList)
          res.json(showWatchList)
        } else {
          res.status(400).json({ message: "showWatchList not found" })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  createNewShowWatchList: (req, res) => {
    const newShowWatchListObj = new ShowWatchList(req.body)
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    })
    if (!decodedJWT || !decodedJWT.payload) {
      console.error("Invalid token or missing payload")
      return res.status(401).json({ error: "Unauthorized" })
    }

    newShowWatchListObj.createdBy = decodedJWT.payload.id
    newShowWatchListObj
      .save()
      .then((newShowWatchList) => {
        console.log(newShowWatchList, "newShowWatchList")
        res.json(newShowWatchList)
      })
      .catch((err) => {
        console.log("Something went wrong in createNewShowWatchList")
        res.status(400).json(err)
      })
  },

  deleteShowWatchList: (req, res) => {
    ShowWatchList.deleteOne({ _id: req.params.id.trim() })
      .then((deletedShowWatchList) => {
        console.log(deletedShowWatchList)
        res.json(deletedShowWatchList)
      })
      .catch((err) => {
        console.log("deletedShowWatchList failed")
        res.json({
          message: "Something went wrong with deleteShowWatchList",
          error: err,
        })
      })
  },
}
