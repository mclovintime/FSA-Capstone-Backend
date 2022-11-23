const client = require("./client");


async function getCartItemById(id)
{ const {
  rows: [cartItems],
} = await client.query(
  `
  SELECT *
  FROM cart_items
  WHERE id=$1;
`,
  [id]
);
if (!cartItems) {
  console.log("No cart items!");
} else {
  return cartItems;
}
}

async function addProductToCartItems({productId, cartId, price, quantity}) {
 
    try {
      const {rows: [cartItem]} = await client.query(`
        INSERT INTO cart_items("productId", "cartId", price, quantity)
        VALUES ($1, $2, $3, $4)
 
        RETURNING *;
      `, [productId, cartId, price, quantity]);
   
      return cartItem;
    } catch (error) {
      throw error;
    }
  
  }

  async function getAllCartItems() {
    const { rows } = await client.query(
      `SELECT *
      FROM cart_items;`
    )
  
    return rows;
  }

  async function destroyCartItem(id) {
    try {
   
      const {rows: [cartItem]} = await client.query(`
      DELETE FROM cart_items
      WHERE id = ${id}
      RETURNING *;
    `);
    return cartItem
     
   } catch (error) {
     console.error(error)
   }
  }


  async function updateCartItem({ id, ...fields }) {
    const {quantity} = fields;
    
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    
    
    try {
    
      if (setString.length > 0) {
        await client.query(`
          UPDATE cart_items
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
      }
    
      if (quantity === undefined) {
        return await getCartItemById(id);
      }
    
      return await getCartItemById(id);
    } catch (error) {
      throw error;
    }
    }


module.exports = {
    addProductToCartItems,
    getAllCartItems,
    destroyCartItem,
    getCartItemById,
    updateCartItem
}