import React from "react";
import { Box, ConciergeBell, ShoppingCart, Siren } from "lucide-react";

export const tipoConfig = {
  oferta_servico: {
    bg: "bg-blue-50 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    shadow: "shadow-blue-500/20",
    badge: "Oferta de Serviço",
    icon: <ConciergeBell className="w-4 h-4" />,
  },
  oferta_produto: {
    bg: "bg-green-50 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    shadow: "shadow-green-500/20",
    badge: "Oferta de Produto",
    icon: <Box className="w-4 h-4" />,
  },
  solicitacao_servico: {
    bg: "bg-orange-50 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
    shadow: "shadow-orange-500/20",
    badge: "Solicitação de Serviço",
    icon: <Siren className="w-4 h-4" />,
  },
  solicitacao_produto: {
    bg: "bg-amber-50 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    shadow: "shadow-amber-500/20",
    badge: "Solicitação de Produto",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  patrocinado: {
    bg: "bg-yellow-50 dark:bg-yellow-900/30",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-800",
    shadow: "shadow-yellow-500/20",
    badge: "Patrocinado",
    icon: <Box className="w-4 h-4" />,
  },
}; 