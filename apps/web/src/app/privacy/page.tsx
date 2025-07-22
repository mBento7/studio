import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Informações que Coletamos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Coletamos informações que você nos fornece diretamente, incluindo:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Dados de cadastro (nome, email, telefone)</li>
                <li>Informações do perfil profissional</li>
                <li>Conteúdo que você publica (portfólio, serviços)</li>
                <li>Dados de comunicação e suporte</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Como Usamos suas Informações</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Facilitar conexões entre profissionais e clientes</li>
                <li>Enviar comunicações importantes sobre a plataforma</li>
                <li>Garantir a segurança e prevenir fraudes</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Compartilhamento de Informações</h2>
              <p className="text-gray-600 leading-relaxed">
                Não vendemos suas informações pessoais. Podemos compartilhar dados apenas quando necessário para:
                operação da plataforma, cumprimento legal, ou com seu consentimento explícito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Segurança dos Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra
                acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Seus Direitos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Você tem direito a:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Acessar e atualizar suas informações</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Retirar consentimentos dados anteriormente</li>
                <li>Portabilidade de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos cookies para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo.
                Você pode gerenciar suas preferências de cookies nas configurações do navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Alterações nesta Política</h2>
              <p className="text-gray-600 leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através
                da plataforma ou por email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Para questões sobre privacidade ou para exercer seus direitos, entre em contato através dos
                canais disponíveis na plataforma.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
