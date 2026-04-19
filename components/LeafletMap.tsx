'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 动态导入 Leaflet 组件，避免 SSR 问题
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

import 'leaflet/dist/leaflet.css';

// Leaflet 只在客户端加载
let L: any = null;
if (typeof window !== 'undefined') {
  L = require('leaflet');
}

// 地图模式切换按钮组件
function MapModeToggle({ isInteractive, onToggle }: { isInteractive: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-md border border-magazine-border/50 flex items-center gap-1.5 hover:bg-white transition-colors"
    >
      {isInteractive ? (
        <>
          <svg className="w-3.5 h-3.5 text-magazine-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>浏览模式</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 text-magazine-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>阅读模式</span>
        </>
      )}
    </button>
  );
}

interface MapMarker {
  position: [number, number];
  title: string;
  days?: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  showRoute?: boolean;
}

// 埃及主要城市坐标和天数信息
const EGYPT_CITIES: Record<string, { coords: [number, number]; days: string }> = {
  '开罗': { coords: [30.0444, 31.2357], days: 'Day 1 & Day 3' },
  '马特鲁': { coords: [31.3500, 27.2333], days: 'Day 2' },
  '卢克索': { coords: [25.6872, 32.6396], days: 'Day 4-5' },
  '赫尔格达': { coords: [27.2579, 33.8116], days: 'Day 6-8' },
};

// 详细地点数据：景点、住宿、餐厅、机场
type LocationType = 'attraction' | 'hotel' | 'restaurant' | 'airport';

interface DetailLocation {
  name: string;
  coords: [number, number];
  type: LocationType;
  city: string;
  description?: string;
}

const DETAIL_LOCATIONS: DetailLocation[] = [
  // 开罗 - 景点
  { name: '吉萨金字塔群', coords: [29.9792, 31.1342], type: 'attraction', city: '开罗', description: '古代世界七大奇迹之一' },
  { name: '狮身人面像', coords: [29.9753, 31.1376], type: 'attraction', city: '开罗', description: '守护金字塔的神秘雕像' },
  { name: '埃及博物馆', coords: [30.0478, 31.2336], type: 'attraction', city: '开罗', description: '世界最大的古埃及文物收藏' },
  { name: '大埃及博物馆', coords: [29.9946, 31.1206], type: 'attraction', city: '开罗', description: '2024年新开放的博物馆' },
  { name: '哈利利市场', coords: [30.0477, 31.2623], type: 'attraction', city: '开罗', description: '中东最大的传统集市' },
  { name: '萨拉丁城堡', coords: [30.0287, 31.2599], type: 'attraction', city: '开罗', description: '俯瞰开罗全景的堡垒' },
  { name: '洞穴教堂', coords: [30.0125, 31.2856], type: 'attraction', city: '开罗', description: ' Mokattam 山中的神奇教堂' },
  
  // 开罗 - 住宿
  { name: 'JAZ Pyramids Resort', coords: [29.9760, 31.1250], type: 'hotel', city: '开罗', description: '金字塔景观酒店' },
  { name: 'Marriott Mena House', coords: [29.9780, 31.1320], type: 'hotel', city: '开罗', description: '历史悠久的奢华酒店' },
  
  // 开罗 - 餐厅
  { name: "Khufu's Restaurant", coords: [29.9785, 31.1345], type: 'restaurant', city: '开罗', description: '金字塔观景餐厅' },
  { name: 'Felfela', coords: [30.0450, 31.2400], type: 'restaurant', city: '开罗', description: '传统埃及菜' },
  
  // 马特鲁 - 景点
  { name: 'Cleopatra Beach', coords: [31.3500, 27.2000], type: 'attraction', city: '马特鲁', description: '埃及最美的海滩之一' },
  { name: "Lover's Beach", coords: [31.3400, 27.2100], type: 'attraction', city: '马特鲁', description: '浪漫的隐秘海滩' },
  { name: 'Sea Eye', coords: [31.3600, 27.1900], type: 'attraction', city: '马特鲁', description: '天然岩石泳池' },
  
  // 马特鲁 - 住宿
  { name: 'Hostmark Blue Beach Hotel', coords: [31.3550, 27.2300], type: 'hotel', city: '马特鲁', description: '四星级海景酒店' },
  
  // 马特鲁 - 餐厅
  { name: 'Magdy Seafood', coords: [31.3520, 27.2250], type: 'restaurant', city: '马特鲁', description: '当地海鲜餐厅' },
  
  // 卢克索 - 景点
  { name: '卡纳克神庙', coords: [25.7188, 32.6573], type: 'attraction', city: '卢克索', description: '世界最大的神庙建筑群' },
  { name: '卢克索神庙', coords: [25.6995, 32.6391], type: 'attraction', city: '卢克索', description: '尼罗河畔的宏伟神庙' },
  { name: '帝王谷', coords: [25.7402, 32.6014], type: 'attraction', city: '卢克索', description: '法老陵墓群' },
  { name: '哈特谢普苏特神庙', coords: [25.7375, 32.6069], type: 'attraction', city: '卢克索', description: '女法老的壮观神庙' },
  { name: '哈布城', coords: [25.7194, 32.6011], type: 'attraction', city: '卢克索', description: '拉美西斯三世神庙' },
  { name: '门农巨像', coords: [25.7206, 32.6106], type: 'attraction', city: '卢克索', description: '两座巨型石像' },
  { name: '丹德拉神庙', coords: [26.1417, 32.6703], type: 'attraction', city: '卢克索', description: '保存最完好的神庙之一' },
  
  // 卢克索 - 住宿
  { name: 'Hilton Luxor', coords: [25.6870, 32.6400], type: 'hotel', city: '卢克索', description: '尼罗河畔五星酒店' },
  { name: 'Sofitel Winter Palace', coords: [25.6980, 32.6390], type: 'hotel', city: '卢克索', description: '历史悠久的宫殿酒店' },
  
  // 卢克索 - 餐厅
  { name: 'Al-Sahaby Lane', coords: [25.7000, 32.6400], type: 'restaurant', city: '卢克索', description: '卢克索神庙附近餐厅' },
  
  // 赫尔格达 - 景点
  { name: 'Giftun Island', coords: [27.2000, 33.9500], type: 'attraction', city: '赫尔格达', description: '浮潜胜地' },
  { name: 'Orange Bay', coords: [27.2500, 33.8500], type: 'attraction', city: '赫尔格达', description: '美丽的海湾' },
  { name: 'Abu Dabbab Beach', coords: [25.3333, 34.7333], type: 'attraction', city: '赫尔格达', description: '海龟海滩' },
  
  // 赫尔格达 - 住宿
  { name: 'Pickalbatros Citadel', coords: [27.2570, 33.8120], type: 'hotel', city: '赫尔格达', description: '城堡主题度假村' },
  { name: 'Marriott Beach Resort', coords: [27.2600, 33.8150], type: 'hotel', city: '赫尔格达', description: '海滨度假酒店' },
  
  // 赫尔格达 - 餐厅
  { name: 'Starfish Restaurant', coords: [27.2580, 33.8130], type: 'restaurant', city: '赫尔格达', description: '海鲜餐厅' },
  
  // 机场
  { name: '开罗国际机场', coords: [30.1219, 31.4056], type: 'airport', city: '开罗', description: 'CAI - 主要国际门户' },
  { name: '卢克索国际机场', coords: [25.6710, 32.7066], type: 'airport', city: '卢克索', description: 'LXR - 尼罗河谷门户' },
  { name: '赫尔格达国际机场', coords: [27.1783, 33.7994], type: 'airport', city: '赫尔格达', description: 'HRG - 红海度假门户' },
  { name: '马特鲁机场', coords: [31.3256, 27.2139], type: 'airport', city: '马特鲁', description: 'MUH - 地中海沿岸' },
];

// 行程路线顺序
const ROUTE_ORDER = ['开罗', '马特鲁', '开罗', '卢克索', '赫尔格达'];

export default function LeafletMap({ 
  center = [28.5, 31.0], 
  zoom = 5,
  markers = [],
  showRoute = true
}: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] bg-magazine-sand rounded-lg flex items-center justify-center">
        <p className="text-magazine-secondary">地图加载中...</p>
      </div>
    );
  }

  // 构建路线坐标
  const routePositions: [number, number][] = showRoute 
    ? ROUTE_ORDER.map(city => EGYPT_CITIES[city]?.coords).filter((coords): coords is [number, number] => !!coords)
    : [];
  
  // 当缩放级别 >= 10 时显示详细标记
  const showDetailMarkers = currentZoom >= 10;

  return (
    <div 
      className="relative w-full h-[400px] rounded-lg overflow-hidden border border-magazine-border"
      style={{ touchAction: isInteractive ? 'auto' : 'pan-y pinch-zoom' }}
    >
      <MapModeToggle 
        isInteractive={isInteractive} 
        onToggle={() => setIsInteractive(!isInteractive)} 
      />
      <MapContainer
        key={isInteractive ? 'interactive' : 'static'}
        center={center}
        zoom={zoom}
        scrollWheelZoom={isInteractive}
        dragging={isInteractive}
        touchZoom={isInteractive}
        doubleClickZoom={isInteractive}
        boxZoom={isInteractive}
        keyboard={isInteractive}
        style={{ width: '100%', height: '100%' }}
      >
        {/* CartoDB 瓦片 - 英文标注、清晰简洁 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={['a', 'b', 'c', 'd']}
        />
        
        {/* 缩放监听 */}
        {L && (
          <MapEvents onZoomChange={setCurrentZoom} />
        )}
        
        {/* 路线 */}
        {showRoute && routePositions.length > 1 && (
          <Polyline
            positions={routePositions}
            color="#C9A962"
            weight={3}
            opacity={0.8}
            dashArray="10, 10"
          />
        )}
        
        {/* 城市主标记点 - 使用自定义 DivIcon 显示地点名称和天数 */}
        {L && Object.entries(EGYPT_CITIES).map(([cityName, data]) => {
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background: #1A1A1A;
                color: white;
                padding: 6px 10px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                text-align: center;
                line-height: 1.3;
              ">
                <div>${cityName}</div>
                <div style="font-size: 10px; color: #C9A962;">${data.days}</div>
              </div>
            `,
            iconSize: [80, 40],
            iconAnchor: [40, 20],
          });
          
          return (
            <Marker 
              key={cityName} 
              position={data.coords}
              icon={customIcon}
            />
          );
        })}
        
        {/* 详细地点标记 - 仅在放大到城市级别后显示 */}
        {showDetailMarkers && L && DETAIL_LOCATIONS.map((location) => {
          const colors = {
            attraction: { bg: '#D4AF37', text: '#1A1A1A' },
            hotel: { bg: '#2C5F8A', text: '#FFFFFF' },
            restaurant: { bg: '#8B4513', text: '#FFFFFF' },
            airport: { bg: '#228B22', text: '#FFFFFF' },
          };
          const color = colors[location.type];
          const icons = {
            attraction: '🏛️',
            hotel: '🏨',
            restaurant: '🍽️',
            airport: '✈️',
          };
          
          const detailIcon = L.divIcon({
            className: 'detail-marker',
            html: `
              <div style="
                background: ${color.bg};
                color: ${color.text};
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 500;
                white-space: nowrap;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                text-align: center;
                line-height: 1.2;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                max-width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
              ">
                <span style="flex-shrink: 0;">${icons[location.type]}</span>
                <span style="overflow: hidden; text-overflow: ellipsis;">${location.name}</span>
              </div>
            `,
            iconSize: [150, 28],
            iconAnchor: [75, 14],
          });
          
          return (
            <Marker
              key={`${location.city}-${location.name}`}
              position={location.coords}
              icon={detailIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

// 地图事件监听组件
function MapEvents({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const [reactLeaflet, setReactLeaflet] = useState<any>(null);
  
  useEffect(() => {
    import('react-leaflet').then((mod) => {
      setReactLeaflet(mod);
    });
  }, []);
  
  if (!reactLeaflet) return null;
  
  const { useMap } = reactLeaflet;
  
  const ZoomTracker = () => {
    const map = useMap();
    
    useEffect(() => {
      onZoomChange(map.getZoom());
      map.on('zoomend', () => {
        onZoomChange(map.getZoom());
      });
    }, [map]);
    
    return null;
  };
  
  return <ZoomTracker />;
}
