
"use client";

import React from 'react';
import Image from 'next/image';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Phone, Mail, Globe, Briefcase } from 'lucide-react';
import { Logo } from '@/components/common/logo';

interface PrintableBusinessCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserProfile;
  qrCodeUrl: string;
  primaryColorHex: string;
}

export const PrintableBusinessCard = React.forwardRef<HTMLDivElement, PrintableBusinessCardProps>(
  ({ user, qrCodeUrl, primaryColorHex, className, id, ...props }, ref) => {
    
    const contactItems = [
      ...(user.phone ? [{ icon: Phone, text: user.phone, href: `tel:${user.phone}` }] : []),
      ...(user.email ? [{ icon: Mail, text: user.email, href: `mailto:${user.email}` }] : []),
      ...(user.socialLinks.find(link => link.platform === 'website')?.url 
        ? [{ icon: Globe, text: user.socialLinks.find(link => link.platform === 'website')?.url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0], href: user.socialLinks.find(link => link.platform === 'website')?.url }]
        : []),
    ];

    // Standard business card dimensions (3.5in x 2in at 96 DPI = 336px x 192px)
    return (
      <div
        id={id}
        ref={ref}
        className={cn(
          "bg-white text-black p-4 flex flex-col justify-between shadow-lg rounded-lg w-[336px] h-[192px] overflow-hidden border border-gray-200",
          className
        )}
        {...props}
      >
        {/* Top section: User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-gray-100 flex-shrink-0">
            <Image
              src={user.profilePictureUrl}
              alt={`Foto de ${user.name}`}
              width={64}
              height={64}
              className="object-cover w-full h-full"
              data-ai-hint={user.profilePictureDataAiHint || "person portrait"}
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-bold leading-tight truncate" style={{ color: `#${primaryColorHex}` }}>{user.name}</h2>
            {user.category && (
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                 <Briefcase className="w-3 h-3"/>
                 <p className="leading-tight truncate">{user.category}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section: Contact Details and QR Code */}
        <div className="flex items-end justify-between">
          {/* Contact Info */}
          <div className="space-y-1 w-2/3">
            {contactItems.slice(0, 3).map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 group"
              >
                <item.icon className="w-3 h-3 text-gray-500 group-hover:text-black transition-colors flex-shrink-0" />
                <span className="text-[10px] text-gray-700 group-hover:text-black transition-colors leading-tight truncate">
                  {item.text}
                </span>
              </a>
            ))}
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center flex-shrink-0">
            {qrCodeUrl && (
              <div className="p-0.5 bg-white rounded-sm shadow-md border border-gray-100">
                <Image
                  src={qrCodeUrl}
                  alt={`QR Code para ${user.name}`}
                  width={60}
                  height={60}
                  className="object-contain"
                  data-ai-hint="qr code profile"
                />
              </div>
            )}
             <div className="mt-1.5 flex items-center justify-center">
               <Logo className="w-12 h-auto" />
             </div>
          </div>
        </div>
      </div>
    );
  }
);

PrintableBusinessCard.displayName = "PrintableBusinessCard";
