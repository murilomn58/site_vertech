import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Vertech Soluções",
  description:
    "Como a Vertech Soluções coleta, usa, compartilha e protege dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).",
};

const ATUALIZADO_EM = "17 de junho de 2026";

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading font-bold text-2xl text-white mb-3">{titulo}</h2>
      <div className="space-y-3 text-off-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Privacidade() {
  return (
    <main className="bg-bg-dark min-h-screen text-off-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-body text-cyan text-sm tracking-widest uppercase mb-3">
          Vertech Soluções
        </p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">
          Política de <span className="text-cyan">Privacidade</span>
        </h1>
        <p className="mt-4 text-off-white/60">Última atualização: {ATUALIZADO_EM}</p>

        <p className="mt-8 text-off-white/70 leading-relaxed">
          Esta Política de Privacidade explica como a Vertech Soluções trata os dados pessoais
          de quem visita nosso site, fala conosco pelos nossos canais ou interage com nossas
          páginas em redes sociais. Levamos a sério a sua privacidade e seguimos a Lei Geral de
          Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018).
        </p>

        <Secao titulo="1. Quem é o controlador dos dados">
          <p>
            O controlador dos dados é a <strong>Vertech Soluções Inova Simples (I.S.)</strong>,
            inscrita no CNPJ sob o nº 65.062.423/0001-81, com sede em Bagé/RS, Brasil.
          </p>
          <p>
            Encarregado pelo Tratamento de Dados (DPO) e canal para exercício de direitos:{" "}
            <a href="mailto:admin@vertechsolucoes.com.br" className="text-cyan hover:underline">
              admin@vertechsolucoes.com.br
            </a>
            .
          </p>
        </Secao>

        <Secao titulo="2. Quais dados coletamos">
          <p>Coletamos apenas os dados necessários para nos relacionar com você:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dados de contato que você nos fornece</strong> em formulários, no nosso
              assistente de agendamento ou por mensagem: nome, e-mail, telefone/WhatsApp, nome
              da empresa e o conteúdo da sua mensagem.
            </li>
            <li>
              <strong>Dados de navegação</strong>: páginas visitadas, tipo de dispositivo e
              navegador, e identificadores de cookies, para entender o uso do site e melhorá-lo.
            </li>
            <li>
              <strong>Dados de comunicação</strong> quando você fala conosco por WhatsApp,
              e-mail ou redes sociais: número/identificador, histórico da conversa e arquivos
              que você compartilhar.
            </li>
            <li>
              <strong>Dados de interação em redes sociais</strong>: quando você curte, comenta
              ou interage com as nossas páginas e publicações (por exemplo, no LinkedIn), nós
              podemos ver e tratar as informações públicas do seu perfil associadas a essa
              interação — como nome, foto e o conteúdo do comentário — fornecidas a nós pela
              própria plataforma por meio das APIs oficiais dela.
            </li>
          </ul>
        </Secao>

        <Secao titulo="3. Para que usamos os seus dados">
          <ul className="list-disc pl-6 space-y-2">
            <li>responder às suas solicitações, dúvidas e pedidos de orçamento;</li>
            <li>prestar e administrar os serviços contratados;</li>
            <li>
              gerenciar nossa presença em redes sociais — publicar conteúdo, moderar e responder
              comentários e medir o engajamento das nossas publicações;
            </li>
            <li>melhorar o site, os nossos produtos e a comunicação;</li>
            <li>cumprir obrigações legais, contratuais e regulatórias.</li>
          </ul>
        </Secao>

        <Secao titulo="4. Base legal (LGPD)">
          <p>
            Tratamos dados pessoais com fundamento no consentimento, na execução de contrato e
            de procedimentos preliminares a seu pedido, no cumprimento de obrigação legal e no
            legítimo interesse — sempre respeitando os seus direitos e liberdades, conforme o
            art. 7º da LGPD.
          </p>
        </Secao>

        <Secao titulo="5. Com quem compartilhamos">
          <p>
            Não vendemos os seus dados. Podemos compartilhá-los com prestadores de serviço que
            atuam em nosso nome e sob nossas instruções — por exemplo, provedores de
            hospedagem, e-mail, agenda, mensageria e plataformas de redes sociais (como Google,
            Railway, Meta/WhatsApp e LinkedIn) — apenas na medida necessária para operar nossos
            serviços, e com autoridades quando exigido por lei.
          </p>
        </Secao>

        <Secao titulo="6. Cookies">
          <p>
            Utilizamos cookies essenciais ao funcionamento do site e, quando aplicável, cookies
            de medição de audiência. Você pode gerenciar ou bloquear cookies nas configurações
            do seu navegador; alguns recursos podem deixar de funcionar corretamente sem eles.
          </p>
        </Secao>

        <Secao titulo="7. Por quanto tempo guardamos">
          <p>
            Mantemos os dados pelo tempo necessário às finalidades acima ou ao cumprimento de
            obrigações legais. Encerrada a finalidade, os dados são eliminados ou anonimizados,
            salvo hipóteses de guarda permitidas pela LGPD.
          </p>
        </Secao>

        <Secao titulo="8. Seus direitos">
          <p>
            Você pode, a qualquer momento, solicitar: confirmação da existência de tratamento;
            acesso aos seus dados; correção de dados incompletos ou desatualizados;
            anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade;
            informação sobre compartilhamentos; e revogação do consentimento. Para exercer esses
            direitos, fale com o nosso encarregado em{" "}
            <a href="mailto:admin@vertechsolucoes.com.br" className="text-cyan hover:underline">
              admin@vertechsolucoes.com.br
            </a>
            .
          </p>
        </Secao>

        <Secao titulo="9. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra
            acesso não autorizado, perda ou alteração. Nenhum sistema é 100% infalível, mas
            trabalhamos continuamente para reduzir riscos.
          </p>
        </Secao>

        <Secao titulo="10. Transferência internacional">
          <p>
            Alguns dos nossos prestadores de serviço podem processar dados em servidores
            localizados fora do Brasil. Nesses casos, adotamos as salvaguardas exigidas pela
            LGPD para garantir a proteção dos seus dados.
          </p>
        </Secao>

        <Secao titulo="11. Alterações desta política">
          <p>
            Podemos atualizar esta Política periodicamente. A versão vigente estará sempre
            disponível nesta página, com a data da última atualização indicada no topo.
          </p>
        </Secao>

        <Secao titulo="12. Contato">
          <p>
            Dúvidas sobre esta Política ou sobre o tratamento dos seus dados? Fale com a Vertech
            Soluções em{" "}
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
