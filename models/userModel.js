const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "tell your name"],
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    required: [true, "provide your age"],
  },
  email: {
    type: String,
    required: [true, "provide your email"],
    validator: [validator.isEmail, "please provide a valid email"],
    unique: true,
    minlength: 4,
    lowercase: true,
  },
  picture: String,
  password: {
    type: String,
    required: [true, "provide your email"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "provide your passwordConfirm"],
    minlength: 8,
    validator: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password is not the same!",
    },
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
