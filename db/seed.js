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
        detailed_description: "These groundbreaking glasses will revolutionize your life! The Future-Gazer Glasses use cutting-edge technology to give you the power to see into the future. With these glasses, you can finally glimpse what lies ahead and take proactive measures to prepare for any surprises. Whether you're looking for career advice, planning your next vacation, or simply curious about what tomorrow holds, the Future-Gazer Glasses are an invaluable tool. Lightweight and comfortable, they offer a crystal clear view of the future so that you can make informed decisions with confidence. Take control of your future with the Future-Gazer Glasses!",
        stock: 4,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669084186/image_l3bwyl.png",
        price: 11999,
      },
      {
        name: "Super cool space car",
        description: "Fly in style",
        detailed_description: "This super cool space car is the perfect way to stand out from the crowd. It features a sleek and modern design that will make a bold statement wherever you go. The car is powered by an electric engine that produces zero emissions, making it eco-friendly and perfect for long trips. It has an advanced navigation system with real-time traffic updates so you can avoid any delays in your journey. Its interior is spacious and comfortable, featuring heated seats and air conditioning that ensures everyone inside stays comfortable during their travels. With its powerful engine, stylish design and advanced technology, this super cool space car is sure to make any trip exciting!",
        stock: 5,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669085856/sportscar_y6ctry.png",
        price: 39999,
      },
      {
        name: "Dimensional Chair",
        description: "Comfort out of this world",
        detailed_description: "This quantum microscope can dive deeper than any others that come before it.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669993521/chair_y2moxb.png",
        price: 249999,
      },
      {
        name: "Gravitational Boots",
        description: "Equipped with flotation circuits",
        detailed_description: "This quantum microscope can dive deeper than any others that come before it.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669993512/boots_zh8j7r.png",
        price: 149999,
      },
      {
        name: "Quantum Microscope",
        description: "You have to see it to believe it",
        detailed_description: "This quantum microscope can dive deeper than any others that come before it.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989244/microscope_twb9yj.png",
        price: 49999,
      },
      {
        name: "Robot Assistant",
        description: "He makes mean sandwiches",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669086021/shower_zmyihh.png",
        price: 129999,
      },
      {
        name: "Time Machine",
        description: "Careful with the time space continuum",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 3,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989961/time_machine_aefjn2.png",
        price: 199999,
      },
      {
        name: "Ingredients for Life",
        description: "For spreading life throughout the galaxy",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989984/growinglife_r5ewpr.png",
        price: 19999,
      },
      {
        name: "Space Rocks",
        description: "Rare minerals from outer asteroid clusters",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989976/comet_minerals_t7xgde.png",
        price: 70999,
      },

      {
        name: "Planet Investigator",
        description: "For initial planet research",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989955/planet_investigator_liilxk.png",
        price: 119999,
      },
      {
        name: "Entanglement Teleporter",
        description: "Convenient Transportation",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989943/teleporter_livjs2.png",
        price: 319999,
      },
      {
        name: "Space Station Beam",
        description: "Can zip you right up to orbit in an instant.",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989950/space_platform_q1acop.png",
        price: 1799999,
      },
      {
        name: "Actual Universal Remote",
        description: "It can genuinely control physics",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669990623/Literally_universal_remote_gq9hp6.png",
        price: 550799999,
      },
      {
        name: "Stone-cutting Laser",
        description: "Cuts any stone with perfect precision.",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669991014/cutting_laser_xjh2bv.png",
        price: 399999,
      },
      {
        name: "Spectrometer Diamond",
        description: "Radiates with the full spectrum",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669991093/gem_bzwh5s.png",
        price: 1000000,
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
          email varchar(255) UNIQUE NOT NULL
        );
      `);
    //USE PENNIES FOR PRICE
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        description TEXT NOT NULL,
        detailed_description TEXT NOT NULL,
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
  
    console.log("Testing Get Cart Items by Cart")
  
  
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
