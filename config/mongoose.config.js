const mongoose = require("mongoose")

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useunifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database called " + process.env.DB_NAME)
  })
  .catch((err) => {
    console.log(
      "There was an error connecting to the database" + process.env.DB_NAME
    )
    console.log(err)
  })
