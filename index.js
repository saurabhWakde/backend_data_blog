const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db");
const { UserModel } = require("./models/User");
const { blogRouter } = require("./Routes/blog.routes");
const { authentication } = require("./middlewares/Authentication");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Base API endpoint");
});

app.post("/signup", async (req, res) => {
  let { name, email, password, age, phone_number } = req.body;

  try {
    await UserModel.create({
      name: name,
      email: email,
      password: password,
      age: age,
      phone_number: phone_number,
    });
    res.status(201).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).send("Sign up first");
  } else {
    if (password === user.password) {
      let token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY);
      res.status(201).send({ msg: "login successfull", token: token });
    } else {
      res.status(401).send("Login failed, invalid credentials");
    }
  }
});

app.use("/blogs", authentication, blogRouter);

app.listen(8012, async () => {
  try {
    await connection;
    console.log("connected to DB Successfully");
  } catch (err) {
    console.log("error while connecting to DB");
    console.log(err);
  }
  console.log("listening on port 8012");
});
