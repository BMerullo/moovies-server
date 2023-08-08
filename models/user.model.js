const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const uniqueValidator = require("mongoose-unique-validator")

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Username is requires"],
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "An email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Your password must be at least 8 characters long"],
    },
  },
  { timestamp: true }
)
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value))

UserSchema.pre("validate", function (next) {
  console.log("invalidate")
  if (this.password !== this.confirmPassword) {
    this.invalidate("ConfirmPassword", "Password must match")
    console.log("Didnt match")
  }
  console.log(this.password, this.confirmPassword)
  next()
})

UserSchema.pre("save", function (next) {
  console.log("Pre save")
  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    console.log("In the hash")
    this.password = hashedPassword
    next()
  })
})
UserSchema.plugin(uniqueValidator, {
  message: "Already in use",
})
const User = mongoose.model("User", UserSchema)

module.exports = User
