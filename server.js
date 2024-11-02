const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")

require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use(cookieParser())

require("./config/mongoose.config")
require("./routes/user.routes")(app)
require("./routes/movie.routes")(app)
require("./routes/favorite.routes")(app)
require("./routes/watchList.routes")(app)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
