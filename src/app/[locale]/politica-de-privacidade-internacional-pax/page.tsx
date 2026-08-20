import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade do App Internacional Pax | Vertech Soluções",
  description:
    "Política de Privacidade do aplicativo Internacional Pax, com informações sobre coleta, uso, compartilhamento, retenção e exclusão de dados pessoais.",
  alternates: {
    canonical: "/pt/politica-de-privacidade-internacional-pax",
    languages: {
      "pt-BR": "/pt/politica-de-privacidade-internacional-pax",
      en: "/en/politica-de-privacidade-internacional-pax",
      "fr-FR": "/fr/politica-de-privacidade-internacional-pax",
      "x-default": "/pt/politica-de-privacidade-internacional-pax",
    },
  },
};

const ATUALIZADO_EM = "20 de agosto de 2026";
const EMAIL_PRIVACIDADE = "contato@internacionalpax.com.br";

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-heading text-2xl font-bold text-white">{titulo}</h2>
      <div className="space-y-3 leading-relaxed text-off-white/70">{children}</div>
    </section>
  );
}

export default function PoliticaPrivacidadeInternacionalPax() {
  return (
    <main className="min-h-screen bg-bg-dark text-off-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 font-body text-sm uppercase tracking-widest text-cyan">
          Internacional Pax
        </p>
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
          Política de <span className="text-cyan">Privacidade</span>
        </h1>
        <p className="mt-4 text-off-white/60">Última atualização: {ATUALIZADO_EM}</p>

        <p className="mt-8 leading-relaxed text-off-white/70">
          Esta Política de Privacidade descreve como o aplicativo Internacional Pax
          coleta, usa, armazena, compartilha e protege dados pessoais de associados,
          dependentes e demais usuários da área do associado.
        </p>

        <Secao titulo="1. Quem somos">
          <p>
            O aplicativo Internacional Pax é a área digital do associado para acesso
            à carteirinha, dados cadastrais, dependentes, plano contratado, carnê,
            boletos, comprovantes, lembretes de vencimento e canais de contato com a
            central e o plantão 24h.
          </p>
          <p>
            Em caso de dúvidas, solicitações sobre privacidade, correção ou exclusão
            de dados, entre em contato pelo e-mail{" "}
            <a href={`mailto:${EMAIL_PRIVACIDADE}`} className="text-cyan hover:underline">
              {EMAIL_PRIVACIDADE}
            </a>
            .
          </p>
        </Secao>

        <Secao titulo="2. Dados que coletamos">
          <p>Podemos coletar e tratar as seguintes categorias de dados:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Dados de conta e autenticação:</strong> CPF, senha, token de
              sessão, indicação de troca obrigatória de senha e dados necessários
              para validar o acesso à conta.
            </li>
            <li>
              <strong>Dados cadastrais do associado:</strong> nome, número de
              associado, CPF, data de nascimento, endereço, telefone, e-mail,
              situação cadastral e situação financeira.
            </li>
            <li>
              <strong>Dados do plano e da carteirinha:</strong> nome do plano, grupo,
              consultor, coberturas, data de ativação, carência, validade da
              carteirinha e outras informações necessárias para a prestação do
              serviço contratado.
            </li>
            <li>
              <strong>Dados de dependentes:</strong> nome, parentesco, idade,
              situação cadastral, data de adesão e informações de carência dos
              dependentes vinculados ao titular.
            </li>
            <li>
              <strong>Dados financeiros do carnê:</strong> parcelas, vencimentos,
              valores, status de pagamento, forma de pagamento, data de pagamento,
              linha digitável, código PIX, links de boleto, comprovantes e arquivos
              do carnê.
            </li>
            <li>
              <strong>Dados de suporte e atendimento:</strong> mensagens enviadas
              para a central ou para o plantão quando o usuário inicia contato por
              telefone ou WhatsApp.
            </li>
            <li>
              <strong>Dados técnicos e permissões:</strong> informações necessárias
              para funcionamento do aplicativo, como identificadores de sessão,
              registros técnicos de operação e autorização para notificações locais
              de vencimento, quando concedida pelo usuário.
            </li>
          </ul>
        </Secao>

        <Secao titulo="3. Como usamos os dados">
          <ul className="list-disc space-y-2 pl-6">
            <li>criar, autenticar e manter o acesso à área do associado;</li>
            <li>exibir carteirinha, dados cadastrais, dependentes e informações do plano;</li>
            <li>consultar e disponibilizar carnê, boletos, PIX, comprovantes e documentos relacionados;</li>
            <li>permitir recuperação de acesso e troca de senha quando necessário;</li>
            <li>agendar lembretes de vencimento no aparelho, quando o usuário autoriza notificações;</li>
            <li>prestar atendimento, suporte e intermediar contato com a central e o plantão 24h;</li>
            <li>cumprir obrigações legais, regulatórias, contratuais e exercer direitos em processos administrativos ou judiciais;</li>
            <li>prevenir fraudes, incidentes de segurança e uso indevido da plataforma.</li>
          </ul>
        </Secao>

        <Secao titulo="4. Compartilhamento de dados">
          <p>Seus dados podem ser compartilhados nas seguintes hipóteses:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              com provedores de tecnologia, hospedagem, infraestrutura, suporte e
              manutenção contratados para operação do aplicativo;
            </li>
            <li>
              com parceiros de cobrança e pagamento, como o Asaas, quando necessário
              para emissão e consulta de PIX, boleto, comprovantes e documentos do carnê;
            </li>
            <li>
              com serviços externos acionados pelo próprio usuário, como WhatsApp,
              telefone e páginas seguras de pagamento ou documentos;
            </li>
            <li>
              com autoridades públicas, judiciais ou regulatórias, quando houver
              obrigação legal, requisição válida ou necessidade de defesa de direitos.
            </li>
          </ul>
          <p>Não vendemos dados pessoais a terceiros.</p>
        </Secao>

        <Secao titulo="5. Base legal e consentimento">
          <p>
            Tratamos dados pessoais com fundamento, conforme o caso, na execução do
            contrato e dos serviços solicitados pelo usuário, no cumprimento de
            obrigações legais e regulatórias, no exercício regular de direitos, no
            legítimo interesse e, quando aplicável, no consentimento do usuário.
          </p>
        </Secao>

        <Secao titulo="6. Pagamentos e links externos">
          <p>
            O aplicativo pode redirecionar o usuário para páginas externas de
            pagamento, boleto, comprovante ou documentos protegidos. Esses fluxos
            podem ser operados por parceiros especializados. O aplicativo não se
            destina ao processamento direto de dados completos de cartão de crédito
            dentro da interface atual.
          </p>
        </Secao>

        <Secao titulo="7. Notificações e permissões do dispositivo">
          <p>
            O uso de notificações locais para lembretes de vencimento depende da
            permissão concedida pelo usuário no dispositivo. Essa autorização pode
            ser revogada a qualquer momento nas configurações do aparelho, o que pode
            limitar esse recurso.
          </p>
        </Secao>

        <Secao titulo="8. Armazenamento e retenção">
          <p>
            Os dados são armazenados pelo tempo necessário para prestar os serviços,
            cumprir obrigações legais, prevenir fraudes, resolver disputas e exercer
            direitos. Quando possível e aplicável, dados podem ser excluídos ou
            anonimizados após solicitação do titular, observadas retenções legais e
            operacionais.
          </p>
        </Secao>

        <Secao titulo="9. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger os
            dados pessoais contra acesso não autorizado, perda, alteração, divulgação
            ou destruição indevida. Ainda assim, nenhum sistema é completamente
            infalível, e o usuário também deve proteger suas credenciais de acesso.
          </p>
        </Secao>

        <Secao titulo="10. Direitos do titular e exclusão de dados">
          <p>
            Nos termos da legislação aplicável, o usuário pode solicitar acesso,
            correção, atualização, portabilidade, anonimização, bloqueio, exclusão
            ou revisão de informações pessoais, quando cabível. Solicitações podem
            ser enviadas para{" "}
            <a href={`mailto:${EMAIL_PRIVACIDADE}`} className="text-cyan hover:underline">
              {EMAIL_PRIVACIDADE}
            </a>
            . Poderemos solicitar informações adicionais para confirmar a identidade
            do solicitante antes de processar o pedido.
          </p>
        </Secao>

        <Secao titulo="11. Dependentes e menores de idade">
          <p>
            Dados de dependentes podem ser tratados para viabilizar o plano
            contratado e os serviços associados. O titular da conta é responsável
            por fornecer e manter corretos os dados dos dependentes vinculados. O
            aplicativo não é destinado ao uso autônomo por crianças sem a
            intermediação do responsável legal.
          </p>
        </Secao>

        <Secao titulo="12. Transferência internacional">
          <p>
            Alguns provedores de tecnologia usados na operação do aplicativo podem
            processar ou armazenar dados em infraestrutura localizada fora do
            Brasil. Nessas situações, adotamos medidas compatíveis com a legislação
            aplicável para proteção das informações.
          </p>
        </Secao>

        <Secao titulo="13. Alterações desta política">
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente. A versão
            mais atual estará sempre disponível no endereço público informado pelo
            aplicativo e no Google Play Console.
          </p>
        </Secao>
      </div>
    </main>
  );
}
