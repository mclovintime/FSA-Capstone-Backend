const express = require('express');
const cartRouter = express.Router();
const {getAllCarts, getCartById, createCart, getCartItemsByCart, addProductToCartItems} = require("../db")

cartRouter.get("/", async (req, res, next) => {
    try {
      const cart = await getAllCarts();
  
      if (cart) {
        res.send(cart);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
   
  //       const cartItemsList = (
    //         await getCartItemsByCart({ id: cartId })
    //       ).map((cartItem) => cartItem.cartItemId);
    //    console.log(cartItemsList)

  cartRouter.post("/:cartId/cart_items",
  
    async (req, res, next) => {
    try {
        const cartId = req.params.cartId;
      const originalCart = await getCartById(cartId);
        
      if (originalCart) {
         {
            console.log(req.body, "REQ.BODY");
            
          const { productId, price, quantity } = req.body;


        const updatedCartItems = await addProductToCartItems({
            productId, cartId, price, quantity
            });
            if(updatedCartItems){
              res.send(updatedCartItems)
            }
            else{
              next({error: "Already in cart", name:"ProductNotAdded", message:"Product already in cart."})
            }
          }
        } 
    } catch (error) {
    console.log(error)
    }
    }
  );
module.exports = cartRouter