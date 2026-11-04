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

// Bruno Zanella, representante comercial na França: atende o visitante do /fr.
export const BRUNO_WHATSAPP = "33656680164";
export const BRUNO_PHONE = "+33 6 56 68 01 64";

export const LINKEDIN = {
  murilo: "https://www.linkedin.com/in/murilonarciso/",
  jean: "https://www.linkedin.com/in/jean-kairo-crispim-a11312284/",
} as const;

export const NAV_SECTIONS = ["services", "portfolio", "team", "faq"] as const;
