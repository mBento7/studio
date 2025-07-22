import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from './button';
import { Label } from './label';
import { Skeleton } from './skeleton';
import Image from 'next/image';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface ImageUploadFieldProps {
  label: string;
  name: string;
  control?: any;
  setValue: (name: string, value: any, options?: any) => void;
  currentImageUrl?: string;
  uploading?: boolean;
  setUploading?: (v: boolean) => void;
  aiHintName?: string;
  aspectRatio?: '1/1' | '16/9';
  hint?: string;
  buttonText?: string;
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
  buttonText
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
    try {
      // Gera um nome único para o arquivo (ex: profile/{userId}.png)
      // Aqui, para exemplo, usa Date.now, mas ideal é passar o userId como prop
      const filePath = `profile/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      if (!data?.publicUrl) throw new Error('Erro ao obter URL pública da imagem');
      onChange(data.publicUrl);
    } catch (err) {
      console.error('Erro ao fazer upload da imagem:', err);
      onChange('');
    } finally {
      if (setUploading) setUploading(false);
    }
  };

  const handleRemove = (onChange: (v: string) => void) => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Se control não for passado, renderiza um input file simples controlado por setValue
  if (!control) {
    return (
      <div className="space-y-2">
        <Label className="font-medium">{label}</Label>
        <div
          className={
            `relative w-full md:w-auto flex flex-col md:flex-row md:items-center gap-4`}
        >
          <div
            className={`relative overflow-hidden rounded-xl bg-muted flex items-center justify-center shadow-md transition-all group focus-within:ring-2 focus-within:ring-primary hover:scale-105 hover:border-primary/70 ${previewClass}`}
            tabIndex={0}
            aria-label={`Área de upload de ${label}`}
            onClick={() => fileInputRef.current?.click()}
            role="button"
          >
            {uploading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                <Loader2 className="animate-spin w-8 h-8 text-white drop-shadow" />
              </div>
            )}
            {currentImageUrl ? (
              <Image src={currentImageUrl} alt={label} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} className="transition-transform duration-200 group-hover:scale-110" />
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
              onChange={e => handleFileChange(e, v => setValue(name, v))}
              disabled={uploading}
              aria-label={`Selecionar imagem para ${label}`}
            />
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            <Button
              type="button"
              variant="default"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
              aria-label={currentImageUrl ? `Trocar ${label}` : `Enviar ${label}`}
            >
              <Upload className="w-4 h-4 mr-1" />
              {currentImageUrl
                ? (label.toLowerCase().includes('capa') ? 'Trocar Capa' : 'Trocar Foto')
                : (label.toLowerCase().includes('capa') ? 'Enviar Capa' : 'Enviar Foto')}
            </Button>
            {currentImageUrl && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setValue(name, '')}
                disabled={uploading}
                className="w-full"
                aria-label={`Remover ${label}`}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Remover
              </Button>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1 text-center">{hint || defaultHint}</div>
      </div>
    );
  }

  // Caso padrão: react-hook-form
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
              className={`relative overflow-hidden rounded-xl bg-muted flex items-center justify-center shadow-md transition-all group focus-within:ring-2 focus-within:ring-primary hover:scale-105 hover:border-primary/70 ${previewClass}`}
              tabIndex={0}
              aria-label={`Área de upload de ${label}`}
              onClick={() => fileInputRef.current?.click()}
              role="button"
            >
              {uploading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                  <Loader2 className="animate-spin w-8 h-8 text-white drop-shadow" />
                </div>
              )}
              {value ? (
                <Image src={value} alt={label} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} className="transition-transform duration-200 group-hover:scale-110" />
              ) : currentImageUrl ? (
                <Image src={currentImageUrl} alt={label} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} className="transition-transform duration-200 group-hover:scale-110" />
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
            <div className="flex flex-col items-center gap-2 mt-4">
              <Button
                type="button"
                variant="default"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full"
                aria-label={value || currentImageUrl ? `Trocar ${label}` : `Enviar ${label}`}
              >
                <Upload className="w-4 h-4 mr-1" />
                {value || currentImageUrl
                  ? (label.toLowerCase().includes('capa') ? 'Trocar Capa' : 'Trocar Foto')
                  : (label.toLowerCase().includes('capa') ? 'Enviar Capa' : 'Enviar Foto')}
              </Button>
              {(value || currentImageUrl) && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemove(onChange)}
                  disabled={uploading}
                  className="w-full"
                  aria-label={`Remover ${label}`}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remover
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">{hint || defaultHint}</div>
        </div>
      )}
    />
  );
};
