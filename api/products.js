const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductById, updateProduct, getProductByName, destroyProduct, createProduct} = require("../db/products")
const {requireAdmin} = require('./utils')

productsRouter.get('/', async (req, res, next) => {
    try {
      const products = await getAllProducts();
  
    
      res.send({
        products
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
//requireAdmin is undefined
  productsRouter.post("/", async (req, res, next) => {
    const {   name,
        description,
        detailed_description,
        stock, 
        image_url,
        price,
      category } = req.body;
   
  
    const productData = {  name,
        description,
        detailed_description,
        stock, 
        image_url,
        price,
        category };
  
    try {
      const product = await createProduct(productData);
      
      if (product) {
        res.send(product);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  productsRouter.get("/:productId", async (req, res, next) =>  {
    const {productId} = req.params

    try {
      const products = await getProductById(productId); 
      console.log(products, "is products from prod api")
    
      res.send({
        products
      });
    } catch ({ name, message }) {
      next({ name, message });
    }

  })

  
  productsRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  
  const fields = req.body;
  if (req.body) {
    try {
      const originalProduct = await getProductById(productId);
  

      if (originalProduct) {
        const updatedProduct = await updateProduct({
          id: productId,
          ...fields,
        });
        res.send(updatedProduct);
      } else {
        next({
          name: "product does not exist",
          message: `product ${productId} not found`,
          error: "error",
        });
      }
    } catch ({ name, message, error }) {
      next({ name, message, error });
    }
  } else {
    next({
      name: "There is no req.body",
      message: "We need a body",
      error: "error",
    });
  }
});

productsRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
    try {
      const product = await getProductById(req.params.productId);
      console.log(req.user.is_admin);
  
      if (product) {
        console.log(product, "product");
     
          const deletedProduct = await destroyProduct(product.id);
          res.send(deletedProduct);
        
      } else {
        // if there was a routine, throw UnauthorizedUserError, otherwise throw routineNotFoundError
        next({
          name: "ProductNotFoundError",
          message: "That product does not exist",
          error: "ProductNotFoundError",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = productsRouter;
