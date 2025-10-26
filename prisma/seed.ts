import bcrypt from 'bcryptjs';
import { Prisma, PrismaClient } from '@prisma/client';
import { categories, products } from './constants.ts';
const prisma = new PrismaClient();

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  size,
}: {
  productId: number;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
}) => {
  return {
    productId,
    size,
    price: randomDecimalNumber(100, 1500),
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  await prisma.user.createMany({
    data: [
      {
        firstName: 'Alice',
        lastName: 'Prisma',
        userName: 'aliceprisma',
        email: 'alice@prisma.io',
        phone: '+1234567890',
        verified: new Date(),
        password: hashedPassword,
        role: 'USER',
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        userName: 'admin',
        email: 'admin@prisma.io',
        phone: '+9876543210',
        verified: new Date(),
        password: hashedPassword,
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.product.createMany({
    data: products,
  });

  const allProducts = await prisma.product.findMany();

  const productItemsData = [];

  for (const product of allProducts) {
    productItemsData.push(
      generateProductItem({ productId: product.id, size: 'SMALL' }),
      generateProductItem({ productId: product.id, size: 'MEDIUM' }),
      generateProductItem({ productId: product.id, size: 'LARGE' }),
    );
  }

  await prisma.productItem.createMany({
    data: productItemsData,
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
