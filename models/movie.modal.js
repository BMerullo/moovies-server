const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema(
  {
    id: {
      type: String,
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
      minLength: [3, "Description must be at least 3 characters long!"],
      maxLength: [500, "Please keep your description under 500 characters"],
    },
    favorite: {
      type: Boolean,
    },
    watchList: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie
