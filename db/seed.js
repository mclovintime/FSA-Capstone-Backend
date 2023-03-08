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
      email: "tyler1@gmail.com",
      address: "1 East Ave New Orleans, LA 70032 USA"
    });
    const Maaya = await createUser({
      username: "Maaya",
      password: "123",
      is_admin: true,
      email: "maaya1@gmail.com",
      address: "1 West Ave Chicago, IL 60647 USA"


    });
    const Thomas = await createUser({
      username: "Thomas",
      password: "123",
      is_admin: true,
      email: "thomas1@gmail.com",
      address: "1 South Ave JacksonVille, FL 32034 USA"


    });
    const Lucas = await createUser({
      username: "Lucas",
      password: "123",
      is_admin: true,
      email: "lucas1@gmail.com",
      address: "1 North Ave Salt Lake City, UT 84407 USA"


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
        category: "accessories"
      },
     
      {
        name: "Galactic Shower",
        description: "Find Your Zen",
        detailed_description: "This modern shower head will take you to the stars and beyond! The Galaxy Shower Head is a unique and luxurious shower experience that eliminates pain and discomfort. Its unique design features a powerful, soothing rainfall effect with hundreds of tiny nozzles that provide a gentle massage to your back, neck, and shoulders. Its chrome finish adds a touch of style to your bathroom, while its anti-clog nozzles help reduce buildup for easy maintenance. Plus, it's equipped with adjustable settings so you can customize your shower experience any way you want. Get ready for an out-of-this-world experience with the Galaxy Shower Head!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669086021/shower_zmyihh.png",
        price: 249999,
        category: "household"

      },
      {
        name: "Dimensional Chair",
        description: "Comfort out of this world",
        detailed_description: "Introducing the Dimensional Chair, the latest in seating technology! This sleek and stylish chair has been designed to provide you with unparalleled comfort and luxury. It features an adjustable backrest that automatically adjusts to your body's shape, allowing for maximum support. The armrests feature built-in massage technology, allowing for targeted relaxation at the end of a long day. The contoured seat is ergonomically designed to reduce pressure points and alleviate back pain. With its futuristic design and cutting-edge features, the Dimensional Chair is sure to take your seating experience to the next level!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669993521/chair_y2moxb.png",
        price: 249999,
        category: "household"

      },
      {
        name: "Gravitational Boots",
        description: "Now with flotation circuits",
        detailed_description: "Introducing the latest in anti-gravity technology! Our anti-gravity boots are your ticket to a magical experience like no other. With these boots, you can defy gravity and soar through the air with ease. Our boots feature a cutting-edge design that utilizes powerful magnetic fields to help you take off and stay afloat. The sleek and comfortable design ensures that you can enjoy hours of fun without feeling weighed down or uncomfortable. With our anti-gravity boots, sky's the limit!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669993512/boots_zh8j7r.png",
        price: 149999,
        category: "apparel"

        
      },
      {
        name: "Quantum Microscope",
        description: "See it to believe it",
        detailed_description: "The Quantum Microscope is the latest advancement in microscopy technology. With unmatched accuracy and precision, this state-of-the-art device can magnify objects and particles to levels never before seen. Utilizing a combination of advanced optics, lasers, and quantum imaging techniques, it can detect features as small as 1 nanometer with astonishing clarity. Its flexible design allows for easy integration with existing lab equipment, making it an ideal tool for researchers in fields such as material science, nanotechnology, and biophysics. Whether you need to analyze particles or observe ultra-small biological structures such as viruses or bacteria, the Quantum Microscope will provide unparalleled imaging capabilities for a wide range of applications.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989244/microscope_twb9yj.png",
        price: 49999,
        category: "household"

      },
      {
        name: "Robot Assistant",
        description: "He makes mean sandwiches",
        detailed_description: "Introducing the newest and most advanced robotic assistant, the Robo-Aid! This powerful robot is designed to make your life easier and more efficient. With its advanced artificial intelligence and voice recognition capabilities, the Robo-Aid will understand your commands and act accordingly. It can perform various tasks from controlling your smart home devices to providing information on the weather or news. It also has integrated sensors that allow it to detect obstacles in its path, enabling it to navigate around them with ease. You'll never have to worry about forgetting something again as this robot will remind you of any important tasks or events coming up. With its sleek design and customizable features, the Robo-Aid is sure to be a welcome addition to any home or office!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989933/helper_robot_xhtvwu.png",
        price: 129999,
        category: "household"

      },
      {
        name: "Time Machine",
        description: "Be careful!",
        detailed_description: "Introducing the newest and most advanced time machine ever created! Our state-of-the-art device is the only one of its kind, allowing you to travel through both time and space. With our time machine, you can go back in time to any point in history or explore the future of tomorrow. It's safe, reliable, and easy to use - simply set your destination date and hit the start button! Plus, our time machine has a sleek and modern design that will fit seamlessly into any home or office environment. Experience the past or the future with this incredible device - get your own today!",
        stock: 3,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989961/time_machine_aefjn2.png",
        price: 199999,
        category: "transportation"

      },
      {
        name: "Ingredients for Life",
        description: "Spreading galactic life",
        detailed_description: "Welcome to the future of space exploration! Our new planet-colonizing kit is perfect for anyone who wants to explore the universe and colonize distant planets. With this kit, you'll have everything you need to get started right away. Our kit includes a spacecraft, a planetary surveyor, a habitat module, and all the supplies necessary for survival in hostile environments. The spacecraft is equipped with advanced navigation systems and powerful engines that will take you wherever your heart desires. The planetary surveyor will help you map out your journey and identify ideal locations for colonization. Finally, the habitat module provides shelter as well as food production capabilities allowing you to create self-sustaining colonies on distant worlds. With our planet-colonizing kit, your dreams of space exploration are just a few clicks away!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989984/growinglife_r5ewpr.png",
        price: 19999,
        category: "household"

      },
      {
        name: "Space Rocks",
        description: "Rare asteroid minerals",
        detailed_description: "Experience the thrill of owning a piece of history with this incredible collection of rare asteroid rocks. Each rock has been carefully selected for its unique characteristics and is guaranteed to be a one-of-a-kind addition to your collection. These extraterrestrial specimens are sure to spark conversation and wonder, as each one contains clues about the formation and evolution of our universe. The rocks are available in assorted sizes, giving you plenty of options for display or study. Whether you're an amateur astronomer, geologist, or just someone who appreciates natural beauty, these rare meteorites will bring joy and fascination into your home or office.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989976/comet_minerals_t7xgde.png",
        price: 70999,
        category: "household"

      },

      {
        name: "Planet Investigator",
        description: "For initial planet research",
        detailed_description: "Introducing the Planet Investigating Robot, the perfect tool for exploring distant planets and distant galaxies! This ingenious robot features advanced movement sensors, allowing it to navigate even the toughest terrain with ease. Its powerful camera system allows for crystal-clear images and videos of planets, stars, and galaxies from far away. The robot is equipped with a computer interface that provides real-time data about its surroundings, helping you make informed decisions about your investigations. Plus, its durable exterior ensures that it can withstand the harshest conditions without fail. Investigate the unknown with the Planet Investigating Robot - explore deep space today!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989955/planet_investigator_liilxk.png",
        price: 119999,
        category: "transportation"

      },
      {
        name: "Zip Teleporter",
        description: "Convenient Transportation",
        detailed_description: "The Human Teleporter is the perfect device for those looking to move quickly and efficiently from place to place. This innovative device uses advanced technology to instantly transport you up to 500 miles in a matter of seconds, with no waiting or delays. Its compact size makes it easy to carry and store, allowing you to take it with you wherever your travels take you. With its simple one-touch activation, the Human Teleporter provides an effortless way of getting from point A to point B without worry or hassle. Whether you’re traveling across town or across the country, the Human Teleporter will get you there faster than ever before!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989943/teleporter_livjs2.png",
        price: 319999,
        category: "transportation"

      },
      {
        name: "Space Station Beam",
        description: "Zips you right up to orbit.",
        detailed_description: "Introducing the revolutionary Human Teleporting Beam, the latest breakthrough in transportation technology! This amazing device allows you to travel anywhere in the world in an instant. Simply step into the beam and choose your destination, and you’ll be teleported there without any hassle or delay. With its advanced safety features, you can rest assured that your journey will be safe and secure. Plus, it’s convenient and easy to use – no need for expensive tickets or long waits at airports! Experience the magic of teleportation today with the Human Teleporting Beam.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669989950/space_platform_q1acop.png",
        price: 1799999,
        category: "transportation"

      },
      {
        name: "Universal Remote",
        description: "It can control physics",
        detailed_description: "Our revolutionary remote control changes the laws of gravity with just a click of a button! With its intuitive design, controlling gravity has never been easier. Simply point the remote at any object and press the up or down buttons to change its gravitational pull. The range is adjustable up to 10 meters, so you can lift objects up to 10 meters away! Whether it's for fun, practical purposes or even scientific experiments, our remote control will take your creativity to new heights – literally! Plus, it runs on batteries so you don't have to worry about plugging it in. Get yours today and start exploring the possibilities of gravity!",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669990623/Literally_universal_remote_gq9hp6.png",
        price: 550799999,
        category: "transportation"

      },
      {
        name: "Stone-cutting Laser",
        description: "Cuts stone to perfection.",
        detailed_description: "This powerful stone-cutting laser is designed to provide superior cutting power and accuracy. Our advanced laser technology allows for precise cuts on all types of stones, from granite and marble to quartz and slate. The laser is equipped with a high-grade focusing lens that delivers a perfectly focused beam, allowing for accurate cuts up to 0.5mm in thickness. The easy-to-use control panel allows you to select the desired cutting speed and intensity for your project. Built with safety in mind, it includes an emergency stop button in case of any unexpected issues during operation. With its durable construction and reliable performance, this stone-cutting laser is the perfect tool for any professional or DIYer looking for precision and efficiency when cutting stone materials.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669991014/cutting_laser_xjh2bv.png",
        price: 399999,
        category: "household"

      },
      {
        name: "Spectrometer Diamond",
        description: "Radiates on a full spectrum",
        detailed_description: "The Spectrometer Diamond is the perfect instrument for any lab or research facility. With its advanced design and features, it offers an accurate and reliable way to analyze substances. Its high-resolution optics ensure precise readings, while its intuitive controls make it easy to use in any environment. The diamond-coated prism ensures maximum accuracy when studying light spectrum patterns, and its USB connection allows for easy data transfer and storage. Whether you’re in the lab or out in the field, this spectrometer will be your go-to tool for all of your spectral analysis needs.",
        stock: 6,
        image_url:
          "https://res.cloudinary.com/dpve8rfei/image/upload/v1669991093/gem_bzwh5s.png",
        price: 1000000,
        category: "accessories"

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
      isActive: false,
    },
    {
      userId: 1,
      isActive: false,
    },
  ];

  const carts = await Promise.all(
    cartsToCreate.map((cart) => createCart(cart.userId, cart.isActive))
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

    {
      cartId: 5,
      productId: 3,
      price: 29999,
      quantity: 1,
    },
    {
      cartId: 5,
      productId: 2,
      price: 39999,
      quantity: 1,
    },

    {
      cartId: 6,
      productId: 3,
      price: 29999,
      quantity: 1,
    },
    {
      cartId: 6,
      productId: 2,
      price: 39999,
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
          address varchar(255)
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
        price INTEGER,
        category TEXT
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
          quantity INTEGER,
          UNIQUE ("cartId", "productId")
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
    await createInitialCarts();
    await createInitialCartItems();

    // await getCartByUser(1);
    // console.log("Testing Get Cart Items by Cart")
    // await getCartItemsByCart(1);
  
    console.log("Testing Get Cart Items by Cart")
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
