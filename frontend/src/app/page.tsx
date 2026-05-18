import Hero from '@/components/home/Hero';
import MomentStrip from '@/components/home/MomentStrip';
import Featured from '@/components/home/Featured';
import FlashSale from '@/components/home/FlashSale';
import KitsSection from '@/components/home/KitsSection';
import QuizTeaser from '@/components/home/QuizTeaser';
import Reviews from '@/components/home/Reviews';
import WhyStrip from '@/components/home/WhyStrip';
import SocialBar from '@/components/home/SocialBar';
import { PV_DATA } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MomentStrip categories={PV_DATA.categories} />
      <Featured products={PV_DATA.products} />
      <FlashSale products={PV_DATA.products.filter(p => p.old)} />
      <KitsSection kits={PV_DATA.kits} />
      <QuizTeaser />
      <Reviews reviews={PV_DATA.reviews} />
      <WhyStrip />
      <SocialBar />
    </>
  );
}
