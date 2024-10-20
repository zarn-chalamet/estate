const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, email, password, password_confirm } = req.body;

  if (!username || !email || !password || !password_confirm) {
    res.status(400);
    throw new Error("All fields are necessary");
  }

  if (password !== password_confirm) {
    res.status(422);
    throw new Error("Passwords do not match");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  try {
    hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.sendStatus(201);
  } catch (error) {
    res.status(400);
    throw new Error("Could not register");
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are necessary");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("email or password is not valid");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(401).json({ message: "Email or password is incorrect" });

  const accessToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1800s",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  user.refresh_token = refreshToken;
  await user.save();

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ access_token: accessToken });
}

async function logout(req, res) {
  const cookies = req.cookies;

  if (!cookies.refresh_token) return res.sendStatus(204);

  const refreshToken = cookies.refresh_token;
  const user = await User.findOne({ refresh_token: refreshToken });

  if (!user) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  user.refresh_token = null;
  await user.save();

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
}

async function refresh(req, res) {
  const cookies = req.cookies;
  if (!cookies.refresh_token) return res.sendStatus(401);

  const refreshToken = cookies.refresh_token;

  const user = await User.findOne({ refresh_token: refreshToken });

  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1800s" }
    );

    res.json({ access_token: accessToken });
  });
}

async function user(req, res) {
  const user = req.user;

  return res.status(200).json(user);
}

async function getUserById(req, res) {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res
    .status(200)
    .json({ _id: user._id, email: user.email, username: user.username });
}

module.exports = { register, login, logout, refresh, user, getUserById };
