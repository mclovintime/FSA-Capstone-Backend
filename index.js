require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51M6yNAChZbepu0tegirpoYXAh8qTu81xCEJQJuKVPkuHeSAVBH0NWxx0juJZNuFNdAtNYTl8QRTgyThIh1ABqwUt00IWs0OqDY"
);
const uuid = require("uuid");

// const PORT = 3000;
// const PORT = process.env.PORT || 3000;
const { PORT = 8080 } = process.env;

const express = require("express");
const server = express();
const morgan = require("morgan");
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

const apiRouter = require("./api");

const { client } = require("./db/client");
client.connect();

server.get("/", (req, res) => {
  res.json({
    message: "You have connected to the API Server",
  });
});

server.use((req, res, next) => {
  console.log("<___Body Logger START____>");
  console.log(req.method);
  console.log("____Body Logger END____>");
  next();
});

server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
