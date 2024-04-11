const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // User modelini import qilamiz
const { secret } = require("../config/auth");

// Ro'yhatdan o'tish funksiyasi
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Parolni hashlash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yangi foydalanuvchi obyektini yaratish
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Ro'yhatdan o'tdingiz!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Kirish funksiyasi
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Foydalanuvchi ma'lumotlarini bazadan tekshirish
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }

    // Parolni solishtirish
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }

    // Token yaratish va yuborish
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
