import React from "react";

export function WhosdoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2"/>
        <circle cx="18" cy="16" r="5" fill="#10B981" fillOpacity="0.7"/>
        <ellipse cx="18" cy="26" rx="8" ry="5" fill="#10B981" fillOpacity="0.4"/>
        <circle cx="34" cy="34" r="7" stroke="#10B981" strokeWidth="2" fill="none"/>
        <line x1="39.2" y1="39.2" x2="45" y2="45" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span style={{ fontWeight: 700, fontSize: 24, color: '#10B981', fontFamily: 'inherit', letterSpacing: 0.5 }}>
        WhosDo.com
      </span>
    </div>
  );
} 