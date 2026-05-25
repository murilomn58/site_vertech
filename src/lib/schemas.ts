import { z } from "zod";

export const agendarSchema = z.object({
  interesse: z.enum([
    "atendimento-ia",
    "app-dashboard",
    "site-landing",
    "automacao-rpa",
    "registro-marca",
    "outro",
  ]),
  dor: z.string().nullable().optional(),
  observacaoLivre: z.string().max(300).nullable().optional(),
  porte: z.enum(["pessoa-fisica", "pequena", "media", "grande"]).nullable().optional(),
  urgencia: z
    .enum(["pra-ontem", "este-mes", "tres-meses", "explorando"])
    .nullable()
    .optional(),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data invalida (YYYY-MM-DD)"),
  slot: z.string().regex(/^\d{2}:\d{2}$/, "Slot invalido (HH:MM)"),
  nome: z.string().min(3, "Nome muito curto").max(80),
  telefone: z.string().optional().default(""),
  email: z
    .string()
    .email("Email invalido")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  observacao: z.string().max(300).optional(),
});

export type AgendarBody = z.infer<typeof agendarSchema>;

export const slotsQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data invalida"),
});
