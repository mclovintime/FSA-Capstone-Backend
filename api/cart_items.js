const express = require('express');

const cartItemsRouter = express.Router();
const {getAllCartItems, getCartItemById, addProductToCartItems, destroyCartItem, updateCartItem, getCartById } = require("../db/")


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


cartItemsRouter.patch("/:cartItemId", async (req, res, next) => {
    try {
      const { price, quantity } = req.body;
      const cartItemId = req.params.cartItemId;
      const cart_item = await getCartItemById(cartItemId);
      const cart = await getCartById(cart_item.cartId);
      if (cart.userId != req.user.id) {
        res.status(403);
        next({
          error: "error message",
          name: "User Not Found",
          message: `User ${req.user.username} is not allowed to update this cart.`,
        });
      } else {
        const updatedCartItem = await updateCartItem({
          id: cartItemId,
          price,
          quantity,
        });
        res.send(updatedCartItem);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  // DELETE /api/routine_activities/:routineActivityId

// cartItemsRouter.delete("/:routineActivityId",  async (req, res, next) => {
//     try {2
//       const routineActivityId = req.params.routineActivityId;
//       const routineActivity = await getRoutineActivityById(routineActivityId);
  
//       const routine = await getRoutineById(routineActivity.routineId);
  
//       if (routine.creatorId != req.user.id) {
//         res.status(403);
//         next({
//           error: "error message",
//           name: "Unauthorized User",
//           message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
//         });
//       }
//       await destroyRoutineActivity(routineActivityId);
//       res.send(routineActivity);
//     } catch ({ error, name, message }) {
//       next({ error, name, message });
//     }
//   });

module.exports = cartItemsRouter