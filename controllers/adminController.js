const { Product, Order, User } = require("../models");

// Admin panel ma'lumotlari
exports.dashboard = async (req, res) => {
  try {
    const productCount = await Product.count(); // Tovarlar soni
    const orderCount = await Order.count(); // Buyurtmalar soni
    const totalSales = await Order.sum("totalPrice"); // Umumiy sotilgan miqdori
    const userCount = await User.count(); // Foydalanuvchilar soni

    res.render("adminDashboard", {
      productCount,
      orderCount,
      totalSales,
      userCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tovar qo'shish
exports.addProduct = async (req, res) => {
  try {
    const { title, image, description, amount } = req.body;

    // Tovar narxi musbat son bo'lishi shart
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Tovar narxi musbat son bo'lishi kerak" });
    }

    // Yangi tovar obyektini yaratish
    const product = await Product.create({
      title,
      image,
      description,
      amount,
    });

    res
      .status(201)
      .json({ message: "Yangi tovar muvaffaqiyatli qo'shildi", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tovar o'zgartirish
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params; // Tovar identifikatori
    const { title, image, description, amount } = req.body; // Yangi ma'lumotlar

    // Tovar ma'lumotlarini bazadan izlash
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Tovar topilmadi" });
    }

    // Tovar narxi musbat son bo'lishi shart
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Tovar narxi musbat son bo'lishi kerak" });
    }

    // Yangi ma'lumotlarni o'zgartirish
    product.title = title;
    product.image = image;
    product.description = description;
    product.amount = amount;

    await product.save(); // Ma'lumotlarni saqlash

    res
      .status(200)
      .json({ message: "Tovar muvaffaqiyatli o'zgartirildi", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tovar o'chirish
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Tovar identifikatori

    // Tovar ma'lumotlarini bazadan izlash
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Tovar topilmadi" });
    }

    // Tovarni o'chirish
    await product.destroy();

    res.status(200).json({ message: "Tovar muvaffaqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buyurtmalarni ko'rish
exports.viewOrders = async (req, res) => {
  try {
    // Buyurtmalarni bazadan izlash
    const orders = await Order.findAll();

    // Buyurtmalar ro'yxatini chiqarish
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
