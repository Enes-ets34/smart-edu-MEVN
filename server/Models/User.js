const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CryptoJS = require("crypto-js");

// Set salt key to be used in password hashing
const _saltKey = "passB!tch";

const userSchema = new Schema({
  full_name: { type: String, required: true, trim: true },
  bio: { type: String, required: false, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  profile_image: { type: String },
  created_at: { type: Date, default: Date.now() },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Hash user's password with salt key before saving
userSchema.pre("validate", function (next) {
  if (!this.isModified("password")) return next();
  const user = this;
  user.password = CryptoJS.HmacSHA1(user.password, _saltKey).toString();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
