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
        if (userRecord === null) {
          res.status(400).json({ message: "Invalid login attempt" })
        } else {
          bcrypt
            .compare(req.body.password, userRecord.password)
            .then(() => {
              if (req.body.password === userRecord.password) {
                console.log("Password is valid")
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        id: userRecord._id,
                        email: userRecord.email,
                        username: userRecord.username,
                      },
                      process.env.JWT_SECRET
                    ),
                    {
                      httpOnly: true,
                      expires: new Date(Date.now() + 9000000),
                    }
                  )
                  .json({
                    message: "Successfully logged in",
                    userLoggedIn: userRecord.username,
                    userId: userRecord._id,
                  })
              } else {
                res.status(400).json({
                  message: "Password and/or email Invalid!",
                })
              }
            })
            .catch((err) => {
              console.log(err)
              res.status(400).json({
                message: "Invalid attempt",
              })
            })
        }
      })
      .catch((err) => {
        console.log("error")
        res.status(400).json({ message: "Invalid Attempt" })
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
