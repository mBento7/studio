'use client';

import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 50"
      className={`h-10 w-auto ${className}`}
      aria-labelledby="logo-title"
    >
      <title id="logo-title">WhosDo.com</title>

      {/* Ícone refinado */}
      <g transform="translate(0,4)">
        <rect x="0" y="0" width="36" height="36" rx="10" fill="currentColor" />
        <circle cx="18" cy="12" r="6" fill="white" />
        <path d="M9 28q9-10 18 0v4H9z" fill="white" />
        <g transform="translate(20,20)">
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
          <line x1="15" y1="15" x2="22" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* texto */}
      <text x="55" y="30" fontSize="20" fontFamily="Inter, sans-serif" fontWeight="bold" fill="currentColor">
        WhosDo
      </text>
      <text x="140" y="30" fontSize="20" fontFamily="Inter, sans-serif" fontWeight="bold" className="fill-gray-600 dark:fill-gray-300">
        .com
      </text>
    </svg>
  );
}
