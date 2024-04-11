const { Comment } = require("../models");

// Foydalanuvchi tomonidan izoh qoldirish
exports.addComment = async (req, res) => {
  try {
    const { email, text } = req.body;

    // Yangi izoh obyektini yaratish
    const comment = await Comment.create({
      email,
      text,
    });

    res.status(201).json({ message: "Izoh muvaffaqiyatli qo'shildi", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin tomonidan izohni o'chirish
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Izoh identifikatori

    // Izohni bazadan izlash
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Izoh topilmadi" });
    }

    // Izohni o'chirish
    await comment.destroy();

    res.status(200).json({ message: "Izoh muvaffaqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
