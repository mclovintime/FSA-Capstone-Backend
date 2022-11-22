const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductById} = require("../db")

productsRouter.get('/', async (req, res, next) => {
    try {
      const allProducts = await getAllProducts();
  
     
      
  
      res.send({
        allProducts
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = productsRouter;
