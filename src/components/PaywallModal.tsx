import React from 'react';

export default function PaywallModal({ onPay }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conteúdo Premium</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Faça o pagamento para acessar este artigo exclusivo e desbloquear todo o conteúdo premium do portal.
        </p>
        <button
          onClick={onPay}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Pagar e acessar
        </button>
      </div>
    </div>
  );
} 