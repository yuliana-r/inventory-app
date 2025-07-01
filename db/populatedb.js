const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (20) NOT NULL
);

CREATE TABLE IF NOT EXISTS brands (
  brand_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (20) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (20) NOT NULL,
  qty INTEGER,
  category_id INTEGER,
  brand_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories (category_id),
  FOREIGN KEY (brand_id) REFERENCES brands (brand_id)
);

INSERT INTO categories (name)
VALUES
('Cupboard'), ('Fridge'), ('Freezer');

INSERT INTO brands (name)
VALUES
('Sainsbury''s'), ('Tesco'), ('M & S'), ('Aldi');

INSERT INTO products (name, qty, category_id, brand_id)
VALUES
('flour', 1, 1, 4),
('prawns', 1, 3, 1),
('cheese', 1, 2, 2);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
