const { PrismaClient } = require('@prisma/client');
const { PrismaSqlite } = require('prisma-adapter-sqlite');
const adapter = new PrismaSqlite({ url: './dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create Categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: { name: 'Electronics', slug: 'electronics', description: 'Gadgets, phones, and more.' }
  });

  const fashion = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: { name: 'Fashion', slug: 'fashion', description: 'Clothing and apparel.' }
  });

  const home = await prisma.category.upsert({
    where: { slug: 'home-kitchen' },
    update: {},
    create: { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Appliances and decor.' }
  });

  const beauty = await prisma.category.upsert({
    where: { slug: 'beauty' },
    update: {},
    create: { name: 'Beauty', slug: 'beauty', description: 'Cosmetics and personal care.' }
  });

  const grocery = await prisma.category.upsert({
    where: { slug: 'grocery' },
    update: {},
    create: { name: 'Grocery', slug: 'grocery', description: 'Daily essentials.' }
  });

  // Create a default seller
  const seller = await prisma.seller.create({
    data: {
      name: 'Lyke Official Retail',
      description: 'The official retail arm of Lyke India',
      verified: true,
    }
  });

  // Seed Products
  const productsToSeed = [
    {
      name: 'Smartphone Pro Max',
      slug: 'smartphone-pro-max',
      description: 'The latest flagship smartphone with an incredible camera.',
      categoryId: electronics.id,
      sellerId: seller.id,
      mrp: 99999,
      price: 89999,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=800&q=80',
      modelUrl: '/models/placeholder.glb',
    },
    {
      name: 'Wireless Noise-Cancelling Headphones',
      slug: 'wireless-headphones-nc',
      description: 'Premium over-ear headphones.',
      categoryId: electronics.id,
      sellerId: seller.id,
      mrp: 29999,
      price: 19999,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
      modelUrl: '/models/placeholder.glb',
    },
    {
      name: 'Men\'s Casual Cotton Shirt',
      slug: 'mens-casual-cotton-shirt',
      description: 'Comfortable everyday wear.',
      categoryId: fashion.id,
      sellerId: seller.id,
      mrp: 1999,
      price: 999,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=800&q=80',
    },
    {
      name: 'Smart 4K TV 55-inch',
      slug: 'smart-4k-tv-55',
      description: 'Stunning picture quality.',
      categoryId: electronics.id,
      sellerId: seller.id,
      mrp: 54999,
      price: 45999,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    },
    {
      name: 'Hydrating Face Serum',
      slug: 'hydrating-face-serum',
      description: 'Glow all day long.',
      categoryId: beauty.id,
      sellerId: seller.id,
      mrp: 1299,
      price: 899,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    },
    {
      name: 'Non-Stick Cookware Set',
      slug: 'non-stick-cookware-set',
      description: 'Cook like a pro.',
      categoryId: home.id,
      sellerId: seller.id,
      mrp: 4999,
      price: 2999,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6a9b4414e86?w=800&q=80',
    },
  ];

  for (const p of productsToSeed) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        categoryId: p.categoryId,
        sellerId: p.sellerId,
        mrp: p.mrp,
        price: p.price,
        featured: p.featured,
        modelUrl: p.modelUrl,
        images: {
          create: [{ url: p.imageUrl, alt: p.name }]
        }
      }
    });
    console.log(`Created product: ${createdProduct.name}`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
