const express = require("express");
const api = express();
const cors = require("cors");
api.use(cors());
api.use(express.urlencoded({ extended: true }));
api.use(express.json());

const data = require("./data");
const HOST = "localhost";
const PORT = 8888;

const users = [
  {
    id: "7jhv179",
    name: "Adam",
    login: "adam@admin.com",
    password: "zaq1@WSX",
  },
];

api.get("/", (req, res) => {
  res.send("FeApp API");
});

api.get("/groups", (req, res) => {
  res.status(200).json(data);
});

api.post("/login", (req, res) => {
  const user = users.find((user) => user.login === req.body.login);
  if (user == null) {
    res.status(404).json({ errorMessage: "Login or password doesn't match" });
  } else if (user && user.password === req.body.password) {
    res.status(200).json({ userId: user.id, userName: user.name });
  } else
    res.status(404).json({ errorMessage: "Login or password doesn't match" });
});

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));
