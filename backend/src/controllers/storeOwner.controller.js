const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { validatePassword } = require("../utils/validators");

// DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const store = await prisma.store.findFirst({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!store)
      return res.status(404).json({ message: "Store not found" });

    const totalRatings = store.ratings.length;
    const avgRating =
      totalRatings > 0
        ? (
            store.ratings.reduce((a, b) => a + b.rating, 0) / totalRatings
          ).toFixed(2)
        : "0.00";

    const users = store.ratings.map((r) => ({
      name: r.user.name,
      email: r.user.email,
      rating: r.rating,
    }));

    res.json({
      storeName: store.name,
      averageRating: avgRating,
      totalRatings,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!validatePassword(newPassword))
      return res.status(400).json({ message: "Weak password" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
