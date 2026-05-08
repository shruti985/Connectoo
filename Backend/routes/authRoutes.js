const express = require("express");
const router = express.Router();
const { deleteAccount } = require("../controllers/userController");
const { signup, login} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authmiddleware");
router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete", authMiddleware, deleteAccount);
module.exports = router;
