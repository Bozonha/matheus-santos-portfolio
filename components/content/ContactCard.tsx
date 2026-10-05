import type { Dictionary } from "@/content/dictionaries";
import { Button } from "@/components/ui/Button";
import { getWhatsappLink, whatsappEnabled } from "@/lib/whatsapp";
import styles from "./content.module.css";

export function ContactCard({ contato }: { contato: Dictionary["contato"] }) {
  const mailHref = `mailto:pjmatheussantos@gmail.com?subject=${encodeURIComponent(contato.emailSubject)}`;
  const whatsappHref = whatsappEnabled
    ? getWhatsappLink(contato.emailSubject)
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.contactCard}>
        <p className={styles.contactNote}>{contato.responseNote}</p>
        <Button href={mailHref} variant="primary">
          {contato.emailCta}
        </Button>
        {whatsappHref ? (
          <Button href={whatsappHref} variant="secondary">
            {contato.whatsappCta}
          </Button>
        ) : (
          <p className={styles.contactNote}>{contato.whatsappNote}</p>
        )}
      </div>
    </div>
  );
}
