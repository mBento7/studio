'use client';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="Logo WhosDo"
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto' }}
      aria-label="WhosDo Logo"
    />
  );
}
