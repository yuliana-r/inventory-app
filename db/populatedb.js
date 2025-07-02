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

CREATE TABLE IF NOT EXISTS units (
  unit_id SERIAL PRIMARY KEY,
  name VARCHAR (20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (20) NOT NULL,
  qty NUMERIC(10,2),
  unit_id INTEGER,
  category_id INTEGER,
  brand_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories (category_id),
  FOREIGN KEY (brand_id) REFERENCES brands (brand_id),
  FOREIGN KEY (unit_id) REFERENCES units (unit_id)
);

INSERT INTO categories (name)
VALUES
('Cupboard'), ('Fridge'), ('Freezer');

INSERT INTO brands (name)
VALUES
('Sainsbury''s'), ('Tesco'), ('M & S'), ('Aldi');

INSERT INTO units (name)
VALUES
('g'), ('piece'), ('kg'), ('bag'), ('ml');

INSERT INTO items (name, qty, unit_id, category_id, brand_id)
VALUES
('flour', 700, 1, 1, 4),
('prawns', 1, 4, 3, 1),
('apples', 10, 2, 2, 2),
('potatoes', 2.5, 3, 1, 3);
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
