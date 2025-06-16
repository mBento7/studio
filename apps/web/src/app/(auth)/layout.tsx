import { Logo } from '@/components/common/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo textSize="text-3xl" iconSize={30} />
      </div>
      {children}
    </div>
  );
}
