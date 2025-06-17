import { PublicFooter } from '@/features/landing/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-background">{children}</main>
      <PublicFooter />
    </div>
  );
}
