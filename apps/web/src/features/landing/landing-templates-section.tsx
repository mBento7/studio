
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const templates = [
  {
    name: "Web Comercial",
    image: "https://d33wubrfki0l68.cloudfront.net/654c642d996d3d00085a2665/screenshot_2023-11-09-06-25-02-0000.png",
  },
  {
    name: "Foco em Portfólio",
    image: "https://d33wubrfki0l68.cloudfront.net/654c6403178a460008034d65/screenshot_2023-11-09-06-24-20-0000.png",
  },
  {
    name: "Cartão Minimalista",
    image: "https://d33wubrfki0l68.cloudfront.net/654c63cf996d3d00085a265d/screenshot_2023-11-09-06-23-28-0000.png",
  },
    {
    name: "Padrão",
    image: "https://d33wubrfki0l68.cloudfront.net/654b9582b13783000877a561/screenshot_2023-11-08-12-14-11-0000.png",
  },
];

export function LandingTemplatesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Um Template para Cada Estilo
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Escolha o layout que melhor representa você. De minimalista a comercial, temos o design perfeito para o seu perfil.
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {templates.map((template, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                       <Image
                          src={template.image}
                          alt={`Exemplo do template ${template.name}`}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full"
                        />
                    </CardContent>
                  </Card>
                   <p className="text-center mt-4 font-semibold text-muted-foreground">{template.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
