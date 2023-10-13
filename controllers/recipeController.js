/* eslint-disable consistent-return */
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipe');
const Author = require('../models/author');
const Category = require('../models/category');

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numRecipes,
    numAuthors,
    numCategories,
  ] = await Promise.all([
    Recipe.countDocuments({}).exec(),
    Author.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'home',
    recipe_count: numRecipes,
    author_count: numAuthors,
    category_count: numCategories,
  });
});

// Display list of all recipes
exports.recipe_list = asyncHandler(async (req, res, next) => {
  const allRecipes = await Recipe.find({}, 'title author category')
    .sort({ title: 1 })
    .populate('author')
    .populate('category')
    .exec();

  res.render('recipe_list', { title: 'recipes', recipe_list: allRecipes });
});

// Display detail page for a specific recipe.
exports.recipe_detail = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate('author')
    .populate('category')
    .exec();

  if (recipe === null) {
    const err = new Error('Recipe not found.');
    err.status = 404;
    return next(err);
  }

  res.render('recipe_detail', {
    title: recipe.title,
    recipe,
  });
});

// Display recipe create form on GET.
exports.recipe_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Recipe create GET');
});

// Handle recipe create on POST.
exports.recipe_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Recipe create POST');
});

// Display recipe delete form on GET.
exports.recipe_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Recipe delete GET');
});

// Handle recipe delete on POST.
exports.recipe_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Recipe delete POST');
});

// Display recipe update form on GET.
exports.recipe_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Recipe update GET');
});

// Handle recipe update on POST.
exports.recipe_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Recipe update POST');
});
