const e = require("express");
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {
  getActiveCartByUserId,
  getCartItemsByCart,
  getCartById,
  addProductToCartItems,
  getCartItemById,
  destroyCartItem,
  createCart,
  getIdByUsername,
  deactivateCart,
  getInactiveCartsByUserId,
} = require("../db");
const {
  getAllUsers,
  getUser,
  getUserByUsername,
  createUser,
  getUserById,
  updateUser
} = require("../db/users");
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
  const { username, password } = req.body;
  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "24h",
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
  const { username, password, is_admin, email, address } = req.body;
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
    }
    // else {

    const newUser = await createUser({
      username,
      password,
      is_admin,
      email,
      address
    });

    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({
      message: "thank you for signing up",
      token,
      user: newUser,
    });
    // }
    let userId = await getIdByUsername(username);
    let isActive = true;
    createCart(userId, isActive);
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

usersRouter.get("/mycart", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  console.log(req.user.id, "REQ,USER ID");
  try {
    const userCart = await getActiveCartByUserId(userId);
    console.log(userCart, "USER CART");
    if (req.user) {
      res.send(userCart);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/mycart/cart_items", requireUser, async (req, res, next) => {
  const cart = await getActiveCartByUserId(req.user.id);

  console.log(cart);
  try {
    const cartItemsList = (await getCartItemsByCart(cart)).map(
      (cartItem) => cartItem
    );

    console.log(cartItemsList, "A LIST OF CART ITEMS MILORD");

    if (req.user) {
      res.send(cartItemsList);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/orderHistory", requireUser, async (req, res, next) => {
  const carts = await getInactiveCartsByUserId(req.user.id);
  console.log(req.user.id, "user ID")
  console.log(carts, "line 166");

// const mappedCartItems =  await Promise.all(
//   carts.map(async (cart) => getCartItemsByCart(cart.id)))
//   console.log(mappedCartItems)

//map over carts, in the function call getCartItemsByCart(cart.id)
//wrap that in promise.all which will await all of the promises
//example in fitness tracker

  try {

    
const mappedCartItems =  await Promise.all(
  carts.map(async (cart) => getCartItemsByCart(cart.id)))
  console.log(mappedCartItems, "line 181 mapped Cart items")
    const cartItemsList = (await getCartItemsByCart(carts)).map(
      (cartItem) => cartItem
    );

    console.log(cartItemsList, "A LIST OF CART ITEMS MILORD");

    if (req.user) {
      res.send(mappedCartItems);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post(
  "/mycart/cart_items",
  requireUser,

  async (req, res, next) => {
    try {
      const cartId = await getActiveCartByUserId(req.user.id);
      console.log(cartId, "result of getActiveCart");
      const originalCart = await getCartById(cartId);

      if (originalCart) {
        {
          console.log(req.body, "REQ.BODY");

          const { productId, price, quantity } = req.body;

          const updatedCartItems = await addProductToCartItems({
            productId,
            cartId,
            price,
            quantity,
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
      console.log(error);
    }
  }
);

usersRouter.patch("/mycart/checkout", requireUser, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const currentCart = await getActiveCartByUserId(userId);
    if (currentCart) {
      const deactivatedCart = await deactivateCart(currentCart);
      if (deactivatedCart) {
        await createCart(userId, true);
        const newCartId = await getActiveCartByUserId(userId);
        res.send({newCartId});
      } else { next({name: "deactivate cart error", message:"there was an issue deactivating the cart"})}
    } else {next ({name: "no current cart", message: "could not find current cart."})}


  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.delete(
  "/mycart/cart_items/:cartItemId",
  requireUser,
  async (req, res, next) => {
    try {
      const cartItem = await getCartItemById(req.params.cartItemId);
      console.log(cartItem, "THIS IS CART ITEM DELETE");
      const deleted = await destroyCartItem(cartItem.id);
      if(deleted){
      res.send({success: true, deleted})
    }
      else{
        next({error: "DELETE FAILED", 
        name:"FAILEDTODELETE",
        message:"Could not delete item from cart."})
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

  usersRouter.patch("/me/:userId", requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const fields = req.body;
    console.log(fields)
    if (req.body) {
      try {
        const originalUser = await getUserById(userId);
    
  
        if (originalUser) {
          const updatedUser = await updateUser({
            id: userId,
            ...fields,
          });
          res.send(updatedUser);
        } else {
          next({
            name: "user does not exist",
            message: `user ${userId} not found`,
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

module.exports = usersRouter;
