
import React from 'react';
import { Attraction } from '../types';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  const imageUrl = attraction.images.length > 0 
    ? attraction.images[0].src 
    : `https://images.unsplash.com/photo-1513047330596-0f86f586019a?auto=format&fit=crop&q=80&w=800`;

  return (
    <div className="group flex flex-col h-full cursor-pointer">
      {/* 圖片區域：帶有黃色標籤 */}
      <div className="relative aspect-video mb-4 overflow-hidden rounded-sm">
        <img 
          src={imageUrl} 
          alt={attraction.name}
          className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 bg-[#FFD100] text-[#333] px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
          {attraction.address.substring(0, 3)}
        </div>
      </div>
      
      {/* 內容區域：左對齊簡約文字 */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-relaxed group-hover:text-[#0071BC] transition-colors">
          ＜ {attraction.name} ＞
        </h3>
        <p className="text-[12px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {attraction.introduction}
        </p>
        
        <div className="mt-auto flex items-center text-[11px] font-bold text-gray-400 group-hover:text-[#0071BC]">
          <span>DETAILS</span>
          <i className="fas fa-chevron-right ml-2 text-[8px] transition-transform group-hover:translate-x-1"></i>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
