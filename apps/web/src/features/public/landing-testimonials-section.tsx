
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Clara S.",
    role: "Fotógrafa Freelancer",
    image: "https://picsum.photos/seed/testimonial1/100/100",
    imageHint: "mulher sorrindo",
    text: "O WhosDo.com revolucionou a forma como apresento meu trabalho. Agora, envio um único link para clientes com meu portfólio, serviços e redes sociais. É profissional, simples e economiza muito tempo!",
    rating: 5,
  },
  {
    name: "Bruno M.",
    role: "Consultor de TI",
    image: "https://picsum.photos/seed/testimonial2/100/100",
    imageHint: "homem profissional",
    text: "Em eventos de networking, simplesmente mostro meu QR code. As pessoas escaneiam e têm acesso a tudo, do meu LinkedIn aos meus projetos. É muito mais eficaz que um cartão de visita tradicional.",
    rating: 5,
  },
  {
    name: "Juliana P.",
    role: "Criadora de Conteúdo",
    image: "https://picsum.photos/seed/testimonial3/100/100",
    imageHint: "pessoa pensando",
    text: "Adoro a variedade de templates. Pude escolher um que se alinha perfeitamente com minha marca pessoal e destacar meus vídeos e parcerias. A plataforma é super intuitiva.",
    rating: 5,
  },
];

export function LandingTestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Amado por Profissionais Como Você
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Veja o que nossos usuários estão dizendo sobre o WhosDo.com e como ele está ajudando-os a ter sucesso.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg bg-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: "cover" }}
                      data-ai-hint={testimonial.imageHint}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                  ))}
                </div>
                <p className="text-foreground/80 italic">&quot;{testimonial.text}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
