import type { Locale } from "@/lib/routes";
import type { ScenarioConfig, ServiceOption, SlotOption } from "./types";

/** Escolhe uma entre algumas variantes de frase de forma deterministica (sem Math.random). */
function pick(variants: string[], seed: number): string {
  return variants[((seed % variants.length) + variants.length) % variants.length]!;
}

function priceLine(service: ServiceOption, locale: Locale): string {
  if (service.price) return `${service.label}: ${service.price}`;
  return locale === "pt"
    ? `${service.label}: sob avaliação (sem valor fechado)`
    : `${service.label}: by assessment (no fixed price)`;
}

export function greetingReply(scenario: ScenarioConfig, locale: Locale, seed: number): string {
  const variants =
    locale === "pt"
      ? [
          `Oi! Aqui é o atendimento virtual da ${scenario.businessName}. Posso ajudar com horário, endereço, serviços, preço ou agendamento.`,
          `Olá! Sou o assistente da ${scenario.businessName}. Posso falar sobre horário, serviços, preço ou marcar um horário pra você.`,
        ]
      : [
          `Hi! This is ${scenario.businessName}'s virtual assistant. I can help with hours, address, services, pricing, or booking.`,
          `Hello! I'm the ${scenario.businessName} assistant. I can tell you about hours, services, pricing, or book an appointment.`,
        ];
  return pick(variants, seed);
}

export function hoursReply(
  scenario: ScenarioConfig,
  locale: Locale,
  seed: number,
  isAfterHours: boolean,
): string {
  if (!isAfterHours) {
    const variants =
      locale === "pt"
        ? [
            `Nosso horário: ${scenario.hoursLabel}`,
            `Funcionamos assim: ${scenario.hoursLabel}`,
          ]
        : [`Our hours: ${scenario.hoursLabel}`, `We're open: ${scenario.hoursLabel}`];
    return pick(variants, seed);
  }

  const variants =
    locale === "pt"
      ? [
          `Agora estamos fechados — nosso horário é ${scenario.hoursLabel} — mas já deixo tudo pronto pra você.`,
          `No momento não tem ninguém por aqui (${scenario.hoursLabel} é o nosso horário), só que eu continuo de pé. Posso já adiantar o que você precisa.`,
        ]
      : [
          `We're closed right now — our hours are ${scenario.hoursLabel} — but I can still get this sorted for you.`,
          `Nobody's in the building at the moment (we're open ${scenario.hoursLabel}), but I'm still here. I can get a head start for you.`,
        ];
  return pick(variants, seed);
}

export function addressReply(scenario: ScenarioConfig, locale: Locale, seed: number): string {
  const variants =
    locale === "pt"
      ? [`Ficamos em ${scenario.address}.`, `Nosso endereço é ${scenario.address}.`]
      : [`We're at ${scenario.address}.`, `Our address is ${scenario.address}.`];
  return pick(variants, seed);
}

export function servicesReply(scenario: ScenarioConfig, locale: Locale, seed: number): string {
  const list = scenario.services.map((s) => `• ${priceLine(s, locale)}`).join("\n");
  const intro =
    locale === "pt"
      ? pick(["Aqui está o que fazemos:", "Nossos serviços:"], seed)
      : pick(["Here's what we offer:", "Our services:"], seed);
  return `${intro}\n${list}`;
}

export function priceReply(scenario: ScenarioConfig, locale: Locale, seed: number): string {
  const list = scenario.services.map((s) => `• ${priceLine(s, locale)}`).join("\n");
  const intro =
    locale === "pt" ? "Os valores que eu tenho são estes:" : "Here are the prices I have:";
  const closing =
    locale === "pt"
      ? "Os marcados como 'sob avaliação' dependem do caso — nesses eu não arrisco um número e posso chamar alguém da equipe."
      : "The ones marked 'by assessment' depend on the case — I won't guess a number there, and I can bring in someone from the team.";
  return `${intro}\n${list}\n\n${closing}`;
}

export function unknownReply(locale: Locale, seed: number): string {
  const variants =
    locale === "pt"
      ? [
          "Essa eu não sei responder com certeza — não quero chutar. Quer que eu chame alguém da equipe?",
          "Não tenho essa informação aqui comigo. Posso passar para uma pessoa resolver com você?",
        ]
      : [
          "I'm not sure about that one — I don't want to guess. Want me to bring in someone from the team?",
          "I don't have that information. I can hand this over to a person if you'd like.",
        ];
  return pick(variants, seed);
}

export function handoffAckReply(locale: Locale, seed: number): string {
  const variants =
    locale === "pt"
      ? [
          "Certo, já deixei um resumo pronto pra equipe. Alguém continua a conversa a partir daqui.",
          "Combinado. Passei sua conversa pra um humano, com um resumo do que já foi dito.",
        ]
      : [
          "Got it, I've left a summary ready for the team. Someone will take it from here.",
          "Sure thing. I've handed your conversation to a person, along with a summary.",
        ];
  return pick(variants, seed);
}

export function askServiceReply(scenario: ScenarioConfig, locale: Locale, seed: number): string {
  const list = scenario.services.map((s) => `• ${s.label}`).join("\n");
  const intro =
    locale === "pt" ? "Qual serviço você quer agendar?" : "Which service would you like to book?";
  return `${intro}\n${list}`;
}

export function serviceNotFoundReply(
  scenario: ScenarioConfig,
  locale: Locale,
  seed: number,
): string {
  const list = scenario.services.map((s) => `• ${s.label}`).join("\n");
  const intro =
    locale === "pt"
      ? "Não achei esse serviço na nossa lista. Pode ser um destes?"
      : "I couldn't find that service on our list. Could it be one of these?";
  return `${intro}\n${list}`;
}

export function askSlotReply(scenario: ScenarioConfig, locale: Locale, seed: number): string {
  const list = scenario.availableSlots.map((s) => `• ${s.label}`).join("\n");
  const intro = locale === "pt" ? "Temos esses horários livres:" : "We have these openings:";
  return `${intro}\n${list}`;
}

export function slotNotFoundReply(
  scenario: ScenarioConfig,
  locale: Locale,
  seed: number,
): string {
  const list = scenario.availableSlots.map((s) => `• ${s.label}`).join("\n");
  const intro =
    locale === "pt"
      ? "Não achei esse horário na lista. Algum destes funciona?"
      : "I couldn't find that time on the list. Would one of these work?";
  return `${intro}\n${list}`;
}

export function askNameReply(locale: Locale, seed: number): string {
  const variants =
    locale === "pt"
      ? ["Fechado. Seu nome, por favor?", "Perfeito. Pode me dizer seu nome?"]
      : ["Done. Can I get your name?", "Great. What's your name?"];
  return pick(variants, seed);
}

export function bookingConfirmReply(
  scenario: ScenarioConfig,
  locale: Locale,
  seed: number,
  args: { service: ServiceOption; slot: SlotOption; name: string; isAfterHours: boolean },
): string {
  const { service, slot, name, isAfterHours } = args;
  const base =
    locale === "pt"
      ? `Obrigada, ${name}! Agendado: ${service.label}, ${slot.label}.`
      : `Thanks, ${name}! Booked: ${service.label}, ${slot.label}.`;
  if (!isAfterHours) return base;
  return locale === "pt"
    ? `${base} Como estamos fora do horário, deixo registrado agora e a equipe confirma assim que abrir — mas o seu horário já está garantido.`
    : `${base} Since we're closed right now, I'm logging it immediately and the team confirms first thing when we open — but your slot is already locked in.`;
}

export function cancelConfirmReply(locale: Locale, seed: number): string {
  return locale === "pt"
    ? "Cancelado. Se quiser remarcar depois, é só me chamar."
    : "Cancelled. If you want to rebook later, just let me know.";
}

export function cancelNothingReply(locale: Locale, seed: number): string {
  return locale === "pt"
    ? "Não encontrei nenhum agendamento seu nesta conversa pra cancelar."
    : "I don't see a booking from this conversation to cancel.";
}

export function rescheduleNoBookingReply(locale: Locale, seed: number): string {
  return locale === "pt"
    ? "Ainda não vejo um agendamento seu nesta conversa. Quer que eu já marque um horário?"
    : "I don't see a booking from you yet in this conversation. Want me to book one now?";
}

export function rescheduleAskSlotReply(
  scenario: ScenarioConfig,
  locale: Locale,
  seed: number,
): string {
  const list = scenario.availableSlots.map((s) => `• ${s.label}`).join("\n");
  const intro =
    locale === "pt"
      ? "Sem problema, vamos remarcar. Qual destes horários fica melhor?"
      : "No problem, let's reschedule. Which of these works better?";
  return `${intro}\n${list}`;
}
