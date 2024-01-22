require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const express = require("express");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log(process.env.DB_PASSWORD);
//5rP9GL3blNv4Nc9l

//DB connections
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}

//bodyParser -  middleware to parse body with json data
server.use(express.json());

server.use(cors());

//third party middleware -- used as logger
server.use(morgan("combined"));

server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

//middleware to attach router to server with base URL
// API ROOT, Base URL eg - google.com/api/v2
server.use("/products", productRouter.router);

server.use("/users", userRouter.router);

//route to different location is present in react and not in the
//build.
//So to resolve the problem we send the single page index.html
//file to match with any route which are not explicitly
//stated in the backend
//We create a custom middleware for the same
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// MVC model-view-controller

server.listen(process.env.PORT, () => {
  console.log("Server started");
});

//middleware to parse form data
//server.use(express.urlencoded());

//static hosting middleware --> used to view images, assets etc
// directly without server interference

//custom middleware
// server.use((req, res, next) => {
//   console.log(
//     req.method,
//     req.ip,
//     req.hostname,
//     new Date(),
//     req.get("User-Agent")
//   );
//   next();
// });

// const auth = (req, res, next) => {
//   console.log(req.query);

//   if (req.body.password === "123") {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

//server.use(auth);

//API - Endpoint - Route
// server.get("/", (req, res) => {
//   res.json({ type: "GET" });
// });

// // attaching auth middleware to the POST route
// server.post("/", (req, res) => {
//   res.json({ type: "POST" });
// });

// server.delete("/", (req, res) => {
//   res.json({ type: "DELETE" });
// });

// server.patch("/", (req, res) => {
//   res.json({ type: "PATCH" });
// });

// server.put("/", (req, res) => {
//   res.json({ type: "PUT" });
// });

// server.get("/demo", (req, res) => {
//   //   res.send("<h1>Hello</h1>");
//   //   res.sendFile(
//   //     "/Users/PRAKRITI CHATTERJEE/OneDrive/Desktop/node-app/index.html"
//   //   );
//   //   res.json(products);
//   //   res.sendStatus(404);
//   //res.status(201).send("<h1>Hii</h1>");
// });
