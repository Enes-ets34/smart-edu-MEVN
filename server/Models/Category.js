const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");

// Define a new schema for the category collection
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  // The title of the category is required and should be trimmed to remove whitespace
  title: { type: String, required: true, trim: true },
  // The slug is derived from the title and is used in the URL to identify the category
  slug: { type: String, unique: true },
});

// Generate the slug before validating the category
categorySchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,  // Convert the slug to lowercase
    strict: true, // Remove any characters that aren't alphanumeric, underscores, or hyphens
  });
  next();
});

// Create a model from the category schema and export it
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
