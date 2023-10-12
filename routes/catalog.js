/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const author_controller = require('../controllers/authorController');
const category_controller = require('../controllers/categoryController');

/// RECIPE ROUTER ///

// GET catalog home page.
router.get('/', recipe_controller.index);

// GET request for creating a recipe.
router.get('/recipe/create', recipe_controller.recipe_create_get);

// POST request for creating recipe.
router.post('/recipe/create', recipe_controller.recipe_create_post);

// GET request to delete recipe.
router.get('/recipe/:id/delete', recipe_controller.recipe_delete_get);

// POST request to delete recipe.
router.post('/recipe/:id/delete', recipe_controller.recipe_delete_post);

// GET request to update recipe.
router.get('/recipe/:id/update', recipe_controller.recipe_update_get);

// POST request to update recipe.
router.post('/recipe/:id/update', recipe_controller.recipe_update_post);

// GET request for one recipe.
router.get('/recipe/:id', recipe_controller.recipe_detail);

// GET request for list of all recipe items.
router.get('/recipes', recipe_controller.recipe_list);

/// AUTHOR ROUTES ///

// GET request for creating Author.
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create', author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

/// CATEGORY ROUTES ///

// GET request for creating a category.
router.get('/category/create', category_controller.category_create_get);

// POST request for creating category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all category.
router.get('/categories', category_controller.category_list);
