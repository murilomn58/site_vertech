import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
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

  return intlMiddleware(request);
}

export const config = {
  // Intercepta paginas de locale, mas NAO arquivos estaticos (qualquer path com
  // ponto: sitemap.xml, robots.txt, favicon.ico, icon.png, /images/*.jpg, etc.)
  // nem /api e /_next. Usa [.] em vez de \. porque o build no Windows perde a
  // barra invertida e o filtro passa a bloquear todos os caminhos.
  matcher: ["/((?!api|_next|.*[.].*).*)"],
};
