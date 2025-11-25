import { useState } from 'react';
import { getApodByDate } from '../services/api';
import ApodCard from '../components/ApodCard';
import { Search as SearchIcon, Loader2, Calendar as CalendarIcon } from 'lucide-react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDateForAPI = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!startDate) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    const formattedDate = formatDateForAPI(startDate);

    try {
      const result = await getApodByDate(formattedDate);
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Image not available for this date (or API error).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col items-center min-h-[80vh]">
      <div className="text-center mb-8">
        <CalendarIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Time Travel</h2>
        <p className="text-gray-400">Type a date (YYYY-MM-DD) or use the calendar to jump years.</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-12 relative z-10">
        
        <div className="flex-1">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd" 
            maxDate={new Date()}   
            placeholderText="YYYY-MM-DD"
            
            showMonthDropdown       
            showYearDropdown        
            dropdownMode="select"   
            isClearable             
            strictParsing           

            className="w-full bg-space-blue border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 placeholder-gray-500"
            wrapperClassName="w-full"
          />
        </div>

        <button 
          type="submit"
          disabled={loading || !startDate}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : <SearchIcon size={20} />}
          Search
        </button>
      </form>

      {error && <div className="text-red-400 bg-red-900/20 px-6 py-4 rounded-lg border border-red-900/50">{error}</div>}
      
      {data && (
        <div className="w-full animate-fade-in-up">
           <ApodCard data={data} expanded={true} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;