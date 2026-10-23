import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
export const SERVICES = [
 {name:"Artificial Intelligence", price:"€5,000", description:"AI assistants and agents connected to your data and tools, including document search with source references (RAG).", href:"#demo-chat", intent:"assistente-ia"},
 {name:"Website Creation", price:"€1,500", description:"Custom responsive websites, built for performance, clear customer journeys and technical SEO.", href:"#demo-site", intent:"site"},
 {name:"Mobile App", price:"€5,000", description:"Custom iOS and Android apps, with business integrations and support for publishing to the app stores.", href:"#demo-app", intent:"app"},
 {name:"Web Analytics / Big Data", price:"€2,500", description:"Audience analytics, dashboards and data pipelines that help you understand your business and make informed decisions.", href:"#investment", intent:"automacao"}
] as const;
export function Investment(){return <Section id="investment" width="wide"><Reveal><Eyebrow>Project investment</Eyebrow><h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">Build the tools your business needs.</h2><p className="mt-5 text-ink-muted">Starting prices per project. Your final quote depends on scope and integrations.</p></Reveal><div className="mt-10 grid gap-5 sm:grid-cols-2">{SERVICES.map(s=><Reveal key={s.name}><div className="glass flex h-full flex-col rounded-3xl p-7"><h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3><p className="mt-4 text-2xl font-bold text-cyan">From {s.price} <span className="text-sm font-normal text-ink-muted">per project</span></p><p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{s.description}</p><div className="mt-6"><WaCta intent={s.intent}>Discuss your project</WaCta></div></div></Reveal>)}</div></Section>}
