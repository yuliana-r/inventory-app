/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  description: { type: String, required: true, maxLenth: 250 },
  link_to_recipe: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

RecipeSchema.virtual('url').get(function () {
  return `/catalog/recipe/${this._id}`;
});

module.exports = mongoose.model('Recipe', RecipeSchema);
