import { useLocale } from "next-intl";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";

// Serviços e preços de partida para o público europeu (versões inglesa e francesa).
// Os preços são os mesmos nas duas línguas; muda só o texto.
export const SERVICES = [
 {name:"Artificial Intelligence", price:"€5,000", description:"AI assistants and agents connected to your data and tools, including document search with source references (RAG).", href:"#demo-chat", intent:"assistente-ia"},
 {name:"Website Creation", price:"€1,500", description:"Custom responsive websites, built for performance, clear customer journeys and technical SEO.", href:"#demo-site", intent:"site"},
 {name:"Mobile App", price:"€5,000", description:"Custom iOS and Android apps, with business integrations and support for publishing to the app stores.", href:"#demo-app", intent:"app"},
 {name:"Web Analytics / Big Data", price:"€2,500", description:"Audience analytics, dashboards and data pipelines that help you understand your business and make informed decisions.", href:"#investment", intent:"automacao"}
] as const;

const SERVICES_FR = [
 {name:"Intelligence artificielle", price:"5 000 €", description:"Assistants et agents IA connectés à vos données et à vos outils, avec recherche documentaire et citation des sources (RAG).", href:"#demo-chat", intent:"assistente-ia"},
 {name:"Création de site web", price:"1 500 €", description:"Sites sur mesure et responsives, conçus pour la performance, un parcours client clair et un SEO technique solide.", href:"#demo-site", intent:"site"},
 {name:"Application mobile", price:"5 000 €", description:"Applications iOS et Android sur mesure, avec intégrations métier et accompagnement pour la publication sur les stores.", href:"#demo-app", intent:"app"},
 {name:"Web analytics / Big Data", price:"2 500 €", description:"Analyse d’audience, tableaux de bord et pipelines de données pour mieux comprendre votre activité et décider en connaissance de cause.", href:"#investment", intent:"automacao"}
] as const;

export function getServices(locale: string) {
 return locale === "fr" ? SERVICES_FR : SERVICES;
}

const COPY = {
 en: {eyebrow:"Project investment", title:"Build the tools your business needs.", intro:"Starting prices per project. Your final quote depends on scope and integrations.", from:"From", per:"per project", cta:"Discuss your project"},
 fr: {eyebrow:"Investissement par projet", title:"Créez les outils dont votre entreprise a besoin.", intro:"Prix de départ par projet. Le devis final dépend du périmètre et des intégrations.", from:"À partir de", per:"par projet", cta:"Parler de votre projet"},
} as const;

export function Investment(){
 const locale = useLocale();
 const c = locale === "fr" ? COPY.fr : COPY.en;
 return <Section id="investment" width="wide"><Reveal><Eyebrow>{c.eyebrow}</Eyebrow><h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">{c.title}</h2><p className="mt-5 text-ink-muted">{c.intro}</p></Reveal><div className="mt-10 grid gap-5 sm:grid-cols-2">{getServices(locale).map(s=><Reveal key={s.name}><div className="glass flex h-full flex-col rounded-3xl p-7"><h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3><p className="mt-4 text-2xl font-bold text-cyan">{c.from} {s.price} <span className="text-sm font-normal text-ink-muted">{c.per}</span></p><p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{s.description}</p><div className="mt-6"><WaCta intent={s.intent}>{c.cta}</WaCta></div></div></Reveal>)}</div></Section>}
