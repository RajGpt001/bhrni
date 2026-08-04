import { PrismaClient } from '@prisma/client';
import { PrismaSqlite } from 'prisma-adapter-sqlite';

const adapter = new PrismaSqlite({ url: './dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Find category "Electronics"
  let electronics = await prisma.category.findFirst({
    where: { name: 'Electronics' }
  });

  if (!electronics) {
    electronics = await prisma.category.create({
      data: { name: 'Electronics', slug: 'electronics' }
    });
  }

  let seller = await prisma.seller.findFirst();
  if (!seller) {
    let user = await prisma.user.findFirst();
    if (!user) user = await prisma.user.create({ data: { name: 'Admin', email: 'admin@lyke.in' } });
    seller = await prisma.seller.create({
      data: { name: 'Lyke Official' }
    });
  }

  // Check if product already exists to avoid duplicates
  let product = await prisma.product.findUnique({
    where: { slug: 'international-adaptor' }
  });

  if (product) {
    console.log('Product already exists, deleting and recreating...');
    await prisma.product.delete({ where: { slug: 'international-adaptor' } });
  }

  product = await prisma.product.create({
    data: {
      name: 'International Adaptor',
      slug: 'international-adaptor',
      description: 'Universal Travel Adapter Plug. Portable Charging, Supports Multiple Power Conversion for Europe, UK, USA, AUS. Small and Portable, Easy to Carry. Anti-electric Shock Protection Door. Over-voltage Protection, Short-Circuit Protection, Safe Fireproof Shell. Slide Switch to pop out pins for easy storage.',
      price: 399,
      mrp: 999,
      published: true,
      featured: true,
      category: {
        connect: { id: electronics.id }
      },
      seller: {
        connect: { id: seller.id }
      },
      images: {
        create: [
          { url: '/products/international-adaptor/1.png', alt: 'International Adaptor Front View' },
          { url: '/products/international-adaptor/2.png', alt: 'Universal Travel Adapter Features' },
          { url: '/products/international-adaptor/3.jpg', alt: 'Small and Portable Adaptor' },
          { url: '/products/international-adaptor/4.png', alt: 'Anti-electric Shock Protection' },
          { url: '/products/international-adaptor/5.jpg', alt: 'Slide Switch Design' }
        ]
      }
    }
  });

  console.log('Created product:', product.name);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
