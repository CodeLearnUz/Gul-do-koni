const { Order } = require("../models");

// Buyurtma qabul qilish
exports.placeOrder = async (req, res) => {
  try {
    const { FIO, region, phone, productId } = req.body;

    // Yangi buyurtma obyektini yaratish
    const order = await Order.create({
      FIO,
      region,
      phone,
      productId,
    });

    res
      .status(201)
      .json({ message: "Buyurtma muvaffaqiyatli qabul qilindi", order });
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

// Buyurtmani o'zgartirish
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Buyurtma identifikatori
    const { status } = req.body; // Yangi buyurtma holati

    // Buyurtmani bazadan izlash
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }

    // Buyurtma holatini o'zgartirish
    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Buyurtma muvaffaqiyatli yangilandi", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buyurtmani o'chirish
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params; // Buyurtma identifikatori

    // Buyurtmani bazadan izlash
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }

    // Buyurtmani o'chirish
    await order.destroy();

    res.status(200).json({ message: "Buyurtma muvaffaqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
