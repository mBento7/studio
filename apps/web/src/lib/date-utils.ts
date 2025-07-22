/**
 * Formata uma data para exibir quanto tempo se passou (ex: 2h, 3d)
 * @param dateString String de data ISO
 * @returns String formatada com o tempo decorrido
 */
export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

/**
 * Formata um valor monetário
 * @param valor String com o valor a ser formatado
 * @returns String formatada como moeda
 */
export function formatarMoeda(valor: string): string {
  // Remove caracteres não numéricos
  const numerico = valor.replace(/\D/g, '');

  // Converte para número e divide por 100 para obter o valor em reais
  const valorNumerico = parseInt(numerico) / 100;

  // Formata como moeda brasileira
  return valorNumerico.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
