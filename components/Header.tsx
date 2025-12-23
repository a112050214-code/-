
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#0071BC] rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
              <i className="fas fa-water text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black text-[#0071BC] tracking-widest leading-none">TAIPEI</h1>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Tourism Explorer</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-10">
            {['About', 'Attractions', 'Activities', 'Guides', 'Access'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-[13px] font-bold text-gray-600 hover:text-[#0071BC] transition-colors tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
              <i className="far fa-envelope text-gray-400 cursor-pointer hover:text-blue-500"></i>
              <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer group">
                <i className="fas fa-bars text-[10px] text-gray-400 group-hover:text-blue-500"></i>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
