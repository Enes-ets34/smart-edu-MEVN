const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: String, required: true, trim: true },

  slug: { type: String, unique: true },
});
categorySchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
