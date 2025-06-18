'use client';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" aria-label="WhosDo Logo">
        <rect x="0" y="0" width="60" height="60" rx="15" fill="#059669"/>
        <circle cx="30" cy="25" r="13" fill="white"/>
        <path d="M12 55c0-10 8-15 18-15s18 5 18 15" fill="white"/>
        <circle cx="50" cy="50" r="13" stroke="white" strokeWidth="5" fill="none"/>
        <rect x="60" y="60" width="7" height="20" rx="3.5" fill="white" transform="rotate(45 60 60)"/>
      </svg>
      <span className="ml-2 font-bold text-green-600 text-xl">
        whosdo
        <span className="text-gray-600 dark:text-gray-300">.com</span>
      </span>
    </span>
  );
}
