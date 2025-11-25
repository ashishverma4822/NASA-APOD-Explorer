import { PlayCircle, Maximize2 } from 'lucide-react';

const ApodCard = ({ data, expanded = false }) => {
  if (!data) return null;

  return (
    <div className={`bg-space-blue rounded-xl overflow-hidden shadow-xl border border-gray-800 transition-all duration-300 ${expanded ? '' : 'hover:scale-[1.02] hover:shadow-blue-900/20 group'}`}>
      
      <div className={`${expanded ? 'h-[50vh] min-h-[400px]' : 'h-64'} w-full relative`}>
        {data.media_type === 'video' ? (
          <div className="w-full h-full relative bg-black">
             {expanded ? (
               <iframe 
                 src={data.url} 
                 title={data.title}
                 className="w-full h-full"
                 allowFullScreen
               />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500 flex-col gap-2">
                   <PlayCircle size={48} className="text-blue-500" />
                   <span className="text-sm">Video Content</span>
                </div>
             )}
          </div>
        ) : (
          <img 
            src={data.url} 
            alt={data.title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {data.copyright && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 text-xs rounded text-gray-300 border border-gray-700">
            © {data.copyright}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4 gap-4">
          <h2 className={`font-bold text-white ${expanded ? 'text-3xl' : 'text-xl line-clamp-1 group-hover:text-blue-400 transition-colors'}`}>
            {data.title}
          </h2>
          <span className="shrink-0 text-blue-400 text-sm font-mono border border-blue-400/30 px-2 py-1 rounded bg-blue-400/10">
            {data.date}
          </span>
        </div>

        <p className={`text-gray-300 leading-relaxed ${expanded ? '' : 'line-clamp-3 text-sm'}`}>
          {data.explanation}
        </p>
        
        {!expanded && (
           <div className="mt-4 flex items-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={16} /> View details
           </div>
        )}
      </div>
    </div>
  );
};

export default ApodCard;