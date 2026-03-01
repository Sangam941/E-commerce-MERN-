import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpDown, Star, TrendingUp, SortAsc, SortDesc } from "lucide-react";

export type SortOption = "featured" | "price-low" | "price-high" | "rating";

interface SortButtonProps {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ currentSort, onSortChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const options: { id: SortOption; label: string; icon: React.ReactNode }[] = [
    { id: "featured", label: "Featured", icon: <TrendingUp size={14} /> },
    { id: "price-low", label: "Price: Low to High", icon: <SortDesc size={14} /> },
    { id: "price-high", label: "Price: High to Low", icon: <SortAsc size={14} /> },
    { id: "rating", label: "Top Rated", icon: <Star size={14} /> },
  ];

  const activeLabel = options.find(o => o.id === currentSort)?.label;

  return (
    <div className="flex flex-col w-full text-slate-200">
      <button 
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <ArrowUpDown className="h-4 sm:h-5 w-4 sm:w-5 text-blue-400" />
          <div className="font-semibold text-sm sm:text-base text-left">
            <span className="block text-[10px] uppercase text-slate-500 font-bold leading-none mb-1">Sort By</span>
            {activeLabel}
          </div>
        </div>
        {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSortChange(option.id);
                setIsExpanded(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                currentSort === option.id 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-white/5 text-slate-400"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortButton;