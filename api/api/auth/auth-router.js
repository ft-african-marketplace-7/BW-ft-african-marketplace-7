const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("");
const bcrypt = require("bcryptjs");
const Auth = require("./auth-model");
const {
  checkUsernameAvailable,
  checkUsernameExists,
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

router.post("/login", checkUsernameExists, (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "all fields are required" });
  } else {
    const { username, password } = req.body;

    Auth.findByUsername(username)
      .then((user) => {
        if (user && bcrypt.compareSync(password, user[0].password)) {
          const token = buildToken(user[0]);
          res
            .status(200)
            .json({ message: `welcome, ${user[0].username}`, token });
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      })
      .catch(next);
  }
});

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const config = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, config);
}

router.use((err, req, res, next) => /*eslint-disable-line*/ {
  res.status(500).json({ message: "router is not working correctly" });
});

module.exports = router;
