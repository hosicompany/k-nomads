import HeroSection from '@/components/home/HeroSection';
import HotCities from '@/components/home/HotCities';
import LiveMap from '@/components/home/LiveMap';
import Events from '@/components/home/Events';
import Guide from '@/components/home/Guide';
import RecentCities from '@/components/home/RecentCities';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RecentCities />
      <HotCities />
      <LiveMap />
      <Events />
      <Guide />
    </main>
  );
}
