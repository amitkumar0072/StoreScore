const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  validateName,
} = require("../utils/validators");

// CREATE USER (ADMIN / USER / STORE_OWNER)
exports.createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!["ADMIN", "USER", "STORE_OWNER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!validateName(name))
      return res.status(400).json({ message: "Name must be 20-60 chars" });

    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (!validatePassword(password))
      return res.status(400).json({ message: "Weak password" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE STORE
exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner || owner.role !== "STORE_OWNER") {
      return res.status(400).json({ message: "Invalid store owner" });
    }

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId,
      },
    });

    res.status(201).json({
      message: "Store created successfully",
      storeId: store.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {
    const [users, stores, ratings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);

    res.json({
      totalUsers: users,
      totalStores: stores,
      totalRatings: ratings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LIST USERS (FILTER + SORT)
exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy = "name", order = "asc" } =
      req.query;

    const users = await prisma.user.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
        role: role || undefined,
      },
      orderBy: {
        [sortBy]: order,
      },
      select: {
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LIST STORES (FILTER + SORT + RATING)
exports.getStores = async (req, res) => {
  try {
    const { name, email, address, sortBy = "name", order = "asc" } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        email: email ? { contains: email, mode: "insensitive" } : undefined,
        address: address
          ? { contains: address, mode: "insensitive" }
          : undefined,
      },
      orderBy: {
        [sortBy]: order,
      },
      include: {
        ratings: true,
      },
    });

    const formatted = stores.map((store) => {
      const avgRating =
        store.ratings.reduce((a, b) => a + b.rating, 0) /
          store.ratings.length || 0;

      return {
        name: store.name,
        email: store.email,
        address: store.address,
        rating: avgRating.toFixed(2),
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
