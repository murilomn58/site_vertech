import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Dominio principal. Quem chega pelo www e redirecionado pra ca, mantendo path e query.
const CANONICAL_ORIGIN = "https://vertechsolucoes.com.br";

export default function middleware(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";

  if (host.toLowerCase().startsWith("www.")) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, 308);
  }

  return intlMiddleware(withoutFrench(request));
}

// Navegador em francês que entra pela raiz cai no /en: o público europeu começa
// em inglês. O /fr segue no ar, no seletor de idioma e no cookie NEXT_LOCALE
// (quem escolher FR uma vez volta pro /fr nas próximas visitas).
function withoutFrench(request: NextRequest): NextRequest {
  const accept = request.headers.get("accept-language");
  if (!accept || !/fr/i.test(accept)) return request;
  const filtered = accept
    .split(",")
    .filter((part) => !/^\s*fr(?:[-;]|\s*$)/i.test(part))
    .join(",");
  const headers = new Headers(request.headers);
  if (filtered.trim()) headers.set("accept-language", filtered);
  else headers.delete("accept-language");
  return new NextRequest(request, { headers });
}

export const config = {
  // Intercepta paginas de locale, mas NAO arquivos estaticos (qualquer path com
  // ponto: sitemap.xml, robots.txt, favicon.ico, icon.png, /images/*.jpg, etc.)
  // nem /api e /_next. Usa [.] em vez de \. porque o build no Windows perde a
  // barra invertida e o filtro passa a bloquear todos os caminhos.
  matcher: ["/((?!api|_next|.*[.].*).*)"],
};
