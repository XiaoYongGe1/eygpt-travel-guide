import Link from 'next/link';
import Image from 'next/image';
import { DaySchedule } from '../types';

interface DayCardProps {
  day: DaySchedule;
}

export default function DayCard({ day }: DayCardProps) {
  const mainAttraction = day.schedule.find(s => s.attraction)?.attraction;
  const hasImage = mainAttraction?.image;
  
  return (
    <Link href={`/day/${day.day}`}>
      <article className="magazine-card h-full flex flex-col cursor-pointer group">
        {/* 图片区域 */}
        {hasImage && (
          <div className="image-container aspect-[4/3] relative">
            <Image
              src={mainAttraction.image!}
              alt={mainAttraction.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="tag bg-white/90 backdrop-blur-sm">Day {day.day}</span>
            </div>
          </div>
        )}
        
        {/* 内容区域 */}
        <div className="p-6 flex-1 flex flex-col">
          {/* 日期和地点 */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-caption">{day.date}</span>
            <span className="text-xs text-magazine-secondary">
              {day.schedule.length} 个行程
            </span>
          </div>
          
          <h3 className="text-xl font-serif text-magazine-text mb-2 group-hover:text-magazine-accent transition-colors">
            {day.location}
          </h3>
          
          {/* 主要景点 */}
          {mainAttraction && (
            <p className="text-sm text-magazine-secondary line-clamp-2 mb-4">
              {mainAttraction.name}
            </p>
          )}
          
          {/* 住宿 */}
          {day.hotel && (
            <div className="mt-auto pt-4 border-t border-magazine-border">
              <p className="text-xs text-magazine-secondary">
                住宿: {day.hotel}
              </p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
