const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  img: String,
  created_at: { type: Date, default: Date.now() },
  slug: { type: String, unique: true },
});
courseSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
