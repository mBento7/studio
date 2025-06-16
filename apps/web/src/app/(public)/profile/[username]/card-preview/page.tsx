"use client";

import React, { useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import { getMockUserByUsername } from '@/lib/mock-data';
import type { UserProfile } from '@/lib/types';
import { PrintableBusinessCard } from '@/features/public/printable-business-card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CardPreviewPageProps {
  params: {
    username: string;
  };
}

export default function CardPreviewPage({ params }: CardPreviewPageProps) {
  const { username } = params;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [primaryColorHex, setPrimaryColorHex] = useState('008080'); // Cor padrão
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profileData = getMockUserByUsername(username);
    if (profileData) {
      setUser(profileData);
    } else {
      notFound();
    }
  }, [username]);

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const profileUrl = `${window.location.origin}/profile/${user.username}`;
      
      let colorForQr = '008080';
      try {
        const computedStyle = getComputedStyle(document.documentElement);
        const primaryHsl = computedStyle.getPropertyValue('--primary').trim();
        if (primaryHsl) {
          const match = primaryHsl.match(/(\d+(\.\d+)?)\s*(\d+(\.\d+?)?)%\s*(\d+(\.\d+)?)%/);
          if (match) {
            const h = parseFloat(match[1]);
            const s = parseFloat(match[3]);
            const l = parseFloat(match[5]);

            const sDecimal = s / 100;
            const lDecimal = l / 100;
            const k = (n: number) => (n + h / 30) % 12;
            const a = sDecimal * Math.min(lDecimal, 1 - lDecimal);
            const f = (n: number) =>
              lDecimal - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

            const toHex = (x: number) => {
              const hex = Math.round(x * 255).toString(16);
              return hex.length === 1 ? '0' + hex : hex;
            };
            colorForQr = `${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
          }
        }
      } catch (e) {
        console.error("Falha ao calcular cor primária, usando padrão.", e)
      }

      setPrimaryColorHex(colorForQr);
      
      const generatedQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileUrl)}&color=${colorForQr}&bgcolor=FFFFFF&format=png&qzone=1`;
      setQrCodeUrl(generatedQrUrl);
      setLoading(false);
    }
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-muted">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4">Carregando pré-visualização...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="no-print mb-8 p-4 bg-card rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-center">Pré-visualização do Cartão</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">Este é o seu cartão de visita para impressão.</p>
        </div>

        <div className="printable-area">
          <PrintableBusinessCard 
              id="printable-card"
              ref={cardRef}
              user={user}
              qrCodeUrl={qrCodeUrl}
              primaryColorHex={primaryColorHex}
          />
        </div>

        <div className="no-print mt-8">
          <Button onClick={handlePrint}>
            Imprimir / Salvar como PDF
          </Button>
        </div>

        <p className="no-print text-xs text-muted-foreground mt-4 text-center max-w-md">
          A aparência final pode variar. Use a opção "Salvar como PDF" do seu navegador para criar um arquivo digital.
        </p>
      </div>
    </>
  );
}
