import ProductClient from '@/shared/components/shared/product-client';
import RadioSizes from '@/shared/components/shared/radioSizes';
import { Title } from '@/shared/components/shared/title';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    notFound();
  }
  const sizes: [string, boolean][] = Object.entries(JSON.parse(JSON.stringify(product.sizes)));
  console.log(sizes);
  return (
    <div className="flex gap-13">
      <ProductClient product={product} />
      <div className="grow">
        <Title className="font-bold text-[28px] mb-5" text={product.name}></Title>
        <div className="w-full text-primary text-[22px] font-bold pb-3 border-b border-primary">
          ${product.price.toFixed(2)}
        </div>
        <h5 className="pt-4 text-[15px] font-medium">Short Description:</h5>
        <p className="text-muted-foreground text-[14px] mb-6">{product.description}</p>
        <Title className="text-[15px] font-medium" text="Size:"></Title>
        <RadioSizes sizes={sizes} />
      </div>
    </div>
  );
};

export default Product;
