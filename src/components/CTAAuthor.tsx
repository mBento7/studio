import React from 'react';
import Link from "next/link";

export default function CTAAuthor({ author }) {
  if (!author) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6 text-center">
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Sobre o Autor</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Conheça mais sobre <span className="font-medium text-blue-600 dark:text-blue-400">{author.name}</span> e explore outros artigos incríveis escritos por ele.
      </p>
      <Link
        href={`/portal/autores/${author.username}`}
        className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
      >
        Ver perfil do autor
      </Link>
    </div>
  );
} 