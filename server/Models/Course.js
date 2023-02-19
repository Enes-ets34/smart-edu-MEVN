const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

// Define the schema for the Course model
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

// Set up a pre-validation hook to automatically generate the course slug
courseSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});

// Create the Course model from the schema
const Course = mongoose.model("Course", courseSchema);

// Export the Course model
module.exports = Course;
