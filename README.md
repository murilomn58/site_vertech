# Vertech Soluções

Site institucional da Vertech, com apresentação de serviços, navegação em mais de um idioma e um fluxo de solicitação de atendimento. O projeto atual usa Next.js; as versões estáticas anteriores permanecem apenas no histórico.

[Abrir o site](https://site-vertech.vercel.app)

## Funcionalidades

- Apresentação dos serviços e das soluções da empresa.
- Interface responsiva com animações e transições.
- Conteúdo localizado por idioma.
- Encaminhamento para atendimento pelo WhatsApp.
- Consulta de horários e agendamento integrados ao Google Calendar.

## Executar localmente

Use uma versão de Node.js compatível com o Next.js de `package.json`.

```bash
npm ci
npm run dev
```

Abra <http://localhost:3000>. Para gerar a versão de produção:

```bash
npm run build
npx next start -p 3000
```

O script `npm start` existente usa a sintaxe de variável de ambiente do shell Unix. O comando acima também pode ser usado no PowerShell.

## Configuração

Copie `.env.example` para `.env.local`. A integração de agenda exige `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` e `GOOGLE_OAUTH_REFRESH_TOKEN`. `GOOGLE_CALENDAR_ID` seleciona a agenda.

`NEXT_PUBLIC_WHATSAPP_NUMBER` define o contato exibido no fluxo de atendimento. Esse valor é público. As credenciais do Google são usadas apenas no servidor e devem permanecer fora do Git.

Sem a configuração do Google, o site pode ser explorado, mas as operações de agenda não ficam disponíveis.

## Organização

- `src/app/`: páginas por idioma e rotas de agendamento.
- `src/components/`: seções e componentes da interface.
- `src/messages/` e `src/i18n/`: conteúdo traduzido e configuração de idiomas.
- `src/lib/`: integração com agenda e construção dos links de atendimento.

## Tecnologias

Next.js, React, TypeScript, Tailwind CSS, next-intl, GSAP e Google Calendar API.
