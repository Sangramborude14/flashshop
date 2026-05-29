require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dummyItems = [
    {
      id: "item_1",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "199.99",
      details: "High-quality sound with noise-canceling technology.",
      hostName: "SoundMaster",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
      id: "item_2",
      name: "Leather Wallet",
      category: "Accessories",
      price: "49.99",
      details: "Genuine leather wallet with RFID blocking.",
      hostName: "ClassicStyles",
      image: "https://images.unsplash.com/photo-1627124118400-0142fa906e57?w=500&q=80",
    },
    {
      id: "item_3",
      name: "Stainless Steel Water Bottle",
      category: "Fitness",
      price: "24.99",
      details: "Vacuum insulated water bottle, keeps drinks cold for 24 hours.",
      hostName: "HydroFlow",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    },
  ];

  console.log("Seeding dummy items...");

  for (const item of dummyItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
