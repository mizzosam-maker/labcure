"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  existingImages?: string[];
  onImagesUploaded: (urls: string[]) => void;
  onImageRemove?: (index: number) => void;
  multiple?: boolean;
}

export default function ImageUpload({
  existingImages = [],
  onImagesUploaded,
  onImageRemove,
  multiple = true,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file`);
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} exceeds 5MB limit`);
        return false;
      }

      return true;
    });

    if (!validFiles.length) return;

    setUploading(true);

    const formData = new FormData();
    validFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      const urls = data.images.map((img: any) => img.url);

      onImagesUploaded(urls);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* IMAGE GRID */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="relative group">

              <div className="aspect-square rounded-lg overflow-hidden border border-gray-light bg-background flex items-center justify-center">

                <img
                  src={image || "/images/placeholder.png"}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/placeholder.png";
                  }}
                />
              </div>

              {/* REMOVE BUTTON */}
              {onImageRemove && (
                <button
                  type="button"
                  onClick={() => onImageRemove(index)}
                  className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-primary-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD BUTTON */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />

        <label
          htmlFor="image-upload"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer
            bg-primary text-white hover:bg-primary-dark
            ${uploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Images
            </>
          )}
        </label>

        <p className="text-sm text-gray-dark mt-2">
          Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
        </p>
      </div>
    </div>
  );
}