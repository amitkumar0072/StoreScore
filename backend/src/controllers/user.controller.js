const prisma = require("../config/prisma");

// GET STORES (SEARCH + RATINGS)
exports.getStores = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, address } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
      },
      include: {
        ratings: true,
      },
    });

    const response = stores.map((store) => {
      const totalRatings = store.ratings.length;
      const avgRating =
        totalRatings > 0
          ? (
              store.ratings.reduce((a, b) => a + b.rating, 0) / totalRatings
            ).toFixed(2)
          : "0.00";

      const userRating = store.ratings.find(
        (r) => r.userId === userId
      );

      return {
        storeId: store.id,
        storeName: store.name,
        address: store.address,
        overallRating: avgRating,
        userRating: userRating ? userRating.rating : null,
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SUBMIT RATING
exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be between 1 and 5" });

    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (existing)
      return res
        .status(409)
        .json({ message: "Rating already exists, use update" });

    await prisma.rating.create({
      data: {
        userId,
        storeId,
        rating,
      },
    });

    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE RATING
exports.updateRating = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be between 1 and 5" });

    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (!existing)
      return res.status(404).json({ message: "Rating not found" });

    await prisma.rating.update({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
      data: {
        rating,
      },
    });

    res.json({ message: "Rating updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
