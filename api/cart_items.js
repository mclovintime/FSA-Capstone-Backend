const express = require("express");

const cartItemsRouter = express.Router();
const {
  getAllCartItems,
  getCartItemsByCart,
  getCartItemById,
  addProductToCartItems,
  destroyCartItem,
  updateCartItem,
  getCartById,
  getCartByUser,
} = require("../db/");
const { requireUser } = require("./utils");

cartItemsRouter.get("/", async (req, res, next) => {
  try {
    const cartItems = await getAllCartItems();

    if (!cartItems) {
      res.send(cartItems);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartItemsRouter.get("/:cartId/cart_items", async (req, res, next) => {
  try {
    const cartId = req.params;
    const userId = req.user.id;
    const userCart = await getCartByUser(userId);
    console.log(userCart);
    const cartItems = await getCartItemsByCart(cartId);

    res.send(cartItems);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartItemsRouter.patch("/:cartItemId", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.cartItemId;
    const cart_item = await getCartItemById(cartItemId);
    const cart = await getCartById(cart_item.cartId);
    if (cart_item) {
      const updatedCartItem = await updateCartItem({
        id: cartItemId,
        quantity,
      });
      res.send(updatedCartItem);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartItemsRouter.delete("/:cartItemId", requireUser, async (req, res, next) => {
  try {
    const cartItem = await getCartItemById(req.params.cartItemId);
    const deletedCartItem = await destroyCartItem(cartItem);
    res.send(deletedCartItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = cartItemsRouter;
