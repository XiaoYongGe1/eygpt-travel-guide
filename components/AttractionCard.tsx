'use client';

import { Attraction } from '../types';
import { useState } from 'react';

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [showSubAttractions, setShowSubAttractions] = useState(false);
  const [showArtifacts, setShowArtifacts] = useState(false);

  return (
    <div className="space-y-3">
      {/* 景点图片 */}
      {attraction.image && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
          <img
            src={attraction.image}
            alt={attraction.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="object-cover"
          />
        </div>
      )}

      {/* 基本信息 - 扁平化展示 */}
      <div className="flex flex-wrap gap-3">
        {attraction.duration && (
          <div className="flex items-center gap-2 bg-magazine-sand/50 px-3 py-1.5 rounded-lg">
            <span className="text-magazine-accent">⏱️</span>
            <span className="text-sm text-magazine-secondary">{attraction.duration}</span>
          </div>
        )}
        
        {attraction.ticketPrice && (
          <div className="flex items-center gap-2 bg-magazine-accent/10 px-3 py-1.5 rounded-lg">
            <span className="text-magazine-accent">🎫</span>
            <span className="text-sm text-magazine-secondary">{attraction.ticketPrice}</span>
          </div>
        )}
      </div>

      {/* 门票提示 */}
      {attraction.ticketTip && (
        <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
          <span className="text-amber-500 mt-0.5">💡</span>
          <span>{attraction.ticketTip}</span>
        </div>
      )}

      {/* 历史故事 - 更简洁的折叠面板 */}
      {attraction.history && (
        <div className="border border-magazine-border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between p-4 bg-magazine-sand/30 hover:bg-magazine-sand/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <span className="font-medium text-magazine-text">历史故事</span>
            </div>
            <svg
              className={`w-5 h-5 text-magazine-accent transform transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showHistory && (
            <div className="p-4 bg-magazine-bg text-sm leading-relaxed text-magazine-secondary whitespace-pre-line border-t border-magazine-border">
              {attraction.history}
            </div>
          )}
        </div>
      )}

      {/* 子景点 - 如马特鲁海滩群 */}
      {attraction.subAttractions && attraction.subAttractions.length > 0 && (
        <div className="border border-magazine-border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowSubAttractions(!showSubAttractions)}
            className="w-full flex items-center justify-between p-4 bg-magazine-sand/30 hover:bg-magazine-sand/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏖️</span>
              <span className="font-medium text-magazine-text">景点详情 ({attraction.subAttractions.length}个)</span>
            </div>
            <svg
              className={`w-5 h-5 text-magazine-accent transform transition-transform duration-300 ${showSubAttractions ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showSubAttractions && (
            <div className="p-4 bg-magazine-bg border-t border-magazine-border space-y-4">
              {attraction.subAttractions.map((sub, index) => (
                <div key={index} className="bg-magazine-sand/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-magazine-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <h5 className="font-medium text-magazine-text">{sub.name}</h5>
                  </div>
                  <p className="text-sm text-magazine-secondary">{sub.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 文物展示 - 如博物馆 */}
      {attraction.artifacts && attraction.artifacts.length > 0 && (
        <div className="border border-magazine-border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowArtifacts(!showArtifacts)}
            className="w-full flex items-center justify-between p-4 bg-magazine-sand/30 hover:bg-magazine-sand/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏺</span>
              <span className="font-medium text-magazine-text">珍贵文物 ({attraction.artifacts.length}件)</span>
            </div>
            <svg
              className={`w-5 h-5 text-magazine-accent transform transition-transform duration-300 ${showArtifacts ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showArtifacts && (
            <div className="p-4 bg-magazine-bg border-t border-magazine-border space-y-4">
              {attraction.artifacts.map((artifact, index) => (
                <div key={index} className="bg-magazine-sand/30 rounded-lg p-3">
                  <h5 className="font-medium text-magazine-text mb-1">{artifact.name}</h5>
                  <p className="text-sm text-magazine-secondary">{artifact.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 游览建议 */}
      {attraction.visitTips && attraction.visitTips.length > 0 && (
        <div className="bg-magazine-sand/30 p-4 rounded-xl border border-magazine-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-magazine-accent">✨</span>
            <span className="font-medium text-magazine-text">游览建议</span>
          </div>
          <ul className="space-y-2">
            {attraction.visitTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-magazine-secondary">
                <span className="text-magazine-accent mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
