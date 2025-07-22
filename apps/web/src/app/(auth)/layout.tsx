import { Logo } from '@/components/common/logo';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo className="w-12 h-12 text-primary" />
      </div>
      {children}
    </div>
  );
}
