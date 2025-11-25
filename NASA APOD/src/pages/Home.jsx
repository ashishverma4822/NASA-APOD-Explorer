import { useEffect, useState } from 'react';

import { getApodToday, getLastWeekApod } from '../services/api'; 
import ApodCard from '../components/ApodCard';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoverflowCarousel = ({ items }) => {
  
  const [currentIndex, setCurrentIndex] = useState(Math.floor(items.length / 2));
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getStyle = (index) => {
    if (index === currentIndex) {
      return "scale-100 opacity-100 z-20 border-blue-500 shadow-2xl shadow-blue-500/50"; 
    } else if (index === (currentIndex - 1 + items.length) % items.length) {
      return "scale-75 opacity-60 z-10 -translate-x-1/2 blur-[2px] grayscale"; 
    } else if (index === (currentIndex + 1) % items.length) {
      return "scale-75 opacity-60 z-10 translate-x-1/2 blur-[2px] grayscale"; 
    } else {
      return "hidden"; 
    }
  };

  if (!items.length) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto h-64 md:h-80 flex items-center justify-center mt-8 perspective-1000">
      <button onClick={handlePrev} className="absolute left-0 md:-left-12 z-30 p-2 rounded-full bg-gray-800/50 hover:bg-blue-600 text-white transition-all"><ChevronLeft size={32} /></button>

      <div className="relative w-full h-full flex items-center justify-center">
        {items.map((item, index) => {
          const styleClass = getStyle(index);
          if (styleClass === "hidden") return null;
          return (
            <div
              key={`${item.date}-${index}`}
              onClick={() => { if (index !== currentIndex) setCurrentIndex(index); }}
              className={`absolute transition-all duration-500 ease-in-out cursor-pointer rounded-xl overflow-hidden border-2 border-transparent ${styleClass}`}
              style={{ width: '60%', height: '100%' }}
            >
               {item.media_type === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500"><span className="text-sm">Video Content</span></div>
               ) : (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
               )}
               <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-center">
                 <p className="text-white text-sm font-bold truncate">{item.title}</p>
                 <p className="text-blue-400 text-xs">{item.date}</p>
               </div>
            </div>
          );
        })}
      </div>
      <button onClick={handleNext} className="absolute right-0 md:-right-12 z-30 p-2 rounded-full bg-gray-800/50 hover:bg-blue-600 text-white transition-all"><ChevronRight size={32} /></button>
    </div>
  );
};

const Home = () => {
  const [todayData, setTodayData] = useState(null);
  const [weekData, setWeekData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = await getApodToday();
        setTodayData(today);
        const lastWeek = await getLastWeekApod(); 
        setWeekData(lastWeek);

      } catch (err) {
        console.error(err);
        setError("Could not fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-[80vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-blue-500" /></div>;
  if (error) return <div className="text-center text-red-400 mt-20">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col gap-12">
      <div>
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 mb-2">
            Astronomy Picture of the Day
          </h1>
          <p className="text-gray-400">Discover the cosmos, one day at a time.</p>
        </div>
        <div className="shadow-2xl shadow-blue-900/20 rounded-2xl overflow-hidden">
          <ApodCard data={todayData} expanded={true} />
        </div>
      </div>

      {weekData.length > 0 && (
        <div className="mt-8 border-t border-gray-800 pt-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left pl-4 border-l-4 border-blue-500">
            Last 7 Days
          </h3>
          <CoverflowCarousel items={weekData} />
        </div>
      )}
    </div>
  );
};

export default Home;