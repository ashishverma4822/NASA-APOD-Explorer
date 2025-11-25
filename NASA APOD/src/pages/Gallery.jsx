import { useEffect, useState } from 'react';
import { getRecentApod } from '../services/api'; 
import { Loader2, X, ChevronLeft, ChevronRight, PlayCircle, Maximize2, Calendar } from 'lucide-react';

const ImageModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
      >
        <X size={32} />
      </button>

      <div className="bg-[#1c1e2e] w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-800">
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative h-[40vh] md:h-auto">
          {item.media_type === 'video' ? (
            <iframe
              src={item.url}
              title={item.title}
              className="w-full h-full min-h-[300px]"
              allowFullScreen
              allow="autoplay"
            />
          ) : (
            <img 
              src={item.hdurl || item.url} 
              alt={item.title} 
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="w-full md:w-1/3 p-8 overflow-y-auto bg-space-blue">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-blue-400 text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full mb-3 border border-blue-500/20">
              <Calendar size={14} /> {item.date}
            </span>
            <h2 className="text-3xl font-bold text-white leading-tight">{item.title}</h2>
            {item.copyright && (
              <p className="text-gray-500 text-sm mt-2">© {item.copyright}</p>
            )}
          </div>
          
          <div className="prose prose-invert">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {item.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSlider = ({ items, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12 group shadow-2xl border border-gray-800">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform scale-105"
        style={{ 
          backgroundImage: `url(${currentItem.media_type === 'video' ? 'https://apod.nasa.gov/apod/image/2110/LucyLaunch_Ula_3234.jpg' : currentItem.url})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0d17] via-[#0b0d17]/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
        <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-2 block">Featured Cosmic Event</span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl drop-shadow-lg">
          {currentItem.title}
        </h1>
        <p className="text-gray-300 line-clamp-2 max-w-2xl mb-6 text-sm md:text-base drop-shadow-md">
          {currentItem.explanation}
        </p>
        <button 
          onClick={() => onSelect(currentItem)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          {currentItem.media_type === 'video' ? <PlayCircle size={20} /> : <Maximize2 size={20} />}
          {currentItem.media_type === 'video' ? 'Watch Video' : 'View Full Image'}
        </button>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button onClick={prevSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors border border-white/10">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors border border-white/10">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute top-6 right-6 flex gap-1.5">
        {items.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const result = await getRecentApod(); 
      if (Array.isArray(result)) {
        setGalleryData(result);
      } else {
        setGalleryData([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const sliderItems = galleryData.slice(0, 5);
  const gridItems = galleryData;

  return (
    <div className="min-h-screen bg-[#0b0d17]">
      {selectedItem && (
        <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      <div className="max-w-7xl mx-auto py-8 px-4">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Cosmic Gallery</h2>
            <p className="text-gray-400">Explore the universe through the lens of NASA.</p>
          </div>
        </div>

        {loading ? (
           <div className="h-[60vh] flex items-center justify-center">
             <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
           </div>
        ) : (
          <>
            <HeroSlider items={sliderItems} onSelect={setSelectedItem} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
              {gridItems.map((item, index) => (
                <div 
                  key={`${item.date}-${index}`}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-[#1c1e2e] rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-64 overflow-hidden relative">
                    {item.media_type === 'video' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 group-hover:bg-gray-800 transition-colors">
                        <PlayCircle size={48} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Video Content</span>
                      </div>
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white border border-white/30 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm">View Details</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-white font-bold truncate mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-xs mb-3">{item.date}</p>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;