const { Client } = require("pg");
// const client = new Client("postgres://localhost:5432/capstone");


const client = new Client(process.env.DATABASE_URL
  || "postgres://localhost:5432/capstone"

);


module.exports = client

// postgres://capstone_5ccu_user:2WQSdawimzqTriuWvp2qUFGExPhqZ6SD@dpg-ce3q9ipa6gdru5kvcrig-a/capstone_5ccu