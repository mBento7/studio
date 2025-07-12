import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Clock, MessageCircle, Share2, Sparkles, Play, ChevronDown, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { LocationInfo } from "@/components/profile-layouts/LocationInfo";
import { SocialLinks } from "@/components/social/SocialLinks";
import { SkillsList } from "@/components/skills/SkillsList";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface HeroSectionProps {
  user: any;
  isCurrentUserProfile: boolean;
  primaryColorHex?: string;
  onPortfolioItemClick?: (item: any) => void;
  // Outras props conforme necessidade
}

export function HeroSection({ user, isCurrentUserProfile, primaryColorHex, onPortfolioItemClick }: HeroSectionProps) {
  // --- INÍCIO DO JSX FIEL DO BLOCO HERO ORIGINAL ---
  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden pb-16 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Card de perfil */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-start order-1 lg:order-1"
          >
            <Card className="relative bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 p-4 sm:p-6 rounded-2xl shadow-xl max-w-md w-full">
              {isCurrentUserProfile && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 z-20"
                  onClick={() => window.location.href = '/dashboard/profile-edit-v2'}
                  title="Editar Perfil"
                >
                  <Pencil className="w-5 h-5" />
                </Button>
              )}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative mb-6 inline-block"
                >
                  <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-4 border-white/20 shadow-xl mx-auto">
                    <img src={user.profile_picture_url || '/avatar-default.png'} alt={user.name} className="w-full h-full object-cover" />
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </motion.div>

                {/* Nome do usuário dentro do card de perfil */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900 dark:text-white leading-tight">{user.name}</h3>
                <p className="text-blue-700 dark:text-blue-400 font-medium mb-4">{user.category}</p>
                
                {/* Quick Info com espaçamento melhorado */}
                <div className="space-y-3 mb-6">
                  {/* Endereço completo + pino do Google Maps destacado visualmente, sem duplicidade */}
                  <LocationInfo city={user.location?.city} country={user.location?.country} mapsLink={user.maps_link} />
                  <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Available for projects</span>
                  </div>
                </div>

                {/* Social Links com layout responsivo */}
                {Array.isArray(user.sociallinks) && user.sociallinks.length > 0 ? (
                  <SocialLinks
                    links={user.sociallinks}
                    maxToShow={10}
                    highlightWhatsapp={true}
                    variant="premium"
                  />
                ) : (
                  <div className="text-xs text-slate-500 dark:text-slate-500 mb-6 text-center">Nenhum link social cadastrado</div>
                )}

                {/* Skills Preview com chips melhorados */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-base text-blue-900 dark:text-blue-100">Tags</span>
                    {/* Tooltip removido para simplificar */}
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.skills?.slice(0, 4).map((skill: string, index: number) => (
                      <Badge key={skill + '-' + index} className="bg-blue-100 dark:bg-blue-800/70 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-600/30 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills && user.skills.length > 4 && (
                      <Badge className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 border-slate-200 dark:border-slate-600 text-xs">
                        +{user.skills.length - 4} mais
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Botões de contato com hover effects */}
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 text-white hover:from-blue-700 hover:to-blue-500 dark:hover:from-blue-800 dark:hover:to-blue-600 font-semibold rounded-full text-base sm:text-lg py-2.5 sm:py-3 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 hover:shadow-xl"
                  onClick={() => {/* lógica para abrir chat */}}
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Chamar no Chat
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 backdrop-blur-sm font-semibold rounded-full flex items-center justify-center"
                  onClick={() => {/* lógica para compartilhar perfil */}}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar Perfil
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Conteúdo principal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white order-2 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-600/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Professional {user.category}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 mt-2 leading-tight text-slate-900 dark:text-white overflow-visible"
              style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
            >
              {user.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl"
            >
              {user.bio || "Transforme sua visão em realidade com expertise profissional e soluções criativas que geram resultados."}
            </motion.p>

            {/* Disponível para projetos e tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mb-6 flex flex-col items-start gap-2"
            >
              <span className="flex items-center gap-2 text-base text-green-700 dark:text-green-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                Disponível para projetos
              </span>
              {user.skills && user.skills.length > 0 && (
                <SkillsList
                  skills={user.skills}
                  maxToShow={20}
                  variant="premium"
                />
              )}
            </motion.div>

            {/* CTA Buttons com espaçamento melhorado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button 
                size="lg" 
                className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Project
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 backdrop-blur-sm px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => onPortfolioItemClick && onPortfolioItemClick('portfolio')}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Work
              </Button>
            </motion.div>

            {/* Social Proof com layout responsivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            >
              <div className="flex -space-x-2">
                {user.reviews?.slice(0, 3).map((review: any, index: number) => (
                  <Avatar key={review.id || index} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
                    <img src={review.authorAvatarUrl || '/avatar-default.png'} alt={review.authorName || 'Usuário Anônimo'} />
                  </Avatar>
                ))}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span>Trusted by 100+ clients</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator melhorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs sm:text-sm text-slate-300">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
  // --- FIM DO JSX FIEL DO BLOCO HERO ORIGINAL ---
} 