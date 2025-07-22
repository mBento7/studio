import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { siteConfig } from '@/config/site';

const faqs = [
  {
    question: `O que é o ${siteConfig.name}?`,
    answer: `${siteConfig.name} é uma plataforma que permite a profissionais e empresas criar um perfil público único, completo e compartilhável. Foi projetado para consolidar sua presença online, facilitando a exibição de seu trabalho, serviços e informações de contato.`
  },
  {
    question: `Para quem é o ${siteConfig.name}?`,
    answer: `${siteConfig.name} é ideal para freelancers, consultores, artistas, desenvolvedores, proprietários de pequenas empresas e qualquer pessoa que queira criar uma identidade digital profissional. Se você precisa de um lugar central para direcionar as pessoas para saberem sobre você e o que você faz, o ${siteConfig.name} é para você.`
  },
  {
    question: 'Existe um plano gratuito?',
    answer: `Sim, o ${siteConfig.name} oferece um plano gratuito que permite criar um perfil básico com recursos essenciais. Também temos planos pagos com opções de personalização mais avançadas, maior capacidade de portfólio e funcionalidades adicionais.`
  },
  {
    question: 'Como funciona o compartilhamento por QR code?',
    answer: `Todo perfil ${siteConfig.name} vem com um QR code exclusivo. Você pode baixar este QR code e adicioná-lo aos seus cartões de visita, apresentações ou compartilhá-lo digitalmente. Quando escaneado, ele direciona as pessoas diretamente para o seu perfil ${siteConfig.name}.`
  },
  {
    question: 'Posso personalizar a aparência do meu perfil?',
    answer: 'Com certeza! Nossos planos pagos oferecem várias opções de personalização, incluindo cores de tema, ajustes de layout e mais, para garantir que seu perfil esteja alinhado com sua marca pessoal ou empresarial.'
  },
  {
    question: 'Como começo a usar?',
    answer: `Começar é fácil! Basta clicar em qualquer botão 'Comece Agora' ou 'Crie seu ${siteConfig.name}' em nosso site, escolher um plano (você pode começar gratuitamente!) e seguir os passos simples para construir seu perfil.`
  }
];

export function LandingFaqSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Encontre respostas para perguntas comuns sobre o {siteConfig.name}.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
