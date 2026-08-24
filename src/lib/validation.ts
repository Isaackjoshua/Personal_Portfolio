import { z } from "zod";

/**
 * Field limits live here so the form UI, the client-side resolver and the API
 * route all read from one source of truth.
 */
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 80;
export const EMAIL_MAX_LENGTH = 160;
export const SUBJECT_MIN_LENGTH = 3;
export const SUBJECT_MAX_LENGTH = 120;
export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 4000;

/**
 * Contact form contract. Values are trimmed before they are measured, so
 * whitespace never passes as content and never trips a length check.
 *
 * `website` is a honeypot: it is rendered off-screen, hidden from assistive
 * technology and never focusable, so a human always submits it empty. Anything
 * in it means a bot filled the form.
 */
export const contactSchema = z.object({
  name: z
    .string({ error: "Tell me your name." })
    .trim()
    .min(NAME_MIN_LENGTH, "Your name needs at least two characters.")
    .max(NAME_MAX_LENGTH, `Keep your name under ${NAME_MAX_LENGTH} characters.`),

  email: z
    .string({ error: "I need an email address to reply to." })
    .trim()
    .max(EMAIL_MAX_LENGTH, "That email address is too long.")
    .pipe(z.email("That email address doesn’t look right.")),

  subject: z
    .string({ error: "Give the message a subject." })
    .trim()
    .min(SUBJECT_MIN_LENGTH, "A subject needs at least three characters.")
    .max(
      SUBJECT_MAX_LENGTH,
      `Keep the subject under ${SUBJECT_MAX_LENGTH} characters.`,
    ),

  message: z
    .string({ error: "Write a message." })
    .trim()
    .min(
      MESSAGE_MIN_LENGTH,
      `A few more words, please — at least ${MESSAGE_MIN_LENGTH} characters.`,
    )
    .max(
      MESSAGE_MAX_LENGTH,
      `Keep the message under ${MESSAGE_MAX_LENGTH} characters.`,
    ),

  website: z.string().max(0, "This field must stay empty.").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
