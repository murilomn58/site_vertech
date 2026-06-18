import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  // Intercepta paginas de locale, mas NAO arquivos estaticos (qualquer path com
  // ponto: sitemap.xml, robots.txt, favicon.ico, icon.png, /images/*.jpg, etc.)
  // nem /api e /_next.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
