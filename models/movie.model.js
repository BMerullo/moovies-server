const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      max: [10],
    },
    comment: {
      type: String,
      minLength: [3, "Comment must be at least 3 characters long!"],
      maxLength: [500, "Please keep your comment under 500 characters"],
    },
    favorite: {
      type: Boolean,
    },
    watchList: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
)

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie
