const {createProduct, getAllProducts, getProductById, getAllUsers, createUser} = require('./index')
const client = require('./client');


async function createInitialUsers() {
  
    try {
      console.log("Starting to create users...");
  
      const Tyler = await createUser({ username: 'Tyler', password: '123', is_admin:"true"});
      const Maaya = await createUser({ username: 'Maaya', password: '123', is_admin:"true" });
      const Thomas = await createUser({ username: 'Thomas', password: '123', is_admin:"true" });
      const Lucas = await createUser({ username: 'Lucas', password: '123', is_admin:"true" });
      
  
      console.log(Tyler);
      console.log(Maaya);
      console.log(Thomas);
      console.log(Lucas);
    
  
      console.log("Finished creating users!");
    } catch(error) {
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
          image_url: "https://res.cloudinary.com/dpve8rfei/image/upload/v1669084186/image_l3bwyl.png",
          price: "$119.99"
        },
        {
          name: "Super cool space car",
          description:
            "Fly in style",
            stock: 5,
            image_url: "https://res.cloudinary.com/dpve8rfei/image/upload/v1669085856/sportscar_y6ctry.png",
            price: "$399.99"
        },
        {
          name: "Galactic Shower",
          description: "Find your moment of zen.",
          stock: 6,
          image_url: "https://res.cloudinary.com/dpve8rfei/image/upload/v1669086021/shower_zmyihh.png",
          price: "$299.99"
        },
     
      ];
      const products = await Promise.all(
        productsToCreate.map(createProduct)
      );
  
      console.log("products created:");
      console.log(products);
  
      console.log("Finished creating products!");
    } catch (error) {
      console.error("Error creating products!");
      throw error;
    }
  }



  async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      await client.query(`
        
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
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
          is_admin BOOLEAN DEFAULT false
          
        );
      `);
  
      await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        description TEXT NOT NULL,
        stock INTEGER,
        image_url TEXT NOT NULL,
        price varchar(255) NOT NULL
      );
      `)
   
    
  
  
  
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
      
    } catch (error) {
      console.log("error during rebuildDB")
      throw error;
    }
  }


  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers");
      const users = await getAllUsers();
      console.log("Result:", users);

      console.log("Calling getAllProducts")
      const products = await getAllProducts();
      console.log("Result:", products)
  
  
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