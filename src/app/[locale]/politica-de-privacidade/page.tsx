import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade do Odonto Connect | Vertech Soluções",
  description:
    "Política de Privacidade do aplicativo Odonto Connect, com informações sobre coleta, uso, compartilhamento, retenção e exclusão de dados pessoais.",
  alternates: {
    canonical: "/pt/politica-de-privacidade",
    languages: {
      "pt-BR": "/pt/politica-de-privacidade",
      en: "/en/politica-de-privacidade",
      "fr-FR": "/fr/politica-de-privacidade",
      "x-default": "/pt/politica-de-privacidade",
    },
  },
};

const ATUALIZADO_EM = "24 de julho de 2026";

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading font-bold text-2xl text-white mb-3">{titulo}</h2>
      <div className="space-y-3 text-off-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

export default function PoliticaPrivacidadeOdontoConnect() {
  return (
    <main className="bg-bg-dark min-h-screen text-off-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-body text-cyan text-sm tracking-widest uppercase mb-3">
          Odonto Connect
        </p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">
          Política de <span className="text-cyan">Privacidade</span>
        </h1>
        <p className="mt-4 text-off-white/60">Última atualização: {ATUALIZADO_EM}</p>

        <p className="mt-8 text-off-white/70 leading-relaxed">
          Esta Política de Privacidade descreve como o Odonto Connect coleta, usa,
          armazena, compartilha e protege dados pessoais de pacientes, dentistas,
          protéticos e demais usuários do aplicativo.
        </p>

        <Secao titulo="1. Quem somos">
          <p>
            O Odonto Connect é uma plataforma digital voltada à conexão entre
            pacientes, dentistas e protéticos, com recursos de cadastro, login,
            localização de profissionais, contato, mensagens, avaliações,
            agendamentos e publicação de conteúdo.
          </p>
          <p>
            Em caso de dúvidas, solicitações sobre privacidade, correção ou exclusão
            de dados, entre em contato pelo e-mail{" "}
            <a href="mailto:odontoconnect3@gmail.com" className="text-cyan hover:underline">
              odontoconnect3@gmail.com
            </a>
            .
          </p>
        </Secao>

        <Secao titulo="2. Dados que coletamos">
          <p>Podemos coletar e tratar as seguintes categorias de dados:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dados de conta e autenticação:</strong> nome, e-mail, telefone,
              senha, UID da conta, status de verificação de e-mail e dados básicos
              do login com Google.
            </li>
            <li>
              <strong>Dados cadastrais de pacientes:</strong> nome completo, CPF,
              data de nascimento, telefone, e-mail, endereço e informações
              opcionais como plano de saúde.
            </li>
            <li>
              <strong>Dados cadastrais de dentistas e protéticos:</strong> nome
              completo, telefone, e-mail, CRO ou CRO-TPD, endereço, dados da
              clínica ou laboratório, redes profissionais, website, foto de perfil
              e documentos enviados para validação cadastral.
            </li>
            <li>
              <strong>Dados de localização:</strong> localização aproximada ou
              precisa do dispositivo quando o usuário autoriza, para encontrar
              profissionais próximos e auxiliar no preenchimento de endereço.
            </li>
            <li>
              <strong>Dados de uso da plataforma:</strong> mensagens de chat,
              solicitações de agendamento, avaliações, comentários, posts, curtidas,
              salvos, notificações e histórico de interações.
            </li>
            <li>
              <strong>Dados de contato e conversão:</strong> informações necessárias
              para intermediar contato entre paciente e profissional, inclusive
              registros de leads e contatos iniciados via WhatsApp ou pelo fluxo de
              agendamento.
            </li>
            <li>
              <strong>Arquivos e mídia:</strong> imagens de perfil, imagens de posts
              e documentos enviados para validação profissional.
            </li>
          </ul>
        </Secao>

        <Secao titulo="3. Como usamos os dados">
          <ul className="list-disc pl-6 space-y-2">
            <li>criar, autenticar e manter contas de usuários;</li>
            <li>permitir login por e-mail/senha e por Google;</li>
            <li>exibir perfis profissionais e permitir a busca por dentistas ou protéticos;</li>
            <li>viabilizar chat, avaliações, comentários, agendamentos e contato entre usuários;</li>
            <li>validar cadastros profissionais e analisar documentos enviados para aprovação;</li>
            <li>
              exibir dentistas próximos, centralizar o mapa e ajudar no preenchimento
              de endereço quando houver autorização de localização;
            </li>
            <li>
              operar recursos internos de segurança, prevenção a fraude, suporte,
              análise de incidentes e cumprimento de obrigações legais.
            </li>
          </ul>
        </Secao>

        <Secao titulo="4. Compartilhamento de dados">
          <p>Seus dados podem ser compartilhados nas seguintes hipóteses:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              entre usuários da plataforma, quando necessário para o funcionamento
              do serviço. Por exemplo: perfis profissionais podem ser exibidos a
              pacientes; dados de contato relevantes podem ser usados em pedidos de
              agendamento e interações entre paciente e profissional;
            </li>
            <li>
              com provedores de infraestrutura e autenticação, como Google Firebase
              e Google Sign-In, para armazenamento, autenticação, banco de dados e
              hospedagem de arquivos;
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
            Tratamos dados pessoais com fundamento, conforme o caso, na execução dos
            serviços solicitados pelo usuário, no cumprimento de obrigações legais e
            regulatórias, no exercício regular de direitos, no legítimo interesse e,
            quando aplicável, no consentimento do usuário.
          </p>
        </Secao>

        <Secao titulo="6. Localização e permissões do dispositivo">
          <p>
            O uso de localização depende da permissão concedida pelo usuário no
            dispositivo. A permissão pode ser revogada a qualquer momento nas
            configurações do aparelho. Alguns recursos, como busca de profissionais
            próximos e preenchimento automático de endereço, podem ficar limitados
            sem essa autorização.
          </p>
        </Secao>

        <Secao titulo="7. Armazenamento e retenção">
          <p>
            Os dados são armazenados pelo tempo necessário para prestar os serviços,
            cumprir obrigações legais, prevenir fraudes, resolver disputas e exercer
            direitos. Quando possível e aplicável, dados podem ser excluídos ou
            anonimizados após solicitação do titular, observadas retenções legais e
            operacionais.
          </p>
        </Secao>

        <Secao titulo="8. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger os
            dados pessoais contra acesso não autorizado, perda, alteração, divulgação
            ou destruição indevida. Ainda assim, nenhum sistema é completamente
            infalível, e o usuário também deve proteger suas credenciais de acesso.
          </p>
        </Secao>

        <Secao titulo="9. Direitos do titular">
          <p>
            Nos termos da legislação aplicável, o usuário pode solicitar acesso,
            correção, atualização, portabilidade, anonimização, exclusão ou revisão
            de informações pessoais, quando cabível. Solicitações podem ser enviadas
            para{" "}
            <a href="mailto:odontoconnect3@gmail.com" className="text-cyan hover:underline">
              odontoconnect3@gmail.com
            </a>
            .
          </p>
        </Secao>

        <Secao titulo="10. Exclusão de conta e dados">
          <p>
            Usuários que desejarem excluir a conta e solicitar a remoção de dados
            pessoais podem entrar em contato pelo e-mail{" "}
            <a href="mailto:odontoconnect3@gmail.com" className="text-cyan hover:underline">
              odontoconnect3@gmail.com
            </a>
            . Poderemos solicitar informações adicionais para confirmar a identidade
            do solicitante antes de processar o pedido.
          </p>
        </Secao>

        <Secao titulo="11. Menores de idade">
          <p>
            O aplicativo não é destinado ao cadastro autônomo de menores de 18 anos.
            Caso identifiquemos cadastro indevido em desacordo com esta regra,
            poderemos restringir ou remover a conta, conforme aplicável.
          </p>
        </Secao>

        <Secao titulo="12. Transferência internacional">
          <p>
            Alguns provedores de tecnologia usados pela plataforma podem processar ou
            armazenar dados em infraestrutura localizada fora do Brasil. Nessas
            situações, adotamos medidas compatíveis com a legislação aplicável para
            proteção das informações.
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
