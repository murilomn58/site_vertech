import "server-only";

import { google, type calendar_v3 } from "googleapis";

// Usa o OAuth2 da PROPRIA copia de google-auth-library que o googleapis carrega,
// evitando o conflito de "duas copias de google-auth-library" no type-check.
type OAuth2 = InstanceType<typeof google.auth.OAuth2>;

let cachedClient: OAuth2 | null = null;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing env var ${name}. Defina em .env.local ou Railway vars.`);
  }
  return v;
}

export function getOAuthClient(): OAuth2 {
  if (cachedClient) return cachedClient;
  const oauth2 = new google.auth.OAuth2(
    requireEnv("GOOGLE_OAUTH_CLIENT_ID"),
    requireEnv("GOOGLE_OAUTH_CLIENT_SECRET"),
  );
  oauth2.setCredentials({
    refresh_token: requireEnv("GOOGLE_OAUTH_REFRESH_TOKEN"),
  });
  cachedClient = oauth2;
  return cachedClient;
}

export function getCalendar(): calendar_v3.Calendar {
  return google.calendar({ version: "v3", auth: getOAuthClient() });
}

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
export const TZ = "America/Sao_Paulo";
