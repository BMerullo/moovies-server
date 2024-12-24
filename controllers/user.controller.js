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
    console.log("Login request received")

    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        if (!userRecord) {
          console.log("User not found")
          return res.status(400).json({ message: "Invalid login attempt" })
        }

        // Compare entered password with hashed password in the database
        bcrypt
          .compare(req.body.password, userRecord.password)
          .then((isMatch) => {
            if (!isMatch) {
              console.log("Password mismatch")
              return res
                .status(400)
                .json({ message: "Invalid email or password" })
            }

            console.log("Password is valid")

            // Generate JWT
            const userToken = jwt.sign(
              {
                id: userRecord._id,
                email: userRecord.email,
                username: userRecord.username,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1h" } // 1-hour token expiry
            )

            // Set cookie with token
            res
              .cookie("usertoken", userToken, {
                httpOnly: true,
                secure: true, // Send cookie only over HTTPS
                sameSite: "None", // Required for cross-origin cookies
                maxAge: 60 * 60 * 1000, // 1 hour
              })
              .json({
                message: "Successfully logged in",
                userLoggedIn: userRecord.username,
                userId: userRecord._id,
              })
          })
          .catch((err) => {
            console.error("Error during password comparison:", err)
            res.status(500).json({ message: "Internal server error" })
          })
      })
      .catch((err) => {
        console.error("Error during user lookup:", err)
        res.status(500).json({ message: "Internal server error" })
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
