#! /usr/bin/env node
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */

console.log(
  'This script populates some test recipes, authors and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory_app?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const Author = require('./models/author');
const Category = require('./models/category');

const categories = [];
const authors = [];
const recipes = [];

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createAuthors();
  await createRecipes();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const genre = new Category({ name });
  await genre.save();
  categories[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function authorCreate(index, name, link_to_blog) {
  const authordetail = { name, link_to_blog };

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added author: ${name}`);
}

async function recipeCreate(index, title, description, link_to_recipe, author, category) {
  const recipedetail = {
    title,
    description,
    link_to_recipe,
    author,
  };
  if (category !== false) recipedetail.category = category;

  const recipe = new Recipe(recipedetail);
  await recipe.save();
  recipes[index] = recipe;
  console.log(`Added recipe: ${title}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(0, 'Breakfast'),
    categoryCreate(1, 'Lunch'),
    categoryCreate(2, 'Dinner'),
    categoryCreate(3, 'Dessert'),
  ]);
}

async function createAuthors() {
  console.log('Adding authors');
  await Promise.all([
    authorCreate(0, 'Nora Cooks', 'https://www.noracooks.com/'),
    authorCreate(1, 'Loving it Vegan', 'https://lovingitvegan.com/'),
    authorCreate(2, 'Domestic Gothess', 'https://domesticgothess.com/'),
  ]);
}

async function createRecipes() {
  console.log('Adding Books');
  await Promise.all([
    recipeCreate(
      0,
      'Vegan Strawberry Muffins',
      'These Vegan Strawberry Muffins are loaded with fresh strawberries and topped with a sweet, buttery crumble.',
      'https://www.noracooks.com/strawberry-muffins/',
      authors[0],
      [categories[0], categories[3]],
    ),
    recipeCreate(
      1,
      'Mexican Style Tofu Scramble',
      'Mexican style tofu scramble - this easy vegan spicy tofu scramble is a healthy meal packed full of protein, veggies, and most importantly, flavour! Served on toast it is great for breakfast, lunch or even dinner!',
      'https://domesticgothess.com/blog/2021/01/20/mexican-style-tofu-scramble/',
      authors[2],
      [categories[0], categories[1]],
    ),
    recipeCreate(
      2,
      'Vegan Tomato Soup',
      'This vegan tomato soup is rich, creamy and the best tomato soup you\'ve ever tasted. It\'s also hearty and satisfying and so easy to make.',
      'https://lovingitvegan.com/rich-creamy-tomato-soup/',
      authors[1],
      [categories[1], categories[2]],
    ),
  ]);
}
