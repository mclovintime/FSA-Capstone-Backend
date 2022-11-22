const { Client } = require("pg");
const bcrypt = require("bcrypt");

const client = new Client("postgres://localhost:5432/capstone");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username  
      FROM users;
    `
  );

  return rows;
}

async function createUser({ username, password, isAdmin }) {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, isAdmin )
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, bcryptPassword, isAdmin]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (validPassword) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id=${userId}`);
    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [userName]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: productIds } = await client.query(`
        SELECT id
        FROM products;
      `);
    const products = await Promise.all(
      productIds.map((product) => getProductById(product.id))
    );
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
  }
}

async function getProductById(productId) {
  const {
    rows: [product],
  } = await client.query(
    `
          SELECT *
          FROM products
          WHERE id=$1;
        `,
    [productId]
  );
  if (!product) {
    console.log("No Product found");
  } else {
    return product;
  }
}

async function createProduct({ name, description, inStock, image_url, price }) {
  const {
    rows: [products],
  } = await client.query(
    `
           INSERT INTO products(name, description, inStock, image_url, price)
           VALUES($1, $2, $3, $4, $5)
           RETURNING *;
           `,
    [name, description, inStock, image_url, price]
  );

  return products;
}

module.exports = {
  client,
  getAllUsers,
  createUser, 
  getUserById,
  getUserByUsername,
  getUser,
  getAllProducts,
  createProduct,
  
};
