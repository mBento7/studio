import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroEditorialProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkHref: string;
  linkText: string;
}

const HeroEditorial: React.FC<HeroEditorialProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  linkHref,
  linkText,
}) => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg shadow-xl mb-12">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="z-0 filter brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
      <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-12 text-white">
        <h2 className="text-sm md:text-base font-semibold uppercase tracking-wider mb-2 opacity-80">
          {subtitle}
        </h2>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl opacity-90">
          {description}
        </p>
        <Link href={linkHref} className="inline-flex items-center text-lg font-bold text-blue-300 hover:text-blue-200 transition-colors group">
          {linkText}
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default HeroEditorial; 