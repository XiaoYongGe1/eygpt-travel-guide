'use client';

import { itineraryData } from '@/data/itinerary';

export default function EgyptMap() {
  const cities = [
    { name: '开罗', x: 55, y: 25, day: 1 },
    { name: '马特鲁', x: 25, y: 15, day: 2 },
    { name: '卢克索', x: 60, y: 65, day: 4 },
    { name: '赫尔格达', x: 75, y: 60, day: 6 },
  ];

  const routePoints = cities.map(c => `${c.x},${c.y}`).join(' ');

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <svg
        viewBox="0 0 100 80"
        className="w-full h-auto drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(27, 58, 92, 0.2))' }}
      >
        {/* 背景 - 沙漠色 */}
        <rect width="100" height="80" fill="#F4E4C1" rx="4" />
        
        {/* 地中海 */}
        <path
          d="M0,0 L100,0 L100,12 Q50,18 0,12 Z"
          fill="#1B3A5C"
          opacity="0.9"
        />
        
        {/* 红海 */}
        <path
          d="M85,25 L100,25 L100,80 L85,80 Q90,52 85,25 Z"
          fill="#1B3A5C"
          opacity="0.9"
        />
        
        {/* 尼罗河 */}
        <path
          d="M55,25 Q58,35 55,45 Q52,55 58,65 Q62,72 60,80"
          fill="none"
          stroke="#2C5F8A"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* 路线 - 虚线 */}
        <polyline
          points={routePoints}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="3,2"
          opacity="0.6"
        />
        
        {/* 路线 - 动画效果 */}
        <polyline
          points={routePoints}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset="100"
          opacity="0.9"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="2s"
            fill="freeze"
          />
        </polyline>
        
        {/* 城市标记 */}
        {cities.map((city, index) => (
          <g key={city.name}>
            {/* 外圈发光 */}
            <circle
              cx={city.x}
              cy={city.y}
              r="4"
              fill="#D4AF37"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="4;6;4"
                dur="2s"
                repeatCount="indefinite"
                begin={`${index * 0.3}s`}
              />
            </circle>
            
            {/* 主标记 */}
            <circle
              cx={city.x}
              cy={city.y}
              r="3"
              fill="#D4AF37"
              stroke="#FFF"
              strokeWidth="1"
            />
            
            {/* 城市名称 */}
            <text
              x={city.x}
              y={city.y - 6}
              textAnchor="middle"
              fontSize="3.5"
              fontWeight="bold"
              fill="#1B3A5C"
            >
              {city.name}
            </text>
            
            {/* Day 标记 */}
            <rect
              x={city.x - 4}
              y={city.y + 3}
              width="8"
              height="3"
              rx="1"
              fill="#1B3A5C"
            />
            <text
              x={city.x}
              y={city.y + 5.5}
              textAnchor="middle"
              fontSize="2"
              fill="#FFF"
            >
              Day{city.day}
            </text>
          </g>
        ))}
        
        {/* 标题 */}
        <text
          x="50"
          y="6"
          textAnchor="middle"
          fontSize="4"
          fontWeight="bold"
          fill="#D4AF37"
        >
          埃及探索之旅路线
        </text>
      </svg>
      
      {/* 图例 */}
      <div className="flex justify-center gap-6 mt-4 text-sm text-egypt-brown">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-egypt-gold animate-pulse"></div>
          <span>途经城市</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-egypt-gold" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #D4AF37 0, #D4AF37 4px, transparent 4px, transparent 6px)' }}></div>
          <span>行程路线</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-egypt-blue"></div>
          <span>水域</span>
        </div>
      </div>
    </div>
  );
}
