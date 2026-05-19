import { PV_DATA } from '@/lib/data';
import CategoryView from '@/components/views/CategoryView';

export function generateStaticParams() {
  return PV_DATA.categories.map(c => ({ slug: c.id }));
}
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = PV_DATA.categories.find(c => c.id === params.slug);
  const products = PV_DATA.products.filter(p => p.cat === params.slug);
  return <CategoryView category={cat} products={products} />;
}
