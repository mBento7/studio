import React from 'react';
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{article.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          {article.summary}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          {article.author && (
            <span className="mr-2">Por {article.author.name}</span>
          )}
          {article.readTime && <span>{article.readTime} de leitura</span>}
        </div>
        <Link href={`/portal/artigo/${article.slug}`} className="text-blue-600 hover:underline text-sm">
          Leia mais
        </Link>
      </div>
    </div>
  );
} 