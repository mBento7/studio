import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from './button';
import { Label } from './label';
import { Skeleton } from './skeleton';
import Image from 'next/image';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  name: string;
  control: any;
  setValue: (name: string, value: any, options?: any) => void;
  currentImageUrl?: string;
  uploading?: boolean;
  setUploading?: (v: boolean) => void;
  aiHintName?: string;
  aspectRatio?: '1/1' | '16/9';
  hint?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  name,
  control,
  setValue,
  currentImageUrl,
  uploading = false,
  setUploading,
  aiHintName,
  aspectRatio = '1/1',
  hint,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const previewClass = aspectRatio === '16/9'
    ? 'w-full md:w-[320px] aspect-[16/9] h-auto min-h-[90px] max-h-[180px] border-purple-500'
    : 'w-32 h-32 aspect-square border-blue-500';

  const defaultHint = aspectRatio === '16/9'
    ? 'Recomendado: 16:9, 1200x675px, até 2MB.'
    : 'Recomendado: 1:1, 400x400px, até 2MB.';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, onChange: (v: string) => void) => {
    let file: File | undefined;
    if ('dataTransfer' in e) {
      file = e.dataTransfer.files?.[0];
    } else {
      file = e.target.files?.[0];
    }
    if (!file) return;
    if (setUploading) setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      if (setUploading) setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (onChange: (v: string) => void) => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="space-y-2">
          <Label className="font-medium">{label}</Label>
          <div
            className={
              `relative w-full md:w-auto flex flex-col md:flex-row md:items-center gap-4`}
            >
            <div
              className={`relative overflow-hidden rounded-xl bg-muted flex items-center justify-center shadow-md transition-all group focus-within:ring-2 focus-within:ring-primary hover:scale-105 hover:border-primary/70 ${previewClass} ${isDragActive ? 'border-primary ring-2 ring-primary/40 bg-primary/10' : ''}`}
              tabIndex={0}
              aria-label={`Área de upload de ${label}`}
              onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
              onDragLeave={e => { e.preventDefault(); setIsDragActive(false); }}
              onDrop={e => { e.preventDefault(); setIsDragActive(false); handleFileChange(e, onChange); }}
              onClick={() => fileInputRef.current?.click()}
              role="button"
            >
              {uploading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                  <Loader2 className="animate-spin w-8 h-8 text-white drop-shadow" />
                </div>
              )}
              {value ? (
                <Image src={value} alt={label} fill style={{ objectFit: 'cover' }} className="transition-transform duration-200 group-hover:scale-110" />
              ) : currentImageUrl ? (
                <Image src={currentImageUrl} alt={label} fill style={{ objectFit: 'cover' }} className="transition-transform duration-200 group-hover:scale-110" />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground">
                  <ImageIcon className="w-10 h-10 mb-1 opacity-40" />
                  <span className="text-xs">Arraste ou clique para selecionar</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleFileChange(e, onChange)}
                disabled={uploading}
                aria-label={`Selecionar imagem para ${label}`}
              />
            </div>
            <div className="flex flex-row md:flex-col gap-2 md:items-end w-full md:w-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full md:w-auto"
                aria-label={value || currentImageUrl ? `Trocar imagem de ${label}` : `Selecionar imagem para ${label}`}
              >
                <Upload className="w-4 h-4 mr-1" />{value || currentImageUrl ? 'Trocar Imagem' : 'Selecionar Imagem'}
              </Button>
              {(value || currentImageUrl) && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(onChange)}
                  disabled={uploading}
                  className="text-destructive w-full md:w-auto"
                  aria-label={`Remover imagem de ${label}`}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remover
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{hint || defaultHint}</div>
        </div>
      )}
    />
  );
}; 