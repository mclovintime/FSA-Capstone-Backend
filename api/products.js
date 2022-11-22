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

  productsRouter.post("/", requireAdmin, async (req, res, next) => {
    const {   name,
        description,
        inStock, 
        image_url,
        price } = req.body;
   
  
    const productData = {  name,
        description,
        inStock, 
        image_url,
        price };
  
    try {
      const product = await createProduct(productData);
      
      if (product) {
        res.send(product);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  
  productsRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  
  const fields = req.body;
  if (req.body) {
    try {
      const originalProduct = await getProductById(productId);
      const originalProductName = await getProductByName(req.body.name);
      if (originalProductName) {
        next({
          name: "Name duplicate",
          message: `A product with name ${req.body.name} already exists`,
          error: "error",
        });
      }

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
      console.log(req.user);
  
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
