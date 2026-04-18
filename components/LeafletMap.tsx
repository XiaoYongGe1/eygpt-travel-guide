'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 修复 Leaflet 默认图标问题
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src || '/marker-icon.png',
  shadowUrl: iconShadow.src || '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapMarker {
  position: [number, number];
  title: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  showRoute?: boolean;
}

// 埃及主要城市坐标
const EGYPT_CITIES: Record<string, [number, number]> = {
  '开罗': [30.0444, 31.2357],
  '吉萨': [29.9870, 31.2118],
  '马特鲁': [31.3500, 27.2333],
  '亚历山大': [31.2001, 29.9187],
  '卢克索': [25.6872, 32.6396],
  '阿斯旺': [24.0889, 32.8998],
  '赫尔格达': [27.2579, 33.8116],
  '沙姆沙伊赫': [27.9158, 34.3299],
};

// 行程路线顺序
const ROUTE_ORDER = ['开罗', '马特鲁', '开罗', '卢克索', '赫尔格达'];

export default function LeafletMap({ 
  center = [26.5, 30.5], 
  zoom = 6,
  markers = [],
  showRoute = true
}: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);

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
  const routePositions = showRoute 
    ? ROUTE_ORDER.map(city => EGYPT_CITIES[city]).filter(Boolean) as [number, number][]
    : [];

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-magazine-border">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        {/* 高德地图瓦片 - 使用英文标注版本避免中文乱码 */}
        <TileLayer
          attribution='&copy; <a href="https://www.amap.com">高德地图</a>'
          url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
          subdomains={['1', '2', '3', '4']}
        />
        
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
        
        {/* 标记点 */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div className="text-magazine-text font-medium">
                {marker.title}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
