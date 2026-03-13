import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Redirect Railway internal domain to canonical domain
  if (host === "landing-page-production-b240.up.railway.app") {
    const url = request.nextUrl.clone();
    url.host = "www.vertechlab.tech";
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|images|fonts|favicon.ico).*)"],
};
