"use client";
import React from "react";
import Image from "next/image";
import { Logo } from "@/components/common/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-poppins bg-[#F5F5F7] dark:bg-gray-900 transition-colors duration-300">
      {/* Coluna da imagem (desktop) */}
      <div className="hidden md:block md:w-[619px] lg:w-[700px] h-screen relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Paisagem natural com rio e montanhas"
          fill
          sizes="(max-width: 768px) 0px, (max-width: 1024px) 619px, 700px"
          className="object-cover scale-105 hover:scale-100 transition-transform duration-500"
          priority
        />
        {/* Gradiente sobre a imagem */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Logo */}
        <div className="absolute top-8 md:top-10 left-8 md:left-14 flex items-center gap-3 z-10">
          <Logo className="h-10 w-auto text-white drop-shadow-lg" />
          <span className="text-white text-lg font-medium drop-shadow-lg">WhosDo</span>
        </div>
        
        {/* Texto sobre a imagem */}
        <div className="absolute left-8 md:left-20 bottom-24 w-[280px] md:w-[320px] bg-black/20 rounded-2xl p-6 backdrop-blur-md text-white shadow-lg">
          <div className="text-xl md:text-2xl font-medium mb-3 leading-tight">
            Best Stock Photos and Videos from across the internet.
          </div>
          <p className="text-sm opacity-90">Create stunning content with premium assets</p>
        </div>
      </div>

      {/* Coluna do formulário */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white dark:bg-gray-800 min-h-screen relative px-4 md:px-8">
        {/* Links de autenticação */}
        <div className="absolute top-6 md:top-10 right-4 md:right-16 flex gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-300 font-light">
            Já tem conta?
          </span>
          <a 
            href="/login" 
            className="text-[#20DC49] dark:text-[#4ADE80] font-medium hover:underline transition-colors"
          >
            Sign in!
          </a>
        </div>

        {/* Formulário central */}
        <div className="w-full max-w-md lg:max-w-lg flex flex-col justify-center items-center py-8 md:py-12">
          {children}
          
          {/* Mensagem de termos */}
          <p className="mt-8 md:mt-10 text-xs text-gray-500 dark:text-gray-400 text-center font-light max-w-md">
            Ao continuar você indica que leu e concorda com os{" "}
            <a 
              href="#" 
              className="underline hover:text-[#20DC49] dark:hover:text-[#4ADE80] transition-colors"
            >
              Termos de Uso
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}