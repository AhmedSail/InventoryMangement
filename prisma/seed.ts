import { PrismaClient } from "@/src/generated/client";

const prisma = new PrismaClient();

async function main() {
  const DemoUserId = "884e8463-eea7-4e85-bb4e-965406c0489f";
  //create sample product
  console.log("Starting seed...");

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: DemoUserId,
      name: `Product ${i + 1}`,
      price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });
  console.log("Finished seeding.");

  console.log("Seed data Create Successfully!");
  console.log(`Created 25 Products for user ID ${DemoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
