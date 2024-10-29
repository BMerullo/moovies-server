const mongoose = require("mongoose")

const FavoriteSchema = new mongoose.Schema(
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

const Favorite = mongoose.model("Favorite", FavoriteSchema)

module.exports = Favorite
