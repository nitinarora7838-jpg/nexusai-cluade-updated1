import { notFound } from 'next/navigation';
import { getProductBySlug, PRODUCTS_DATA } from '@/lib/products-data';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  return PRODUCTS_DATA.map(p => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductPageClient product={product} />;
}
