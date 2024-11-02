const mongoose = require("mongoose")

const WatchListSchema = new mongoose.Schema(
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

const WatchList = mongoose.model("WatchList", WatchListSchema)

module.exports = WatchList
