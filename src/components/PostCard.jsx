import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const PostCard = ({ title, date, content, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col">
      <div className="h-52 bg-gray-200 relative overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80"}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          alt={title}
        />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
          <Calendar size={14} /> {date}
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-yellow-600 transition">
          {title}
        </h3>
        
        <p className={`text-gray-600 text-sm transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {content}
        </p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm font-bold text-blue-900 uppercase tracking-wider hover:text-yellow-600 transition"
        >
          {isExpanded ? 'Ver menos -' : 'Leia mais +'}
        </button>
      </div>
    </div>
  );
};

export default PostCard;