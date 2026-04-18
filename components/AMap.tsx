'use client';

import { useEffect, useRef } from 'react';
import { EGYPT_CITIES } from '@/lib/map-utils';

interface AMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title?: string;
  }>;
  className?: string;
}

export default function AMapComponent({ 
  center = [31.2357, 30.0444], // 默认开罗
  zoom = 6,
  markers = [],
  className = ''
}: AMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // 动态加载高德地图脚本
    const loadAMap = () => {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).AMap) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY || 'YOUR_AMAP_KEY'}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load AMap'));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadAMap();
        
        if (mapRef.current && (window as any).AMap) {
          const AMap = (window as any).AMap;
          
          mapInstance.current = new AMap.Map(mapRef.current, {
            center: center,
            zoom: zoom,
            viewMode: '2D',
            lang: 'zh_cn',
          });

          // 添加标记点
          markers.forEach(marker => {
            const markerInstance = new AMap.Marker({
              position: marker.position,
              title: marker.title,
            });
            mapInstance.current.add(markerInstance);
          });
        }
      } catch (error) {
        console.error('Map initialization failed:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, [center, zoom, markers]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-[400px] bg-gray-100 rounded-lg ${className}`}
      style={{ minHeight: '400px' }}
    >
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p>地图加载中...</p>
          <p className="text-sm mt-2">如需显示真实地图,请配置高德地图 API Key</p>
        </div>
      </div>
    </div>
  );
}

// 重新导出工具函数,保持向后兼容
export { getCityCoordinates, parseLocationCoordinates } from '@/lib/map-utils';
