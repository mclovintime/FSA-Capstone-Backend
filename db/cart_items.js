const client = require("./client");
const { getUserById } = require("./users");

async function getCartItemById(id) {
  const {
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

async function getCartItemsByUserId({ userId}) {
    const {id} = await getUserById(userId)
    
    const cartIds = await client.query(`
    SELECT cart.*
    FROM cart
    JOIN users ON cart."userId"=users.id
    WHERE "userId" = $1;
    `, [id])
 
   

    const userCartItems = await Promise.all(cartIds.map(
        cart => getCartItemsByCart( cart.id)
      ));
      console.log(userCartItems, "LINE 37, getCartItemsByUserId")
      return userCartItems
  }


async function getCartItemsByCart(id) {
    const {rows:cartItems} = await client.query(`
    SELECT *
    FROM cart_items
    WHERE "cartId"= $1;
    `, [id])
  
    
    return cartItems
    
  }


  async function getCartByUser(id) {
    try {
      const { rows: cartIds } = await client.query(`
      SELECT id 
      FROM cart 
      WHERE "userId"=$1;
      `, [id]);
      
     
      const carts = await Promise.all(cartIds.map(
        cart => getCartById( cart.id )
      ));
  console.log(carts, "THIS IS GET CART BY USER")
    } catch (error) {
      throw error;
    }
  }

async function addProductToCartItems({ productId, cartId, price, quantity }) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
        INSERT INTO cart_items("productId", "cartId", price, quantity)
        VALUES ($1, $2, $3, $4)
 
        RETURNING *;
      `,
      [productId, cartId, price, quantity]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function getAllCartItems() {
  const { rows:[cartItem] } = await client.query(
    `SELECT *
      FROM cart_items;`
  );

  return cartItem;
}

async function destroyCartItem(cartItemId) {
  try {
    const 
      {rows}
     = await client.query(`
      DELETE 
      FROM cart_items
      WHERE id = ${cartItemId}
      RETURNING *;
    `);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function updateCartItem({ id, ...fields }) {
  const { quantity } = fields;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
          UPDATE cart_items
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
        Object.values(fields)
      );
    }

    if (quantity === undefined) {
      return await getCartItemById(id);
    }

    return await getCartItemById(id);
  } catch (error) {
    throw error;
  }
}

async function updateItemQuantity({ id, upOrDown }) {
    
  
  
  
    try {
      
      const itemQuantity =  await client.query(
          `
            GET quantity
            FROM cart_items
            WHERE id=${id}
            RETURNING *;
          `,
          Object.values(fields)
        );
      console.log(itemQuantity, " this is itemQuantity")
  
      itemQuantity = itemQuantity + upOrDown
  await client.query(`
   UPDATE cart_items
   SET quantity = ${upOrDown}
   WHERE id=${id}
  `)
  
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
  updateCartItem,
  getCartItemsByCart,
  getCartItemsByUserId,
  updateItemQuantity
};
