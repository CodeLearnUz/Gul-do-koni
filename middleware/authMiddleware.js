const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Foydalanuvchi autentifikatsiyasini tekshirish
exports.authenticateUser = async (req, res, next) => {
  try {
    // HTTP x-headerda token olish
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new Error("Token not provided");
    }

    // Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Autentifikatsiyadan o'tgan foydalanuvchini foydalanuvchi obyektiga joylash
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

// Foydalanuvchi adminligini tekshirish
exports.checkAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied. Admin rights required.");
    }
    next();
  } catch (error) {
    res.status(403).send({ error: "Forbidden" });
  }
};
