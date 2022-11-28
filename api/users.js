const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getCartByUser, getCartItemsByCart,getCartById,addProductToCartItems, getCartItemById, destroyCartItem } = require("../db");
const { getAllUsers, getUser, getUserByUsername, createUser,} = require("../db/users");
const { requireUser } = require("./utils");

usersRouter.use("/", (req, res, next) => {
  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
    const { username, password} = req.body;
    try {
      const user = await getUser({ username, password,  });
  
      if (user) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "1w",
        });
        res.send({
          token,
          user,
          message: "you're logged in!",
        });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
    const { username, password, is_admin } = req.body;
    try {
      const user = await getUserByUsername(username);
  
      if (password.length < 8) {
        next({
          error: "Password too short",
          message: "Password Too Short!",
          name: "Password too short",
        });
      }
  
      if (user) {
        next({
          name: "UserExistsError",
          message: `User ${username} is already taken.`,
        });
      } else {
        const newUser = await createUser({
          username,
          password,
            is_admin
        });
  
        const token = jwt.sign(newUser, process.env.JWT_SECRET, {
          expiresIn: "1w",
        });
  
        res.send({
          message: "thank you for signing up",
          token,
          user: newUser,
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  usersRouter.get("/me", async (req, res, next) => {
    try {
      if (req.user) {
        res.send(req.user);
      } else {
        next({
          error: "Unauthorized",
          name: "Invalid credentials",
          message: "You must be logged in to perform this action",
        });
      }
    } catch (err) {
      console.log(err.message);
      next();
    }
  });

  usersRouter.get('/mycart', requireUser, async (req, res, next) => {
    const  userId  = req.user.id;
   console.log(req.user.id, "REQ,USER ID")
    try {
        const userCart = await getCartByUser(userId)
        console.log(userCart, "USER CART")
        if (req.user){
        res.send(
            userCart,
        )}
    } catch ({ name, message }) {
        next ({ name, message })
    }
  })


  usersRouter.get('/mycart/cart_items', requireUser, async (req, res, next) => {
    const  userId  = req.user.id;
  
    try {
        
        
        const cartItemsList = (
          await getCartItemsByCart(userId)
        ).map((cartItem) => cartItem);
       
       console.log(cartItemsList, "A LIST OF CART ITEMS MILORD")
  
        if (req.user){
        res.send(
            cartItemsList,
        )}
    } catch ({ name, message }) {
        next ({ name, message })
    }
  })

  usersRouter.post("/:cartId/cart_items", requireUser,
  
    async (req, res, next) => {
    try {
        
        const cartId = req.user.id;
      const originalCart = await getCartById(cartId);
        
      if (originalCart) {
         {
            console.log(req.body, "REQ.BODY");
            
          const { productId, price, quantity } = req.body;


        const updatedCartItems = await addProductToCartItems({
            productId, cartId, price, quantity
            });
  
            res.send(updatedCartItems);
          }
        } 
    } catch (error) {
    console.log(error)
    }
    }
  );

  usersRouter.delete("/mycart/cart_items/:cartItemId", requireUser, async (req, res, next) => {
    try {
      const cartItem = await getCartItemById(req.params.cartItemId);
      console.log(cartItem, "THIS IS CART ITEM DELETE");
      const deletedCartItem = await destroyCartItem(cartItem.id);
          res.send(deletedCartItem);
      
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = usersRouter;
