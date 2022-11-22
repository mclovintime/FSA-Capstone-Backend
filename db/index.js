const { Client } = require("pg");


const client = new Client("postgres://localhost:5432/capstone");



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
  getProductById,
  getAllProducts,
  createProduct,
  
};
