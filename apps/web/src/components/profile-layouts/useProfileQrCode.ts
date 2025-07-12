import { useState, useEffect } from "react";

/**
 * Hook para gerar e gerenciar a URL do QR Code do perfil.
 * @param profileUrl URL do perfil a ser codificado
 * @returns { qrCodeUrl, isLoading }
 */
export function useProfileQrCode(profileUrl: string) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!profileUrl) return;
    setIsLoading(true);
    // Exemplo usando api.qrserver.com
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
    setQrCodeUrl(url);
    setIsLoading(false);
  }, [profileUrl]);

  return { qrCodeUrl, isLoading };
} 