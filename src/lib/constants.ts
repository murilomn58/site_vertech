export const WHATSAPP_NUMBER = "5549999551051";
export const getWhatsAppUrl = (message?: string) => {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return message
    ? `${baseUrl}?text=${encodeURIComponent(message)}`
    : baseUrl;
};

export const WHATSAPP_URL = getWhatsAppUrl();
export const EMAIL = "admin@vertechsolucoes.com.br";
export const PHONE = "+55 (49) 99955-1051";

export const LINKEDIN = {
  murilo: "https://www.linkedin.com/in/murilonarciso/",
  jean: "https://www.linkedin.com/in/jean-kairo-crispim-a11312284/",
} as const;

export const NAV_SECTIONS = ["services", "portfolio", "team", "faq"] as const;
