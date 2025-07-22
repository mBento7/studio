import { ClassValue } from 'clsx';

/**
 * Valida se uma string é um UUID válido
 * @param uuid String a ser validada
 * @returns true se for um UUID válido, false caso contrário
 */
export function isValidUUID(uuid: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
}

/**
 * Valida se um nome de usuário do Instagram é válido
 * @param username Nome de usuário a ser validado
 * @returns true se for um nome de usuário válido, false caso contrário
 */
export function isValidInstagramUsername(username: string): boolean {
  return /^[a-zA-Z0-9._]{1,30}$/.test(username);
}
