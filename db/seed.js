const {
  createProduct,
  getAllProducts,
  getProductById,
  getAllUsers,
  createUser,
  createCart,
  getAllCarts,
  getAllCartItems,
  addProductToCartItems,
  getCartByUser,
  getCartItemsByCart
} = require("./index");
const client = require("./client");

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const Tyler = await createUser({
      username: "Tyler",
      password: "123",
      is_admin: true,
      email: "tyler1@gmail.com"
    });
    const Maaya = await createUser({
      username: "Maaya",
      password: "123",
      is_admin: true,
      email: "maaya1@gmail.com"

    });
    const Thomas = await createUser({
      username: "Thomas",
      password: "123",
      is_admin: true,
      email: "thomas1@gmail.com"

    });
    const Lucas = await createUser({
      username: "Lucas",
      password: "123",
      is_admin: true,
      email: "lucas1@gmail.com"

    });

    console.log(Tyler);
    console.log(Maaya);
    console.log(Thomas);
    console.log(Lucas);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const productsToCreate = [
      {
        name: "Dimensional Sunglasses",
        description: "Enjoy the view",
        stock: 4,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669084186/image_l3bwyl.png",
        price: 11999,
      },
      {
        name: "Super cool space car",
        description: "Fly in style",
        stock: 5,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669085856/sportscar_y6ctry.png",
        price: 39999,
      },
      {
        name: "Galactic Shower",
        description: "Find your moment of zen.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669086021/shower_zmyihh.png",
        price: 29999,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("products created:");
    console.log(products);

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialCarts() {
  console.log("starting to create cart...");

  const cartsToCreate = [
    {
      userId: 1,
      isActive: true,
    },
    {
      userId: 2,
      isActive: true,
    },
    {
      userId: 3,
      isActive: true,
    },
    {
      userId: 4,
      isActive: true,
    },
  ];

  const carts = await Promise.all(
    cartsToCreate.map((cart) => createCart(cart))
  );

  console.log("Carts Created: ", carts);
  console.log("Finished creating carts.");
}

async function createInitialCartItems() {
  console.log("starting to create cart items...");

  const cartItemsToCreate = [
    {
      cartId: 1,
      productId: 1,
      price: 11999,
      quantity: 1,
    },
    {
        cartId: 1,
        productId: 3,
        price: 29999,
        quantity: 1,
      },
    {
      cartId: 1,
      productId: 2,
      price: 39999,
      quantity: 1,
    },
    {
      cartId: 2,
      productId: 2,
      price: 39999,
      quantity: 1,
    },
    {
      cartId: 3,
      productId: 3,
      price: 29999,
      quantity: 1,
    },
    {
      cartId: 4,
      productId: 3,
      price: 29999,
      quantity: 1,
    },
  ];

  const cartItems = await Promise.all(
    cartItemsToCreate.map(addProductToCartItems)
  );

  console.log("Carts Created: ", cartItems);
  console.log("Finished creating carts.");
}

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          is_admin BOOLEAN DEFAULT false,
          email varchar(255) UNIQUE NOT NULL,
          address TEXT
        );
      `);
    //USE PENNIES FOR PRICE
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        description TEXT NOT NULL,
        stock INTEGER,
        image_url TEXT NOT NULL,
        price INTEGER
      );
      `);
//should default be true?
    await client.query(`
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isActive" BOOLEAN DEFAULT true
      );
      `);

    //USE PENNIES FOR PRICE
    await client.query(`
        CREATE TABLE cart_items (
          id SERIAL PRIMARY KEY,
          "cartId" INTEGER REFERENCES cart(id),
          "productId" INTEGER REFERENCES products(id),
          price INTEGER, 
          quantity INTEGER
        );
        `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    // await createInitialCarts();
    await createInitialCartItems();
    // await getCartByUser(1);
    // console.log("Testing Get Cart Items by Cart")
    // await getCartItemsByCart(1);
  
  } catch (error) {
    console.log("error during rebuildDB");
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("Calling getAllCarts");
    const carts = await getAllCarts();
    console.log("Result:", carts);

    console.log("Calling getAllCartItems");
    const cartItems = await getAllCartItems();
    console.log("Result:", cartItems);

    // console.log("testing getCartByUser")
    // const userCartTest = await getCartByUser(1);;
    // console.log("Result", userCartTest)

    // console.log("testing getCartItemsByCart")
    // const getTest = await getCartItemsByCart(1);
    // console.log("Result", getTest)
  

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
