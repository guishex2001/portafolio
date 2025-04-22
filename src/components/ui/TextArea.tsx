import React from 'react';

interface TextAreaProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  rows = 4,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-200 mb-1"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
        }`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;