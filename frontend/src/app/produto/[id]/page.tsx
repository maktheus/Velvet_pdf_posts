import { PV_DATA } from '@/lib/data';
import ProductView from '@/components/views/ProductView';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return PV_DATA.products.map(p => ({ id: p.id }));
}
export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PV_DATA.products.find(p => p.id === params.id);
  if (!product) notFound();
  const related = PV_DATA.products.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  return <ProductView product={product} related={related} />;
}
