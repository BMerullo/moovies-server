const mongoose = require("mongoose")

const ShowFavoriteSchema = new mongoose.Schema(
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
)

const ShowFavorite = mongoose.model("ShowFavorite", ShowFavoriteSchema)

module.exports = ShowFavorite
