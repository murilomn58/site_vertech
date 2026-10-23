"use client";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
export function LanguageSwitcher() {
 const locale=useLocale(); const pathname=usePathname();
 return <nav aria-label={locale === "en" ? "Language" : "Idioma"} className="flex gap-1 text-xs font-semibold">{["pt","en"].map(l=><a key={l} href={pathname.replace(/^\/(pt|en|fr)(?=\/|$)/, "/"+l)} hrefLang={l} aria-current={locale===l ? "true" : undefined} onClick={e=>{if(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; e.preventDefault(); window.location.assign(pathname.replace(/^\/(pt|en|fr)(?=\/|$)/,"/"+l)+window.location.search+window.location.hash);}} className={"rounded-full px-2 py-2 "+(locale===l?"bg-cyan/15 text-cyan":"text-ink-muted hover:text-ink")}>{l.toUpperCase()}</a>)}</nav>;
}
