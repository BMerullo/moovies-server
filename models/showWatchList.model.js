const mongoose = require("mongoose")

const ShowWatchListSchema = new mongoose.Schema(
  {
    showId: {
      type: Number,
    },
    name: {
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

const ShowWatchList = mongoose.model("ShowWatchList", ShowWatchListSchema)

module.exports = ShowWatchList
