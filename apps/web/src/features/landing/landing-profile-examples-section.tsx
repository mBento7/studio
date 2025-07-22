import { PublicProfileCard } from '@/features/public/public-profile-card';
import { mockUserProfiles } from '@/lib/mock-data';

export function LandingProfileExamplesSection() {

  const exampleUsernames = ['defaultprofile', 'commercialweb', 'minimalistcard'];
  const exampleProfiles = mockUserProfiles.filter(p => exampleUsernames.includes(p.username));

  return (
    <section id="examples" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Veja o WhosDo.com em Ação
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Explore como profissionais de diversas áreas estão usando a plataforma para criar perfis públicos impressionantes.
          </p>
        </div>
        {exampleProfiles.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {exampleProfiles.map(profile => (
              <PublicProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Exemplos de perfis em breve!</p>
        )}
      </div>
    </section>
  );
}
