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
      SELECT *
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
    destroyCart
  };