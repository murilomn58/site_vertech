// Sortlist Radar: identifica empresas que visitam o site e mede o engajamento
// (dashboard da Sortlist). Snippet oficial do painel Sortlist > Settings > Tracking snippet.
// profileId com I maiusculo (roBAX-I-skzy8), validado na API da Sortlist.
// Fica no <head> do layout raiz, entao vale pra /pt, /en e /fr.
// Divulgado na politica de privacidade (/privacidade), secao 6.
const RADAR_LOADER = `!function(e){"use strict";var a=e&&e.namespace;if(a&&e.profileId&&e.cdn){var r=window[a];if(r&&Array.isArray(r)||(r=window[a]=[]),!r.initialized&&!r._loaded)if(r._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{r._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware"].forEach((function(e){var i;r[e]=(i=e,function(){var e=window[a];if(e.initialized)return e[i].apply(e,arguments);var r=[].slice.call(arguments);return r.unshift(i),e.push(r),e})})),r.bootstrap=function(){var a=document.createElement("script");a.async=!0,a.type="text/javascript",a.id="__radar__",a.dataset.settings=JSON.stringify(e),a.src="https://"+e.cdn+"/releases/latest/radar.min.js";var r=document.scripts[0];r.parentNode.insertBefore(a,r)},r.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({
  "cdn": "collector.sortlist.com",
  "apiEndpoint": "radar.sortlist.com",
  "profileId": "roBAXIskzy8",
  "namespace": "SortlistRadar",
  features: {
    sessionTracking: true,
    formTracking: true,
    clickTracking: true,
    downloadTracking: true,
  },
});`;

export function SortlistRadar() {
  // Em `npm run dev` nao carrega, pra nao sujar o dashboard com acesso local.
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <script
      id="sortlist-radar"
      dangerouslySetInnerHTML={{ __html: RADAR_LOADER }}
    />
  );
}
