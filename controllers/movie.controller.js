const Movie = require("../models/movie.model")
const jwt = require("jsonwebtoken")

module.exports = {
  findAllMovies: (req, res) => {
    Movie.find({})
      .populate("createdBy", "username_id")
      .then((allMovies) => {
        console.log(allMovies)
        res.json(allMovies)
      })
      .catch((err) => {
        res.json({ message: "Something went wrong in findAllMovies" })
      })
  },

  findAllMoviesByUser: (req, res) => {
    Movie.find({ createdBy: req.params.userId })
      .then((allUserMovies) => {
        console.log(allUserMovies)
        res.json(allUserMovies)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  findOneMovie: (req, res) => {
    Movie.findOne({ _id: req.params.id })
      .then((oneMovie) => {
        console.log(oneMovie)
        res.json(oneMovie)
      })
      .catch((err) => {
        console.log(err)
        res.json({
          message: "Soemthing went wrong in findOneMovie",
          error: err,
        })
      })
  },

  createNewMovie: (req, res) => {
    const newMovieObj = new Movie(req.body)
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    })
    newMovieObj
      .save()
      .then((newMovie) => {
        console.log(newMovie)
        res.json(newMovie)
      })
      .catch((err) => {
        console.log("Something went wrong in createNewMovie")
        res.json(400).json(err)
      })
  },

  updateMovie: (req, res) => {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedMovie) => {
        console.log(updatedMovie)
        res.json(updatedSetup)
      })
      .catch((err) => {
        res.status(400).json(err)
        res.json({ message: "Something went wrong in updateMovie", error: err })
      })
  },

  deleteSetup: (req, res) => {
    Movie.deleteOne({ _id: req.params.id })
      .then((deletedMovie) => {
        console.log(deletedMovie)
        res.json(deletedMovie)
      })
      .catch((err) => {
        console.log("deleteMovie failed")
        res.json({
          message: "Something went wrong with deleteMovie",
          error: err,
        })
      })
  },
}
