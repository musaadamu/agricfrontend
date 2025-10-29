import React from 'react';
import { FaFilter, FaCalendarAlt } from 'react-icons/fa';

const VolumeSelector = ({ selectedQuarter, onQuarterChange, currentYear }) => {
    const quarters = [
        { value: 'all', label: 'All Quarters', description: 'Show all' },
        { value: '1', label: 'Q1', description: 'Jan-Mar' },
        { value: '2', label: 'Q2', description: 'Apr-Jun' },
        { value: '3', label: 'Q3', description: 'Jul-Sep' },
        { value: '4', label: 'Q4', description: 'Oct-Dec' }
    ];

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-red-700 font-semibold">
                <FaFilter className="text-sm" />
                <span className="text-sm">Filter:</span>
            </div>

            <div className="flex gap-2 flex-wrap">
                {quarters.map((quarter) => (
                    <button
                        key={quarter.value}
                        onClick={() => onQuarterChange(quarter.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                            selectedQuarter === quarter.value
                                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg border border-red-700'
                                : 'bg-white text-red-600 border-2 border-red-200 hover:bg-red-50'
                        }`}
                        title={quarter.description}
                    >
                        {quarter.label}
                    </button>
                ))}
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-sm ml-2">
                <FaCalendarAlt className="text-xs" />
                <span>{currentYear}</span>
            </div>
        </div>
    );
};

export default VolumeSelector;
