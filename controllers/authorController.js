/* eslint-disable consistent-return */
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Author = require('../models/author');
const Recipe = require('../models/recipe');

// Display list of all authors
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ name: 1 }).exec();
  res.render('author_list', {
    title: 'authors',
    author_list: allAuthors,
  });
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, allRecipesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Recipe.find({ author: req.params.id }, 'title summary').exec(),
  ]);

  if (author === null) {
    const err = new Error('Author not found.');
    err.status = 404;
    return next(err);
  }

  res.render('author_detail', {
    title: author.name,
    author,
    author_recipes: allRecipesByAuthor,
  });
});

// Display Author create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.render('author_form', { title: 'New author' });
});

// Handle Author create on POST.
exports.author_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name must be specified.'),
  body('link_to_blog')
    .isLength({ min: 3 })
    .withMessage('Link to blog must be specified.'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      name: req.body.name,
      link_to_blog: req.body.link_to_blog,
    });

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'New author',
        author,
        errors: errors.array(),
      });
    } else {
      await author.save();
      res.redirect(author.url);
    }
  }),
];

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update GET');
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update POST');
});
