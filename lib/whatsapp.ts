/**
 * Centraliza o toggle do botão de WhatsApp. Matheus ainda não tem um número
 * de negócio ativo — enquanto NEXT_PUBLIC_WHATSAPP estiver vazia, nenhum
 * componente deve renderizar o botão, em nenhum lugar do site.
 */
const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP?.trim();

export const whatsappEnabled = Boolean(rawNumber);

export function getWhatsappLink(message: string): string | null {
  if (!rawNumber) return null;
  const digitsOnly = rawNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
