import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

export interface FilterCriteria {
  category?: string;
  maxPrice: number;
  onlySale?: boolean;
  onlyInStock?: boolean;
  minRating: number;
}

interface FilterButtonProps {
  filters: FilterCriteria;
  setFilters: React.Dispatch<React.SetStateAction<FilterCriteria>>;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col w-full text-slate-200">
      {/* Main Row: Category & Toggle */}
      <div className="flex items-center gap-2">
        Advanced Filter
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-white/5 rounded-full transition-colors"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      

      {/* Expandable Section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2">
          
          <div>
            <select
              className="bg-transparent border-none font-semibold text-sm sm:text-base focus:ring-0 outline-none cursor-pointer"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="" className="bg-slate-900">categories</option>
              <option value="electronics" className="bg-slate-900">Electronics</option>
              <option value="fashion" className="bg-slate-900">Fashion</option>
              <option value="sports" className="bg-slate-900">Sports</option>
            </select>
          </div>
          
          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-400">Max Price</span>
              <span className="text-sm font-bold text-blue-400">${filters.maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Ratings */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Minimum Rating</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilters({ ...filters, minRating: num })}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition ${
                    filters.minRating === num 
                      ? "bg-blue-600 text-white" 
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {num} <Star size={12} fill={filters.minRating === num ? "white" : "none"} />
                </button>
              ))}
            </div>
          </div>

          {/* Sale Toggle */}
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-slate-300 group-hover:text-white transition">Show Only Sale Items</span>
            <input
              type="checkbox"
              checked={filters.onlySale}
              onChange={(e) => setFilters({ ...filters, onlySale: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-white/5 accent-blue-600 focus:ring-0"
            />
          </label>

          {/* Reset Button */}
          <button 
            onClick={() => setFilters({ category: '', maxPrice: 1000, onlySale: false, onlyInStock: false, minRating: 0 })}
            className="text-[10px] text-slate-500 hover:text-red-400 uppercase font-bold text-center pt-2"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButton;