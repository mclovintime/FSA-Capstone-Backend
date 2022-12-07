const client = require("./client");

async function getAllCarts() {
  const { rows } = await client.query(
    `SELECT *
    FROM cart;`
  )

  return rows;
}

async function getCartById(cartId) {
  try {
    const { rows: [cart] } = await client.query(`
      SELECT id
      FROM cart
      WHERE id=$1;
    `, [cartId])

    if(!cart) {
      throw {
          name: "CartNotFoundError",
          message: "Could not find the cart with that ID"
      };
    } return cart;
  } catch (error) {
    console.error(error);
  }
}

async function getInactiveCartsByUserId(userId) {
  console.log(typeof userId, "line 32 user ID in DB")
  try {
    const { rows: carts } = await client.query(`
      SELECT *
      FROM cart
      WHERE "userId"=$1 AND "isActive"=false;
    `, [userId])

    console.log(carts, "DB CARTS LINE 39")
    if(!carts) {
      throw {
          name: "CartNotFoundError",
          message: "Could not find the cart with that ID"
      };
    } return carts;
  } catch (error) {
    console.error(error);
  }
}

async function getActiveCartByUserId(userId) {
  try {
    const { rows: [cart] } = await client.query(`
      SELECT id
      FROM cart
      WHERE "userId"=$1 AND "isActive"=true
    `, [userId])

    if(!cart) {
      throw {
          name: "CartNotFoundError",
          message: "Could not find the cart with that ID"
      };

    }
    console.log(cart.id)
     return cart.id;
  } catch (error) {
    console.error(error);
  }
}

async function deactivateCart(cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
              UPDATE CART
              SET "isActive"=false
              WHERE id =$1
              RETURNING *;
            `,[cartId]);
    return cart;
  } catch (error) {
    console.error(error);
  }
}


async function createCart(userId, isActive) {
  console.log(userId, "this is userId for createCart")
  
  const {
    rows: [cart],
  } = await client.query(
    `

       INSERT INTO cart("userId", "isActive")
       VALUES($1, $2)
       RETURNING *;
       `, [userId, isActive]);
     
       return cart
 }

 async function destroyCart(id) {
    try {
       
      const {rows: [cart]} = await client.query(`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *;
      `);
      return cart
    } catch (error) {
      console.error(error)
    }
  }




module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    destroyCart,
    getInactiveCartsByUserId,
    getActiveCartByUserId,
   deactivateCart
  };