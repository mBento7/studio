import { PublicHeader } from '@/features/public/header';
import { PublicFooter } from '@/features/public/footer';
import { LandingHeroSection } from '@/features/public/landing-hero-section';
import { LandingBenefitsSection } from '@/features/public/landing-benefits-section';
import { LandingTestimonialsSection } from '@/features/public/landing-testimonials-section';
import { LandingTemplatesSection } from '@/features/public/landing-templates-section';
import { LandingPricingSection } from '@/features/public/landing-pricing-section';
import { LandingFaqSection } from '@/features/public/landing-faq-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader isTransparent={true} />
      <main className="flex-grow">
        <LandingHeroSection />
        <LandingBenefitsSection />
        <LandingTemplatesSection />
        <LandingTestimonialsSection />
        <LandingPricingSection />
        <LandingFaqSection />
        
        {/* Final CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Pronto para Elevar Sua Presença Digital?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Junte-se ao {siteConfig.name} hoje e crie um perfil profissional que se destaca.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">
                Comece Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
