'use client';

import { DaySchedule } from '../types';
import AttractionCard from './AttractionCard';

interface TimelineProps {
  schedule: DaySchedule['schedule'];
}

export default function Timeline({ schedule }: TimelineProps) {
  return (
    <div className="space-y-4">
      {schedule.map((item, index) => (
        <div 
          key={index} 
          className="magazine-card overflow-hidden"
        >
          {/* 头部 - 时间和活动 */}
          <div className="bg-magazine-sand/30 p-4 flex items-center gap-4">
            {/* 时间标记 */}
            <div className="flex-shrink-0 w-16 h-16 bg-magazine-text rounded-xl flex flex-col items-center justify-center text-white">
              <span className="text-xs opacity-80">STEP</span>
              <span className="text-2xl font-bold">{index + 1}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-magazine-accent font-bold text-lg">{item.time}</span>
                {item.attraction && (
                  <span className="text-xs bg-magazine-accent/10 text-magazine-accent px-2 py-0.5 rounded-full">
                    景点
                  </span>
                )}
              </div>
              <h4 className="font-medium text-magazine-text text-lg">{item.activity}</h4>
            </div>
          </div>

          {/* 景点详情 */}
          {item.attraction && (
            <div className="p-4">
              <AttractionCard attraction={item.attraction} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
