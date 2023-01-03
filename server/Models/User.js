const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;
const CryptoJS = require("crypto-js");
const _saltKey = "passB!tch";

const userSchema = new Schema({
  full_name: { type: String, required: true, trim: true },
  bio: { type: String, required: false, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Category",
  },
  profile_image: { type: String },
  created_at: { type: Date, default: Date.now() },
  slug: { type: String, unique: true },
});
userSchema.pre("validate", function (next) {
  this.password = CryptoJS.HmacSHA1(this.password, _saltKey).toString();

  this.slug = slugify(this.full_name, {
    lower: true,
    strict: true,
  });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
