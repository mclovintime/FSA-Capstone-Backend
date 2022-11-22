const client = require("./client");

async function getCartByUser() {
  try {
    const {rows} = await client.query(`
        SELECT id
        FROM cart
        WHERE "userId" =${users.id}    
        `);
  } catch (error) {
    console.error(error);
  }
}
