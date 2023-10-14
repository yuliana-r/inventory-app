/* eslint-disable consistent-return */
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Author = require('../models/author');
const Recipe = require('../models/recipe');

// Display list of all authors
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ name: 1 }).exec();
  res.render('author_list', {
    title: 'Authors',
    author_list: allAuthors,
  });
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, allRecipesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Recipe.find({ author: req.params.id }, 'title description').exec(),
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
      const authorExists = await Author.findOne({ link_to_blog: req.body.link_to_blog }).exec();
      if (authorExists) {
        res.redirect(authorExists.url);
      } else {
        await author.save();
        res.redirect(author.url);
      }
    }
  }),
];

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const [author, allRecipesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Recipe.find({ author: req.params.id }, 'title description').exec(),
  ]);

  if (author === null) {
    res.redirect('/catalog/authors');
  }

  res.render('author_delete', {
    title: 'Delete author',
    author,
    author_recipes: allRecipesByAuthor,
  });
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const [author, allRecipesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Recipe.find({ author: req.params.id }, 'title description').exec(),
  ]);

  if (allRecipesByAuthor.length > 0) {
    res.render('author_delete', {
      title: 'Delete author',
      author,
      author_recipes: allRecipesByAuthor,
    });
  } else {
    await Author.findByIdAndRemove(req.body.authorid);
    res.redirect('/catalog/authors');
  }
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  const author = await Author.findById(req.params.id).exec();

  if (author === null) {
    const err = new Error('Author not found');
    err.status = 404;
    return next(err);
  }

  res.render('author_form', { title: 'Update Author', author });
});

// Handle Author update on POST.
exports.author_update_post = [
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
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Update author',
        author,
        errors: errors.array(),
      });
    } else {
      await Author.findByIdAndUpdate(req.params.id, author);
      res.redirect(author.url);
    }
  }),
];
