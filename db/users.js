const client = require("./client");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username  
          FROM users;
        `
  );

  return rows;
}

async function createUser({ username, password, is_admin }) {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password, is_admin )
          VALUES ($1, $2, $3)
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `,
      [username, bcryptPassword, is_admin]
    );
    
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password,}) {
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

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  getUser
}