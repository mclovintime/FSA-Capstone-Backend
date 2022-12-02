const client = require("./client");
const bcrypt = require("bcrypt");
const { createCart } = require("./cart");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, email 
          FROM users;
        `
  );

  return rows;
}

async function createUser({ username, password, is_admin, email }) {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password, is_admin, email )
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `,
      [username, bcryptPassword, is_admin, email]
    );

 console.log(user,"?????????????????")
  
  const cart = await createCart(user.id, true)
  console.log(cart, "!!!!!!!!!!!!!!!!!")
 
  
   
   
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

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE username=$1;
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getIdByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT id
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

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE email=$1;
        `,
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser( { id, ...fields }) {
  const {username, email, address} = fields;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
     await client.query(
      `
          UPDATE users
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
        Object.values(fields)
    );
     }
     if (username === undefined) {
      return await getUserById(id);
     }

    return await getUserById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  getUser,
  getIdByUsername,
  updateUser
};
