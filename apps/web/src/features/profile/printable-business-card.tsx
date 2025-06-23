"use client";

import React from 'react';
import { Phone, Mail, Globe, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  category?: string;
  profilePictureUrl: string;
  profilePictureDataAiHint?: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

interface PrintableBusinessCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserProfile;
  qrCodeUrl: string;
  primaryColorHex: string;
}

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center", className)}>
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">BC</span>
    </div>
  </div>
);

export const PrintableBusinessCard = React.forwardRef<HTMLDivElement, PrintableBusinessCardProps>(
  ({ user, qrCodeUrl, primaryColorHex, className, id, ...props }, ref) => {
    
    const contactItems = [
      ...(user.phone ? [{ icon: Phone, text: user.phone, href: `tel:${user.phone}` }] : []),
      ...(user.email ? [{ icon: Mail, text: user.email, href: `mailto:${user.email}` }] : []),
      ...(user.socialLinks.find(link => link.platform === 'website')?.url 
        ? [{ icon: Globe, text: user.socialLinks.find(link => link.platform === 'website')?.url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0], href: user.socialLinks.find(link => link.platform === 'website')?.url }]
        : []),
    ];

    return (
      <div
        id={id}
        ref={ref}
        className={cn(
          "bg-background text-foreground p-6 flex flex-col justify-between shadow-2xl rounded-2xl w-[336px] h-[192px] overflow-hidden border border-border relative night-theme:shadow-2xl night-theme:shadow-black/50",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
          "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:pointer-events-none",
          className
        )}
        style={{
          background: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)`
        }}
        {...props}
      >
        {/* Decorative elements */}
        <div 
          className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-8 translate-x-8"
          style={{ backgroundColor: `#${primaryColorHex}` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-5 translate-y-6 -translate-x-6"
          style={{ backgroundColor: `#${primaryColorHex}` }}
        />

        {/* Top section: User Info */}
        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0 shadow-lg">
            <img
              src={user.profilePictureUrl}
              alt={`Foto de ${user.name}`}
              className="object-cover w-full h-full"
              data-ai-hint={user.profilePictureDataAiHint || "person portrait"}
            />
          </div>
          <div className="flex-grow">
            <h2 
              className="text-xl font-bold leading-tight truncate bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, #${primaryColorHex}, #${primaryColorHex}dd)`
              }}
            >
              {user.name}
            </h2>
            {user.category && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1.5">
                 <Briefcase className="w-3.5 h-3.5"/>
                 <p className="leading-tight truncate font-medium">{user.category}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section: Contact Details and QR Code */}
        <div className="flex items-end justify-between relative z-10">
          {/* Contact Info */}
          <div className="space-y-2 w-2/3">
            {contactItems.slice(0, 3).map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group hover:scale-105 transition-all duration-200"
              >
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center group-hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: `#${primaryColorHex}20` }}
                >
                  <item.icon 
                    className="w-3 h-3 transition-colors flex-shrink-0" 
                    style={{ color: `#${primaryColorHex}` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-tight truncate font-medium">
                  {item.text}
                </span>
              </a>
            ))}
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center flex-shrink-0">
            {qrCodeUrl && (
              <div className="p-1 bg-white rounded-xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-200">
                <img
                  src={qrCodeUrl}
                  alt={`QR Code para ${user.name}`}
                  width={56}
                  height={56}
                  className="object-contain rounded-lg"
                  data-ai-hint="qr code profile"
                />
              </div>
            )}
             <div className="mt-2 flex items-center justify-center">
               <Logo className="w-10 h-auto opacity-80" />
             </div>
          </div>
        </div>
      </div>
    );
  }
);

PrintableBusinessCard.displayName = "PrintableBusinessCard";

// Usage example with default props
const BusinessCardExample = () => {
  const defaultUser: UserProfile = {
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "+55 11 99999-9999",
    category: "Desenvolvedor Full Stack",
    profilePictureUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    profilePictureDataAiHint: "professional headshot",
    socialLinks: [
      {
        platform: "website",
        url: "https://joaosilva.dev"
      }
    ]
  };

  return (
    <div className="p-8 bg-muted/30 min-h-screen flex items-center justify-center">
      <PrintableBusinessCard
        user={defaultUser}
        qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://joaosilva.dev"
        primaryColorHex="3b82f6"
      />
    </div>
  );
};

export default BusinessCardExample;
