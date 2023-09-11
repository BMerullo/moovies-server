const movieController = require("../controllers/movie.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
  app.get("/api/movie", movieController.findAllMovies)
  app.post("/api/movie", authenticate, movieController.createNewMovie)
  app.get("/api/user/movie/:userId", movieController.findAllMoviesByUser)
  app.get("/api/movie/:movieId", movieController.findOneMovie)
  app.put("/api/movie/:id", movieController.updateMovie)
  app.delete("/api/movie/:id", movieController.deleteMovie)
}
