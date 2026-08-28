import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.MAIL_FROM || "O'Crystal <no-reply@ocrystal.sn>";
const INBOX = process.env.CONTACT_INBOX || "contact@ocrystal.sn";

type SendArgs = {
  to?: string | string[];
  subject: string;
  react?: React.ReactNode;
  text?: string;
  replyTo?: string;
};

/**
 * Envoi transactionnel via Resend. Sans clé (dev) : journalise et réussit —
 * les flux (formulaires, double opt-in) restent testables de bout en bout.
 */
export async function sendMail({ to, subject, react, text, replyTo }: SendArgs) {
  const recipients = to ?? INBOX;
  if (!resend) {
    console.info(`[mail:dev] → ${recipients} · ${subject}`);
    return { id: "dev", delivered: false };
  }
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: recipients,
    subject,
    react: react as never,
    text: text ?? " ",
    replyTo,
  });
  if (error) throw new Error(error.message);
  return { id: data?.id ?? "", delivered: true };
}

export const MAIL_INBOX = INBOX;
