const router = require("express").Router();
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require('');
const bcrypt = require("bcryptjs");
const Auth = require("./auth-model");
const {
  checkUsernameAvailable,
  //   checkUsernameExists,
} = require("./auth-middleware");

router.post("/register", checkUsernameAvailable, (req, res, next) => {
  const creds = req.body;

  if (!creds.username || !creds.password) {
    res.status(400).json({ message: "username and password required" });
  } else {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(creds.password, rounds);
    creds.password = hash;

    Auth.add(creds)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
});
