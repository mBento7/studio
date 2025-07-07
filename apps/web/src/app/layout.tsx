import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth';
import { MessageRealtimeToastListener } from '@/components/chat/MessageRealtimeToastListener';
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicFooter } from '@/features/landing/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WhosDo.com - Sua Identidade Digital',
  description: 'Crie e compartilhe sua identidade digital profissional com o WhosDo.com.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <div className="flex-1 flex flex-col">
          <TooltipProvider>
            <AuthProvider>
              {children}
              <MessageRealtimeToastListener />
            </AuthProvider>
          </TooltipProvider>
        </div>
        <PublicFooter />
        <Toaster />
      </body>
    </html>
  );
}
