const express = require("express");
const app = express();
const cors = require("cors");
const zod = require("zod");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
const port = 3000;
mongoose.connect(
  "mongodb+srv://ruhneb:PxR29CfqDjCGrZS@cluster0.ci51xdx.mongodb.net/loginPage"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

async function userMiddlewareSignUp(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const userSchema = zod.object({
    username: zod.string().max(25),
    password: zod.string().min(8).max(25),
  });

  const validUser = userSchema.safeParse({ username, password });
  if (validUser.success) {
    try {
      const userExist = await User.findOne({ username });
      if (userExist) return res.status(400).json({ message: "User Exists" });
      req.username = validUser.data.username;
      req.password = validUser.data.password;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } else {
    res.status(403).json({
      message: "Incorrect Inputs",
    });
  }
}

async function userMiddlewareLogin(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const userSchema = zod.object({
    username: zod.string().max(25),
    password: zod.string().min(8).max(25),
  });

  const validUser = userSchema.safeParse({ username, password });
  // console.log(validUser);
  if (validUser.success) {
    try {
      const userExist = await User.findOne({ username });
      // console.log(userExist);
      if (userExist) {
        req.username = validUser.data.username;
        req.password = validUser.data.password;
        if (userExist.password !== password) {
          // console.log("wrong p");
          return res.status(403).json({
            message: "Incorrect Password",
          });
        }
        next();
      } else {
        res.status(403).json({
          message: "User dosen't exist, please sign up",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } else {
    res.json({
      message: "Incorrect Inputs",
    });
  }
}

app.post("/signup", userMiddlewareSignUp, async (req, res) => {
  const username = req.username;
  const password = req.password;
  // console.log("jnifbeiuf");
  try {
    await User.create({
      username,
      password,
    });
    res.status(200).json({ message: "New User Created" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something happend" });
  }
});

app.post("/login", userMiddlewareLogin, async (req, res) => {
  // console.log("nhvyc");
  const username = req.username;
  const password = req.password;
  try {
    await User.findOne({
      username,
      password,
    });
    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something happend" });
  }
});

app.listen(port);
