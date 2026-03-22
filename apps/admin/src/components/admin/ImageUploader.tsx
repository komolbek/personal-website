'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageUploaderProps {
  name: string;
  defaultValue?: string;
  multiple?: boolean;
  label?: string;
}

export function ImageUploader({ name, defaultValue = '', multiple = false, label }: ImageUploaderProps) {
  const parseInitial = useCallback(() => {
    if (!defaultValue) return [];
    if (multiple) return defaultValue.split('\n').filter(Boolean);
    return defaultValue ? [defaultValue] : [];
  }, [defaultValue, multiple]);

  const [images, setImages] = useState<string[]>(parseInitial);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImages((prev) => {
          if (multiple) return [...prev, result];
          return [result];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const hiddenValue = multiple ? images.join('\n') : images[0] || '';

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <input type="hidden" name={name} value={hiddenValue} />

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className={`grid gap-3 mb-3 ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-1 max-w-xs'}`}>
          {images.map((src, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {(multiple || images.length === 0) && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragging
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to upload</span>
            {' '}or drag and drop
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
