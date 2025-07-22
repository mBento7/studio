import { useState, useEffect } from 'react';

export function useProfileQrCode(profileUrl: string) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!profileUrl) {
      setIsLoading(false);
      return;
    }

    // Gerar URL apenas se for diferente da atual
    const newUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
    if (newUrl !== qrCodeUrl) {
      setQrCodeUrl(newUrl);
    }

    // Atualizar isLoading apenas se estiver true
    if (isLoading) {
      setIsLoading(false);
    }
  }, [profileUrl, qrCodeUrl, isLoading]);

  return { qrCodeUrl, isLoading };
}
