
import React from 'react';
import type { UserProfile } from '@/lib/types';

interface BusinessCardSVGProps {
  user: UserProfile;
  qrCodeUrl: string;
  primaryColorHex: string;
  id?: string;
}

export const BusinessCardSVG: React.FC<BusinessCardSVGProps> = ({
  user,
  qrCodeUrl,
  primaryColorHex,
  id
}) => {
  const cardWidth = 320; 
  const cardHeight = 200;
  const borderRadius = 10; 
  const padding = 12;
  const fontFamily = "'Inter', Arial, sans-serif";

  const brandColor = `#${primaryColorHex}`;
  const textColorLight = "#FFFFFF";
  const textColorDark = "#2D3748"; 
  const textColorSubtle = "#4A5568";

  const leftColumnWidth = cardWidth * 0.38;
  const qrCodeSize = leftColumnWidth * 0.6;
  const qrCodeX = (leftColumnWidth - qrCodeSize) / 2;
  const qrCodeY = padding * 2;
  
  const whosDoTextFontSize = 10; // Alterado para whosDo
  const whosDoUsernameFontSize = 8; // Alterado para whosDo
  const whosDoLogoTextY = qrCodeY + qrCodeSize + padding * 1.5;
  const whosDoUsernameY = whosDoLogoTextY + whosDoTextFontSize + 3;
  const whosDoTextX = leftColumnWidth / 2; 

  const rightColumnX = leftColumnWidth;
  const rightColumnWidth = cardWidth - leftColumnWidth;
  const contentStartX = rightColumnX + padding;
  const contentWidth = rightColumnWidth - padding * 1.5; 

  const profileImageSize = 64;
  const profileImageRadius = 8; 
  const profileImageX = contentStartX;
  const profileImageY = padding * 1.5;
  const profileImageClipPathId = `profileRectClip-${id || 'card'}`;

  const nameFontSize = 18;
  const nameY = profileImageY + nameFontSize + 5;
  const categoryFontSize = 10;
  const categoryY = nameY + categoryFontSize + 6;

  let currentInfoY = categoryY + categoryFontSize + padding * 1.5;
  const infoLineHeight = 18;
  const iconSize = 11;
  const iconTextGap = 7;
  const infoTextFontSize = 9.5;

  const WhatsappIcon = () => (
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01l-3-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  );

  const LocationIcon = () => (
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  );

  const renderWrappedText = (
    text: string | undefined,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number,
    fontSize: number,
    fill: string,
    fontWeight: string = "normal"
  ) => {
    if (!text) return null;
    const words = text.split(' ');
    let currentLine = '';
    const lines = [];
    const avgCharWidth = fontSize * 0.55;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      if (testLine.length * avgCharWidth > maxWidth && currentLine) {
        if (lines.length < maxLines - 1) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          lines.push(currentLine.substring(0, Math.floor(maxWidth / avgCharWidth) - 3) + '...');
          currentLine = '';
          break;
        }
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine.substring(0, Math.floor(maxWidth / avgCharWidth)));
    
    return lines.slice(0, maxLines).map((line, index) => (
      <tspan key={index} x={x} dy={index === 0 ? 0 : lineHeight}>{line}</tspan>
    ));
  };
  
  const formatAddress = () => {
    if (!user.location) return '';
    let address = user.location.address || '';
    if (user.location.city) address += (address ? ', ' : '') + user.location.city;
    return address;
  };

  return (
    <svg
      id={id}
      width={cardWidth}
      height={cardHeight}
      viewBox={`0 0 ${cardWidth} ${cardHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fontFamily={fontFamily}
    >
      <style>
        {`
          .font-inter { font-family: 'Inter', Arial, sans-serif; }
          .font-semibold { font-weight: 600; }
          .font-medium { font-weight: 500; }
        `}
      </style>
      <defs>
        <clipPath id={profileImageClipPathId}>
          <rect 
            x={profileImageX} 
            y={profileImageY} 
            width={profileImageSize} 
            height={profileImageSize} 
            rx={profileImageRadius} 
            ry={profileImageRadius} 
          />
        </clipPath>
        <clipPath id={`clipCardArea-${id}`}>
             <rect width={cardWidth} height={cardHeight} rx={borderRadius} ry={borderRadius} />
        </clipPath>
      </defs>

      <g clipPath={`url(#clipCardArea-${id})`}>
        <rect x={leftColumnWidth} y="0" width={rightColumnWidth} height={cardHeight} fill="#FFFFFF" />
        <rect x="0" y="0" width={leftColumnWidth} height={cardHeight} fill={brandColor} />
      </g>
      
      {qrCodeUrl && (
        <image href={qrCodeUrl} x={qrCodeX} y={qrCodeY} width={qrCodeSize} height={qrCodeSize} />
      )}
      <text x={whosDoTextX} y={whosDoLogoTextY} fontSize={whosDoTextFontSize} fill={textColorLight} textAnchor="middle" className="font-inter font-semibold">
        whosdo.com 
      </text>
      <text x={whosDoTextX} y={whosDoUsernameY} fontSize={whosDoUsernameFontSize} fill={textColorLight} textAnchor="middle" opacity="0.85" className="font-inter">
        /{user.username}
      </text>

      {user.profilePictureUrl && (
        <image
          href={user.profilePictureUrl}
          x={profileImageX}
          y={profileImageY}
          width={profileImageSize}
          height={profileImageSize}
          clipPath={`url(#${profileImageClipPathId})`}
          preserveAspectRatio="xMidYMid slice"
        />
      )}

      <text x={profileImageX} y={nameY + profileImageSize - nameFontSize } fontSize={nameFontSize} fill={textColorDark} className="font-inter font-semibold">
        {user.name}
      </text>

      <text x={profileImageX} y={categoryY + profileImageSize - categoryFontSize - nameFontSize +5} fontSize={categoryFontSize} fill={brandColor} className="font-inter font-medium">
        {user.category}
      </text>

      {user.whatsappNumber && (
        <g transform={`translate(${profileImageX}, ${currentInfoY})`}>
          <svg x="0" y="1" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={textColorSubtle}>
            <WhatsappIcon />
          </svg>
          <text x={iconSize + iconTextGap} y={infoTextFontSize + 1} fontSize={infoTextFontSize} fill={textColorSubtle} className="font-inter">
            {user.whatsappNumber}
          </text>
        </g>
      )}
      {(currentInfoY += user.whatsappNumber ? infoLineHeight : 0)}

      {user.location?.city && (
        <g transform={`translate(${profileImageX}, ${currentInfoY})`}>
           <svg x="0" y="1" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={textColorSubtle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <LocationIcon />
          </svg>
          <text fontSize={infoTextFontSize} fill={textColorSubtle} className="font-inter" y={infoTextFontSize +1}>
            {renderWrappedText(
              formatAddress(),
              iconSize + iconTextGap,
              0, 
              contentWidth - (iconSize + iconTextGap), 
              infoTextFontSize * 1.2, 
              1, 
              infoTextFontSize,
              textColorSubtle
            )}
          </text>
        </g>
      )}
    </svg>
  );
};
