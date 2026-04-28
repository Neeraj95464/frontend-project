// components/Select.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const Select = ({ children, onValueChange, value, disabled, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  const findSelectedChild = () => {
    return React.Children.toArray(children).find(
      child => child.props.value === value
    );
  };

  const selectedChild = findSelectedChild();
  const displayValue = selectedChild ? selectedChild.props.children : placeholder || 'Select option';

  return (
    <div className="relative" ref={selectRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between cursor-pointer ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'
        }`}
      >
        <span className={!selectedChild ? 'text-gray-500' : 'text-gray-900'}>
          {displayValue}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              onClick: () => handleSelect(child.props.value),
              isSelected: child.props.value === value
            });
          })}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const SelectValue = ({ placeholder, children }) => {
  return <>{children || placeholder}</>;
};

export const SelectContent = ({ children }) => {
  return <>{children}</>;
};

export const SelectItem = ({ children, value, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
        isSelected ? 'bg-blue-50 text-blue-600' : ''
      }`}
    >
      <span>{children}</span>
      {isSelected && <Check className="w-4 h-4" />}
    </div>
  );
};