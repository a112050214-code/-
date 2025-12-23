
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import AttractionCard from './components/AttractionCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { fetchAttractions } from './services/api';
import { Attraction, Language, LANGUAGE_LABELS } from './types';

const App: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>(Language.ZH_TW);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const loadData = useCallback(async (currentLang: Language, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAttractions(currentLang, currentPage);
      if (result && result.data) {
        setAttractions(result.data);
      } else {
        setAttractions([]);
      }
    } catch (err: any) {
      setError(err.message || '連線失敗');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(lang, page);
  }, [lang, page, loadData]);

  const handleSearchClick = () => {
    setKeyword(searchInput);
    setPage(1);
  };

  const handleTaipeiAreaClick = () => {
    setSearchInput('');
    setKeyword('');
    setPage(1);
  };

  const filteredAttractions = useMemo(() => {
    if (!keyword.trim()) return attractions;
    const lowerKeyword = keyword.toLowerCase();
    return attractions.filter(item => 
      item.name.toLowerCase().includes(lowerKeyword) || 
      item.introduction.toLowerCase().includes(lowerKeyword)
    );
  }, [attractions, keyword]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-end px-6 lg:px-24 bg-[#E0F2FE]">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
          alt="Taipei"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 max-w-lg text-right">
          <h2 className="text-4xl lg:text-5xl font-black text-[#0071BC] mb-4 tracking-tighter leading-tight">
            台北と出会う。<br/>台北で出会う。
          </h2>
          <div className="flex justify-end mb-6">
            <div className="w-12 h-1 bg-[#0071BC]"></div>
          </div>
          <p className="text-[13px] font-bold text-gray-700 leading-loose">
            風・水・波・空・緑⋯台北でしかできない非日常体験を通じて、<br/>
            将来を担ってゆく青少年の胸の中に眠る「環境、自然を大切に思う心」を<br/>
            呼びさますようなプログラムを企画・提供しています。
          </p>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-[200%] h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* SERVICE Section Style - Search */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-black text-[#0071BC] mb-2 tracking-[0.2em] title-wave">SEARCH</h2>
            <p className="text-[11px] font-bold text-gray-400 mb-8 uppercase tracking-[0.1em]">Find your next destination</p>
            <p className="text-[14px] leading-loose text-gray-600 font-medium">
              台北の魅力を最大限に体験するための景點検索。キーワードや言語から、あなたにぴったりの場所を見つけましょう。
            </p>
          </div>
          
          <div className="lg:w-2/3 w-full bg-[#f8fbff] rounded-[3rem] p-10 lg:p-14 custom-shadow relative">
            {/* Decorative SVG Icons like goggles in example */}
            <div className="absolute -top-6 -right-6 w-20 h-20 opacity-20">
              <i className="fas fa-mountain text-6xl text-blue-300"></i>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-[#0071BC] tracking-widest uppercase">Keyword</label>
                <input 
                  type="text" 
                  placeholder="例：大稻埕, 象山..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-full px-6 py-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-[#0071BC] tracking-widest uppercase">Language</label>
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="w-full bg-white border border-gray-100 rounded-full px-6 py-4 text-sm outline-none cursor-pointer"
                >
                  {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleSearchClick}
                className="flex-1 bg-[#0071BC] text-white font-bold py-5 rounded-full text-sm tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg active:scale-95"
              >
                探索を開始する <i className="fas fa-chevron-right ml-2 text-[10px]"></i>
              </button>
              <button 
                onClick={handleTaipeiAreaClick}
                className="px-10 bg-white text-gray-600 font-bold border border-gray-100 rounded-full text-sm hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                全部見る
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM Section Style - Results Grid */}
      <section className="py-24 bg-white wave-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#0071BC] mb-2 tracking-[0.3em] uppercase">Program</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">台北の観光プログラム</p>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-20 text-red-400">連線失敗，請稍後再試。</div>
          ) : filteredAttractions.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">No results found</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {filteredAttractions.map((item) => (
                  <AttractionCard key={item.id} attraction={item} />
                ))}
              </div>

              {/* Pagination mimicking the simple style */}
              <div className="mt-24 flex justify-center items-center space-x-12">
                <button 
                  disabled={page === 1}
                  onClick={() => {
                    setPage(p => p - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex items-center text-[11px] font-bold text-gray-400 hover:text-[#0071BC] transition-all disabled:opacity-20"
                >
                  <i className="fas fa-chevron-left mr-4 transition-transform group-hover:-translate-x-1"></i> PREV
                </button>
                <div className="text-[13px] font-black text-[#0071BC]">
                  {page}
                </div>
                <button 
                  onClick={() => {
                    setPage(p => p + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex items-center text-[11px] font-bold text-gray-400 hover:text-[#0071BC] transition-all"
                >
                  NEXT <i className="fas fa-chevron-right ml-4 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* NEWS Section Style Footer */}
      <footer className="bg-[#f0f9ff] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-[#0071BC] mb-2 tracking-[0.3em] uppercase">News</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">最新のお知らせ</p>
          </div>

          <div className="bg-white rounded-sm overflow-hidden border border-blue-50">
            {[
              { date: '2024.11.20', type: 'INFO', title: '年末年始の台北観光ガイドを公開しました。' },
              { date: '2024.11.15', type: 'EVENT', title: '大稻埕冬祭りが開催されます！' },
              { date: '2024.11.10', type: 'UPDATE', title: '新しい景點データが追加されました。' }
            ].map((news, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center p-6 border-b border-gray-50 last:border-0 hover:bg-blue-50/50 transition-colors cursor-pointer">
                <span className="text-[12px] font-bold text-gray-500 min-w-[100px] mb-2 sm:mb-0">{news.date}</span>
                <span className="bg-[#0071BC] text-white text-[9px] font-bold px-3 py-1 rounded-full mb-3 sm:mb-0 sm:mr-8">{news.type}</span>
                <span className="text-[14px] text-gray-700 font-medium flex-grow">{news.title}</span>
                <i className="fas fa-chevron-right text-[10px] text-gray-300 ml-4 hidden sm:block"></i>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center text-[#0071BC] hover:bg-[#0071BC] hover:text-white transition-all">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center text-[#0071BC] hover:bg-[#0071BC] hover:text-white transition-all">
                <i className="fab fa-facebook-f text-sm"></i>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              &copy; Taipei Attraction Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
