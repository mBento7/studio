import PublicHeader from '@/features/landing/header';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <main className="flex-grow bg-background pt-16">{children}</main>
    </div>
  );
}
