const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
  register: (req, res) => {
    console.log("In register")
    console.log(req.body)
    const user = new User(req.body)
    user
      .save()
      .then((newUser) => {
        console.log(newUser)
        res.json({
          successfulMessage: "Thank you for registering",
          user: newUser,
        })
      })
      .catch((err) => {
        console.log("Register was not successful")
        console.log(err)
        res.status(400).json(err)
      })
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        if (!userRecord) {
          return res.status(400).json({ message: "Invalid login attempt" })
        }

        // Compare the entered password with the hashed password in the database
        bcrypt
          .compare(req.body.password, userRecord.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ message: "Invalid email or password" })
            }

            console.log("Password is valid")

            // Create the JWT token
            const userToken = jwt.sign(
              {
                id: userRecord._id,
                email: userRecord.email,
                username: userRecord.username,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1h" } // Token expiry
            )

            // Set the token as a cookie
            res
              .cookie("usertoken", userToken, {
                httpOnly: true,
                secure: true, // Only send over HTTPS
                sameSite: "None", // Cross-origin cookie
                maxAge: 60 * 60 * 1000, // 1 hour
              })
              .json({
                message: "Successfully logged in",
                userLoggedIn: userRecord.username,
                userId: userRecord._id,
              })
          })
          .catch((err) => {
            console.error("Password comparison error:", err)
            res.status(400).json({ message: "Invalid login attempt" })
          })
      })
      .catch((err) => {
        console.error("Error finding user:", err)
        res.status(400).json({ message: "Invalid login attempt" })
      })
  },
  logout: (req, res) => {
    console.log("Logging out")
    res.clearCookie("usertoken")
    res.json({
      message: "You have successfully logged out",
    })
  },
  getOneUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((oneUser) => {
        console.log(oneUser)
        res.json(oneUser)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
}
