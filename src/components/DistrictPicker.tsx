import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Check, ChevronDown, Truck, X } from 'lucide-react';
import { BANGLADESH_DISTRICTS, DistrictInfo } from '../data/bangladeshDistricts';

interface DistrictPickerProps {
  value: string;
  onChange: (districtName: string) => void;
  subtotal?: number;
}

export const DistrictPicker: React.FC<DistrictPickerProps> = ({
  value,
  onChange,
  subtotal = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected district object
  const currentDistrict =
    BANGLADESH_DISTRICTS.find(
      (d) => d.name.toLowerCase() === value.toLowerCase()
    ) || BANGLADESH_DISTRICTS[0];

  // List of all unique divisions in Bangladesh
  const divisions = [
    'All',
    'Dhaka',
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh',
  ];

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Filter districts based on query and division
  const filteredDistricts = BANGLADESH_DISTRICTS.filter((d) => {
    const matchesDivision =
      selectedDivision === 'All' || d.division === selectedDivision;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.division.toLowerCase().includes(query);
    return matchesDivision && matchesSearch;
  });

  const handleSelectDistrict = (district: DistrictInfo) => {
    onChange(district.name);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getFeeDisplay = (fee: number) => {
    if (subtotal >= 5000) {
      return 'Free Delivery';
    }
    return `৳${fee}`;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Interactive Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left px-4 py-3 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 ${
          isOpen
            ? 'border-blue-600 ring-2 ring-blue-500/20 bg-white dark:bg-slate-800 shadow-md'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {currentDistrict.name}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300">
                {currentDistrict.division}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span>{currentDistrict.deliveryDays}</span>
              <span>•</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Delivery: {getFeeDisplay(currentDistrict.deliveryFee)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-bold text-slate-400">Change</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-blue-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header & Search Bar */}
          <div className="p-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-750 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Select Your Zilla / District (64 Districts)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Zilla (e.g. Sylhet, Bogura, Cumilla, Chattogram)..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Division Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {divisions.map((div) => (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(div)}
                  className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                    selectedDivision === div
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          {/* District Options List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-1.5 bg-white dark:bg-slate-900">
            {filteredDistricts.length === 0 ? (
              <div className="py-8 text-center space-y-1">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  No district found matching "{searchQuery}"
                </p>
                <p className="text-[11px] text-slate-400">
                  Try checking the spelling or switch to "All" divisions.
                </p>
              </div>
            ) : (
              filteredDistricts.map((d) => {
                const isSelected =
                  d.name.toLowerCase() === value.toLowerCase();

                return (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => handleSelectDistrict(d)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            {d.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                            {d.division} Division
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Est. Delivery: {d.deliveryDays}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                          d.name === 'Dhaka'
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {getFeeDisplay(d.deliveryFee)}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Showing {filteredDistricts.length} of 64 Zillas</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Orders over ৳5,000 get Free Delivery!
            </span>
          </div>

        </div>
      )}
    </div>
  );
};
