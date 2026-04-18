import { itineraryData } from '@/data/itinerary';
import DayCard from '@/components/DayCard';
import TipBox from '@/components/TipBox';
import LeafletMap from '@/components/LeafletMap';
import Link from 'next/link';
import Image from 'next/image';

// 埃及主要城市坐标
const EGYPT_CITIES: Record<string, [number, number]> = {
  '开罗': [30.0444, 31.2357],
  '马特鲁': [31.3500, 27.2333],
  '卢克索': [25.6872, 32.6396],
  '赫尔格达': [27.2579, 33.8116],
};

export default function Home() {
  const totalDays = itineraryData.days.length;
  const cities: string[] = [];
  itineraryData.days.forEach(d => {
    const city = d.location.split('→')[0].trim();
    if (!cities.includes(city)) {
      cities.push(city);
    }
  });
  
  // 准备地图标记点
  const mapMarkers: Array<{position: [number, number]; title: string}> = [];
  cities.forEach(city => {
    const coords = EGYPT_CITIES[city];
    if (coords) {
      mapMarkers.push({
        position: coords,
        title: city
      });
    }
  });

  return (
    <div className="min-h-screen bg-magazine-bg">
      {/* Hero Section - 杂志封面风格 */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* 背景图 */}
        <div className="absolute inset-0">
          <Image
            src="/images/pyramids.jpg"
            alt="埃及金字塔"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* 内容 */}
        <div className="relative container mx-auto px-6 text-white">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 text-white/80">
              Travel Guide 2026
            </p>
            <h1 className="text-6xl md:text-8xl font-serif font-light mb-6 leading-tight">
              埃及
              <span className="block text-4xl md:text-6xl mt-2">探索之旅</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              {itineraryData.subtitle}
            </p>
            
            {/* 统计信息 - 简约风格 */}
            <div className="flex gap-12 text-sm tracking-wider">
              <div>
                <span className="block text-3xl font-serif mb-1">{totalDays}</span>
                <span className="text-white/70">天行程</span>
              </div>
              <div>
                <span className="block text-3xl font-serif mb-1">{cities.length}</span>
                <span className="text-white/70">座城市</span>
              </div>
              <div>
                <span className="block text-3xl font-serif mb-1">
                  {itineraryData.days.filter(d => d.schedule.some(s => s.attraction)).length}
                </span>
                <span className="text-white/70">个景点</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest">
          <span className="block mb-2">SCROLL</span>
          <div className="w-px h-8 bg-white/40 mx-auto"></div>
        </div>
      </section>

      {/* 路线地图 - 真实地图 */}
      <section className="py-20 px-6 bg-magazine-card">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-caption mb-3">Journey Route</p>
            <h2 className="text-4xl font-serif text-magazine-text">行程路线</h2>
          </div>
          
          <LeafletMap 
            center={[26.5, 30.5]}
            zoom={6}
            markers={mapMarkers}
            showRoute={true}
          />
          
          {/* 城市列表 - 手动定义正确的显示 */}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {[
              { name: '开罗', days: 'Day 1 & Day 3' },
              { name: '马特鲁', days: 'Day 2' },
              { name: '卢克索', days: 'Day 4-5' },
              { name: '赫尔格达', days: 'Day 6-8' },
            ].map((city, index) => (
              <div key={index} className="text-center">
                <span className="block text-2xl font-serif text-magazine-text">{city.name}</span>
                <span className="text-xs text-magazine-secondary tracking-wider uppercase">
                  {city.days}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 每日行程 - 杂志网格布局 */}
      <section id="overview" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-caption mb-3">Itinerary</p>
            <h2 className="text-4xl font-serif text-magazine-text">每日行程</h2>
            <div className="section-divider max-w-xs mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {itineraryData.days.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        </div>
      </section>

      {/* 精选景点 - 大图展示 */}
      <section className="py-20 px-6 bg-magazine-sand">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-caption mb-3">Highlights</p>
            <h2 className="text-4xl font-serif text-magazine-text">精选景点</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: '吉萨金字塔', image: '/images/pyramids.jpg', desc: '古代世界七大奇迹' },
              { name: '狮身人面像', image: '/images/sphinx.jpg', desc: '守护金字塔的神秘巨像' },
              { name: '大埃及博物馆', image: '/images/egypt-museum.jpg', desc: '世界最大考古博物馆' },
              { name: '卢克索神庙', image: '/images/luxor.jpg', desc: '古埃及宗教圣地' },
            ].map((spot, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="image-container aspect-[4/3] mb-4 bg-magazine-sand">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif text-magazine-text mb-1">{spot.name}</h3>
                <p className="text-sm text-magazine-secondary">{spot.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意事项 */}
      <section id="tips" className="py-20 px-6 bg-magazine-card">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-caption mb-3">Travel Tips</p>
            <h2 className="text-4xl font-serif text-magazine-text">出行须知</h2>
          </div>
          
          <div className="space-y-4">
            {itineraryData.generalTips.map((tip, index) => (
              <TipBox key={index} tip={tip} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer - 简约风格 */}
      <footer className="py-12 px-6 border-t border-magazine-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif text-magazine-text">埃及探索之旅</h3>
              <p className="text-sm text-magazine-secondary mt-1">2026.04.28 - 05.05</p>
            </div>
            <div className="flex gap-6 text-sm text-magazine-secondary">
              <Link href="/" className="hover:text-magazine-text transition-colors">首页</Link>
              <Link href="/#overview" className="hover:text-magazine-text transition-colors">行程</Link>
              <Link href="/history" className="hover:text-magazine-text transition-colors">历史</Link>
              <Link href="/#tips" className="hover:text-magazine-text transition-colors">须知</Link>
            </div>
          </div>
          <div className="section-divider my-8"></div>
          <p className="text-center text-xs text-magazine-secondary">
            © 2026 Egypt Travel Guide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
