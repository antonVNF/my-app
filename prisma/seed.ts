import bcrypt from 'bcryptjs';
import { Prisma, PrismaClient, ProductSize } from '@prisma/client';
import { categories, products } from '../shared/constants/constants.ts';

type randomSizes = {
  SMALL: boolean;
  MEDIUM: boolean;
  LARGE: boolean;
};

const prisma = new PrismaClient();

const getBasePrice = (categoryId: number): number => {
  switch (categoryId) {
    case 1:
      return Math.random() * 100 + 50;
    case 2:
      return Math.random() * 50 + 30;
    case 3:
      return Math.random() * 80 + 40;
    case 4:
      return Math.random() * 40 + 20;
    case 5:
      return Math.random() * 60 + 30;
    case 6:
      return Math.random() * 200 + 100;
    case 7:
      return Math.random() * 80 + 20;
    case 8:
      return Math.random() * 60 + 15;
    default:
      return Math.random() * 100 + 50;
  }
};

const getRandomSizes = (): randomSizes => {
  return {
    SMALL: Math.random() > 0.5 ? true : false,
    MEDIUM: true,
    LARGE: Math.random() > 0.5 ? true : false,
  };
};

const getSizePriceMultiplier = (size: ProductSize): number => {
  switch (size) {
    case 'SMALL':
      return 0.8;
    case 'MEDIUM':
      return 1.0;
    case 'LARGE':
      return 1.3;
    default:
      return 1.0;
  }
};

const generateProductItems = (
  productId: number,
  mediumPrice: number,
  sizes: randomSizes,
  discount: number,
) => {
  const items: Prisma.ProductItemCreateManyInput[] = [];

  Object.entries(sizes).forEach(([sizeName, isAvailable]) => {
    if (!isAvailable) return;

    const size = sizeName as ProductSize;

    const sizeMultiplier = getSizePriceMultiplier(size);
    const basePriceForSize = mediumPrice * sizeMultiplier;

    let discountPercent = 0;

    if (size === 'MEDIUM') {
      discountPercent = discount;
    } else {
      const hasDiscount = Math.random() > 0.7;
      discountPercent = hasDiscount ? Math.floor(Math.random() * 25) + 5 : 0;
    }

    items.push({
      productId,
      size,
      price: Math.round(basePriceForSize * 100) / 100,
      discountPercent, // Индивидуальная скидка для каждого размера
    });
  });

  return items;
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
    data: categories || [
      { name: 'Indoor Plants' },
      { name: 'Succulents' },
      { name: 'Flowering Plants' },
      { name: 'Herbs' },
      { name: 'Cacti' },
      { name: 'Bonsai' },
      { name: 'Tools' },
      { name: 'Pots' },
    ],
  });

  for (const productData of products) {
    const sizes = getRandomSizes();

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        imageUrl: productData.imageUrl,
        thumbnailUrl: productData.thumbnailUrl,
        description: productData.description,
        isNew: productData.isNew || false,
        categoryId: productData.categoryId,
        sizes: sizes,
        price: getBasePrice(productData.categoryId),
        discountPercent: Math.random() > 0.5 ? Math.floor(Math.random() * 19) + 1 : 0,
      },
    });

    const productItems = generateProductItems(
      product.id,
      product.price,
      product.sizes as randomSizes,
      product.discountPercent,
    );

    if (productItems.length > 0) {
      await prisma.productItem.createMany({
        data: productItems,
      });
    }
  }

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        total: 0,
        token: '1111',
      },
      {
        userId: 2,
        total: 0,
        token: '2222',
      },
    ],
  });

  const firstProduct = await prisma.product.findFirst({
    include: { items: true },
  });

  if (firstProduct && firstProduct.items.length > 0) {
    await prisma.cartItem.create({
      data: {
        cartId: 1,
        productId: firstProduct.id,
        productItemId: firstProduct.items[0].id,
        quantity: 2,
      },
    });

    const itemPrice = firstProduct.items[0].price;
    const discount = firstProduct.items[0].discountPercent || 0;
    const discountedPrice = itemPrice * (1 - discount / 100);
    const total = discountedPrice * 2;

    await prisma.cart.update({
      where: { id: 1 },
      data: { total: total },
    });
  }
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error('❌ Error during seeding:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
