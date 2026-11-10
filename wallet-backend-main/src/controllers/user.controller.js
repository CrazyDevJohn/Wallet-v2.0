import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "../configs/db.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await sql`
      INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})
      RETURNING *
    `;

    if (newUser.length === 0) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "User registered successfully",
      user: newUser[0],
      token,
    });
  } catch (error) {
    console.error("Error registering User:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "User signed in successfully",
      user: { email: user[0].email, id: user[0].id },
      token,
    });
  } catch (error) {
    console.error("Error sining in user:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const splitedToken = token.split(" ")[1];

    const decodedToken = jwt.verify(splitedToken, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const user = await sql`
      SELECT id, email, created_at FROM users WHERE id = ${userId}
    `;

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const profile = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    id: user.id,
    email: user.email,
    created_at: user.created_at,
  });
};
