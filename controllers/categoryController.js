/* eslint-disable consistent-return */
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Recipe = require('../models/recipe');

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ id: 1 }).exec();
  res.render('category_list', {
    title: 'categories',
    category_list: allCategories,
  });
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, recipesInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Recipe.find({ category: req.params.id }, 'title description').exec(),
  ]);

  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_detail', {
    title: 'category detail',
    category,
    category_recipes: recipesInCategory,
  });
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'New category' });
});

// Handle Category create on POST.
exports.category_create_post = [
  body('name', 'Category must contain at least 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Category name must be specified.')
    .isAlphanumeric()
    .withMessage('Category name has non-alphanumeric characters.'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'New category',
        category,
        errors: errors.array(),
      });
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allRecipesInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Recipe.find({ category: req.params.id }, 'title description').exec(),
  ]);

  if (category === null) {
    const err = new Error('Category not found.');
    err.status = 404;
    return next(err);
  }

  res.render('category_delete', {
    title: 'Delete category',
    category,
    category_recipes: allRecipesInCategory,
  });
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allRecipesInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Recipe.find({ category: req.params.id }, 'title description').exec(),
  ]);

  if (allRecipesInCategory.length > 0) {
    res.render('category_delete', {
      title: 'Delete category',
      category,
      category_recipes: allRecipesInCategory,
    });
  } else {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect('/catalog/categories');
  }
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error('Category not found!');
    err.status = 404;
    return next(err);
  }

  res.render('category_form', { title: 'Update category', category });
});

// Handle Category update on POST.
exports.category_update_post = [
  body('name', 'Category name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update category',
        category,
        errors: errors.array(),
      });
    } else {
      await Category.findByIdAndUpdate(req.params.id, category);
      res.redirect(category.url);
    }
  }),
];
