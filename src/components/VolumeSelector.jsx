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
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
                <FaFilter className="text-sm" />
                <span className="text-sm font-medium">Filter by Quarter:</span>
            </div>
            
            <div className="flex gap-1">
                {quarters.map((quarter) => (
                    <button
                        key={quarter.value}
                        onClick={() => onQuarterChange(quarter.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedQuarter === quarter.value
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
