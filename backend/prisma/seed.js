import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash("Admin@123", 10);
  const ownerPass = await bcrypt.hash("Owner@123", 10);
  const userPass = await bcrypt.hash("User@123", 10);

  // 👤 USERS (UPSERT)
  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      name: "Admin One",
      email: "admin@demo.com",
      password: adminPass,
      address: "Delhi",
      role: "ADMIN",
    },
  });

  const owner1 = await prisma.user.upsert({
    where: { email: "owner1@demo.com" },
    update: {},
    create: {
      name: "Store Owner One",
      email: "owner1@demo.com",
      password: ownerPass,
      address: "Mumbai",
      role: "STORE_OWNER",
    },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: "owner2@demo.com" },
    update: {},
    create: {
      name: "Store Owner Two",
      email: "owner2@demo.com",
      password: ownerPass,
      address: "Bangalore",
      role: "STORE_OWNER",
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "user1@demo.com" },
    update: {},
    create: {
      name: "User One",
      email: "user1@demo.com",
      password: userPass,
      address: "Pune",
      role: "USER",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@demo.com" },
    update: {},
    create: {
      name: "User Two",
      email: "user2@demo.com",
      password: userPass,
      address: "Noida",
      role: "USER",
    },
  });

  // 🏬 STORES (UPSERT)
  const store1 = await prisma.store.upsert({
    where: { name: "Tech Mart" },
    update: {},
    create: {
      name: "Tech Mart",
      address: "Delhi",
      ownerId: owner1.id,
    },
  });

  const store2 = await prisma.store.upsert({
    where: { name: "Gadget Hub" },
    update: {},
    create: {
      name: "Gadget Hub",
      address: "Mumbai",
      ownerId: owner2.id,
    },
  });

  const store3 = await prisma.store.upsert({
    where: { name: "Daily Needs" },
    update: {},
    create: {
      name: "Daily Needs",
      address: "Pune",
      ownerId: owner1.id,
    },
  });

  // ⭐ RATINGS (SAFE CREATE)
  await prisma.rating.createMany({
    data: [
      { userId: user1.id, storeId: store1.id, rating: 5 },
      { userId: user2.id, storeId: store1.id, rating: 4 },
      { userId: user1.id, storeId: store2.id, rating: 3 },
      { userId: user2.id, storeId: store3.id, rating: 5 },
    ],
    skipDuplicates: true, // 🔥 IMPORTANT
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
