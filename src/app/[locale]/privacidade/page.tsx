
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";





export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
 const {locale}=await params;const t=await getTranslations({locale,namespace:"website.privacy"});
 return {title:t("metaTitle"),description:t("metaDescription"),alternates:{canonical:"/"+locale+"/privacidade",languages:{"pt-BR":"/pt/privacidade",en:"/en/privacidade","fr-FR":"/fr/privacidade","x-default":"/pt/privacidade"}},openGraph:{url:"https://vertechsolucoes.com.br/"+locale+"/privacidade",title:t("metaTitle"),description:t("metaDescription")}};
}
function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading font-bold text-2xl text-white mb-3">{titulo}</h2>
      <div className="space-y-3 text-off-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Privacidade() {
  const t = useTranslations("website");
  return (
    <main className="bg-bg-dark min-h-screen text-off-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-body text-cyan text-sm tracking-widest uppercase mb-3">
          Vertech Soluções
        </p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">{t("privacy.privacy")}<span className="text-cyan">{t("privacy.policy")}</span>
        </h1>
        <p className="mt-4 text-off-white/60">{t("privacy.lastUpdated")}{t("privacy.updatedDate")}</p>

        <p className="mt-8 text-off-white/70 leading-relaxed">{t("privacy.thisPrivacyPolicyExplainsHowVertech")}</p>

        <Secao titulo={t("privacy.1WhoControlsYourData")}>
          <p>{t("privacy.theDataControllerIs")}<strong>Vertech Soluções Inova Simples (I.S.)</strong>{t("privacy.RegisteredUnderCnpjNo65062423000181")}</p>
          <p>{t("privacy.dataProtectionOfficerDpoAndContact")}{" "}
            <a href="mailto:admin@vertechsolucoes.com.br" className="text-cyan hover:underline">
              admin@vertechsolucoes.com.br
            </a>
            .
          </p>
        </Secao>

        <Secao titulo={t("privacy.2WhatDataWeCollect")}>
          <p>{t("privacy.weCollectOnlyTheDataNeeded")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{t("privacy.contactDetailsYouProvide")}</strong>{t("privacy.inFormsThroughOurSchedulingAssistant")}</li>
            <li>
              <strong>{t("privacy.browsingData")}</strong>{t("privacy.PagesVisitedDeviceAndBrowser")}</li>
            <li>
              <strong>{t("privacy.communicationData")}</strong>{t("privacy.whenYouContactUsOnWhatsapp")}</li>
            <li>
              <strong>{t("privacy.socialMediaInteractionData")}</strong>{t("privacy.WhenYouLikeCommentOn")}</li>
          </ul>
        </Secao>

        <Secao titulo={t("privacy.3HowWeUseYourData")}>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("privacy.toRespondToYourRequestsQuestions")}</li>
            <li>{t("privacy.toProvideAndAdministerTheServices")}</li>
            <li>{t("privacy.toManageOurSocialMediaPresence")}</li>
            <li>{t("privacy.toImproveOurWebsiteProductsAnd")}</li>
            <li>{t("privacy.toFulfilLegalContractualAndRegulatory")}</li>
          </ul>
        </Secao>

        <Secao titulo={t("privacy.4LegalBasisLgpd")}>
          <p>{t("privacy.weProcessPersonalDataOnThe")}</p>
        </Secao>

        <Secao titulo={t("privacy.5WhoWeShareDataWith")}>
          <p>{t("privacy.weDoNotSellYourData")}</p>
        </Secao>

        <Secao titulo={t("privacy.6Cookies")}>
          <p>{t("privacy.weUseCookiesEssentialToThe")}</p>
        </Secao>

        <Secao titulo={t("privacy.7HowLongWeKeepData")}>
          <p>{t("privacy.weKeepDataForAsLong")}</p>
        </Secao>

        <Secao titulo={t("privacy.8YourRights")}>
          <p>{t("privacy.youMayRequestAtAnyTime")}{" "}
            <a href="mailto:admin@vertechsolucoes.com.br" className="text-cyan hover:underline">
              admin@vertechsolucoes.com.br
            </a>
            .
          </p>
        </Secao>

        <Secao titulo={t("privacy.9Security")}>
          <p>{t("privacy.weTakeReasonableTechnicalAndOrganisational")}</p>
        </Secao>

        <Secao titulo={t("privacy.10InternationalTransfers")}>
          <p>{t("privacy.someOfOurServiceProvidersMay")}</p>
        </Secao>

        <Secao titulo={t("privacy.11ChangesToThisPolicy")}>
          <p>{t("privacy.weMayUpdateThisPolicyPeriodically")}</p>
        </Secao>

        <Secao titulo={t("privacy.12Contact")}>
          <p>{t("privacy.questionsAboutThisPolicyOrHow")}{" "}
            <a href="mailto:admin@vertechsolucoes.com.br" className="text-cyan hover:underline">
              admin@vertechsolucoes.com.br
            </a>
            .
          </p>
        </Secao>
      </div>
    </main>
  );
}
