const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(400)
        .json({ message: "User does not exist! Create an account." });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || "dev_jwt_secret",
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  const { username, email, password, hometown } = req.body;

  // Validation
  if (!username || !email || !password || !hometown) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check existing user
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user directly
    const sql =
      "INSERT INTO users (username, email, password, hometown) VALUES (?, ?, ?, ?)";

    const [result] = await db.query(sql, [
      username,
      email,
      hashedPassword,
      hometown,
    ]);

    // Generate token after signup
    const token = jwt.sign(
      {
        id: result.insertId,
        email,
        username,
      },
      process.env.JWT_SECRET || "dev_jwt_secret",
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: {
        id: result.insertId,
        username,
        email,
        hometown,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete related data first
    await db.query(
      "DELETE FROM connections WHERE sender_id = ? OR receiver_id = ?",
      [userId, userId],
    );

    await db.query(
      "DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?",
      [userId, userId],
    );

    await db.query("DELETE FROM posts WHERE user_id = ?", [userId]);

    await db.query("DELETE FROM community_members WHERE user_id = ?", [userId]);

    // Delete user
    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ error: err.message });
  }
};
