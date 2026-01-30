'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

interface UploadedImage {
  id: string;
  url: string;
  file?: File;
}

interface ImageUploadProps {
  vendorId: string;
  portfolioId?: string;
  existingImages?: { id: string; image_url: string; caption?: string }[];
  onImagesChange: (images: UploadedImage[]) => void;
}

export function ImageUpload({ vendorId, portfolioId, existingImages = [], onImagesChange }: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>(
    existingImages.map(img => ({ id: img.id, url: img.image_url }))
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const newImages: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${vendorId}/${portfolioId || 'new'}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(data.path);

      newImages.push({
        id: tempId,
        url: publicUrl,
        file,
      });

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
    setUploading(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = async (imageId: string, imageUrl: string) => {
    // If it's a new upload, delete from storage
    if (imageId.startsWith('temp-')) {
      const path = imageUrl.split('/portfolio-images/')[1];
      if (path) {
        await supabase.storage.from('portfolio-images').remove([path]);
      }
    }

    const updatedImages = images.filter(img => img.id !== imageId);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={image.id} className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden group">
            <Image
              src={image.url}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(image.id, image.url)}
              className="absolute top-2 right-2 w-8 h-8 bg-error-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {index === 0 && (
              <span className="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                Cover
              </span>
            )}
          </div>
        ))}

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          ) : (
            <>
              <svg className="w-8 h-8 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm text-neutral-500">Add Photos</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-neutral-500">
        Upload up to 10 photos. First photo will be used as cover image.
      </p>
    </div>
  );
}
