export function createSlug(username: string): string {
  return username
    .normalize('NFD') // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas de acentuação
    .replace(/ç/g, 'c') // Substitui ç por c
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífen
    .replace(/-+/g, '-') // Remove múltiplos hífens
    .toLowerCase()
    .trim();
}