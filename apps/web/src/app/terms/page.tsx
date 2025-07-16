import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao acessar e usar esta plataforma, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso da Plataforma</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Esta plataforma destina-se a conectar profissionais e clientes para prestação de serviços. Você concorda em:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Usar a plataforma apenas para fins legítimos</li>
                <li>Não violar direitos de propriedade intelectual</li>
                <li>Não publicar conteúdo ofensivo ou inadequado</li>
                <li>Manter a veracidade das informações fornecidas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Responsabilidades</h2>
              <p className="text-gray-600 leading-relaxed">
                Os usuários são responsáveis por suas próprias ações e pelo conteúdo que publicam. A plataforma não se responsabiliza por transações entre usuários.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Privacidade</h2>
              <p className="text-gray-600 leading-relaxed">
                Respeitamos sua privacidade e protegemos seus dados pessoais conforme nossa Política de Privacidade.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Modificações</h2>
              <p className="text-gray-600 leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Para dúvidas sobre estes termos, entre em contato conosco através dos canais disponíveis na plataforma.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}