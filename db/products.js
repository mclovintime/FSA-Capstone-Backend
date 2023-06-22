const client = require("./client");

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
          SELECT *
          FROM products;
        `);

    console.log(rows);
    return rows;
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

async function createProduct({
  name,
  description,
  detailed_description,
  stock,
  image_url,
  price,
  category,
}) {
  const {
    rows: [products],
  } = await client.query(
    `
             INSERT INTO products(name, description, detailed_description, stock, image_url, price, category)
             VALUES($1, $2, $3, $4, $5, $6, $7)
             RETURNING *;
             `,
    [name, description, detailed_description, stock, image_url, price, category]
  );

  return products;
}

async function getProductByName(name) {
  const {
    rows: [product],
  } = await client.query(
    `
            SELECT *
            FROM products
            WHERE name=$1;
          `,
    [name]
  );

  if (!product) {
    console.log("no product");
  } else {
    return product;
  }
}

async function updateProduct({ id, ...fields }) {
  const {
    name,
    description,
    detailed_description,
    stock,
    image_url,
    price,
    category,
  } = fields;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
              UPDATE products
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
            `,
        Object.values(fields)
      );
    }

    if (name === undefined) {
      return await getProductById(id);
    }

    return await getProductById(id);
  } catch (error) {
    throw error;
  }
}

async function destroyProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(`
              DELETE FROM products
              WHERE id = ${id}
              RETURNING *;
            `);
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function getProductByCategory(category) {
  const {
    rows: [product],
  } = await client.query(
    `
          SELECT *
          FROM products
          WHERE category=$1;
        `,
    [category]
  );
  if (!product) {
    console.log("No Product found");
  } else {
    return product;
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  getProductByName,
  destroyProduct,
  getProductByCategory,
};
