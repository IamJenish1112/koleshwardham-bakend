const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

// listen reques
router.get("/login", (req, res) => {
  res.send("Hellow");
});
router.post("/signup", userController.signup);

module.exports = router;
