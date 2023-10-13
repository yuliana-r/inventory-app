/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
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
  const [allAuthors, allCategories] = await Promise.all([
    Author.find().exec(),
    Category.find().exec(),
  ]);

  res.render('recipe_form', {
    title: 'New recipe',
    authors: allAuthors,
    categories: allCategories,
  });
});

// Handle recipe create on POST.
exports.recipe_create_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  body('title', 'Title must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category.*').escape(),
  body('link_to_recipe', 'Link to recipe must not be empty').trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const recipe = new Recipe({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category,
      link_to_recipe: req.body.link_to_recipe,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allCategories] = await Promise.all([
        Author.find().exec(),
        Category.find().exec(),
      ]);

      for (const category of allCategories) {
        if (recipe.category.includes(category._id)) {
          category.checked = 'true';
        }
      }

      res.render('recipe_form', {
        title: 'New recipe',
        authors: allAuthors,
        categories: allCategories,
        recipe,
        errors: errors.array(),
      });
    } else {
      const recipeExists = await Recipe.findOne({ link_to_recipe: req.body.link_to_recipe }).exec();
      if (recipeExists) {
        res.redirect(recipeExists.url);
      } else {
        await recipe.save();
        res.redirect(recipe.url);
      }
    }
  }),
];

// Display recipe delete form on GET.
exports.recipe_delete_get = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id).exec();

  if (recipe === null) {
    const err = new Error('Recipe not found!');
    err.status = 404;
    return next(err);
  }

  res.render('recipe_delete', {
    title: 'Delete recipe',
    recipe,
  });
});

// Handle recipe delete on POST.
exports.recipe_delete_post = asyncHandler(async (req, res, next) => {
  await Recipe.findByIdAndRemove(req.body.recipeid).exec();
  res.redirect('/catalog/recipes');
});

// Display recipe update form on GET.
exports.recipe_update_get = asyncHandler(async (req, res, next) => {
  const [recipe, allAuthors, allCategories] = await Promise.all([
    Recipe.findById(req.params.id).populate('author').populate('category').exec(),
    Author.find().exec(),
    Category.find().exec(),
  ]);

  if (recipe === null) {
    const err = new Error('Recipe not found!');
    err.status = 404;
    return next(err);
  }

  for (const category of allCategories) {
    for (const recipe_cat of recipe.category) {
      if (category._id.toString() === recipe_cat._id.toString()) {
        category.checked = 'true';
      }
    }
  }

  res.render('recipe_form', {
    title: 'Update recipe',
    authors: allAuthors,
    categories: allCategories,
    link_to_recipe: recipe.link_to_recipe,
    recipe,
  });
});

// Handle recipe update on POST.
exports.recipe_update_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') {
        req.body.category = [];
      } else {
        req.body.category = new Array(req.body.category);
      }
    }
    next();
  },

  body('title', 'Title must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category.*').escape(),
  body('link_to_recipe', 'Link to recipe must not be empty').trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const recipe = new Recipe({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      category: typeof req.body.category === 'undefined' ? [] : req.body.category,
      link_to_recipe: req.body.link_to_recipe,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allCategories] = await Promise.all([
        Author.find().exec(),
        Category.find().exec(),
      ]);

      for (const category of allCategories) {
        if (recipe.category.indexOf(category._id) > -1) {
          category.checked = 'true';
        }
      }

      res.render('recipe_form', {
        title: 'Update recipe',
        authors: allAuthors,
        categories: allCategories,
        recipe,
        errors: errors.array(),
      });
    } else {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, recipe, {});
      res.redirect(updatedRecipe.url);
    }
  }),
];
