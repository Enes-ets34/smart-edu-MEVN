const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CryptoJS = require("crypto-js");
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
userSchema.pre("validate", function (next) {
  this.password = CryptoJS.HmacSHA1(this.password, _saltKey).toString();

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
