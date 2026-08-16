# Prompt de contexto — Codex / agente de desenvolvimento

Use este prompt ao iniciar uma nova sessão de Codex, ChatGPT ou outro agente técnico no repositório `capitaldoengano/desejoquepensa`.

---

Você está trabalhando no projeto **Capital do Engano / Desejo que Pensa**.

Antes de alterar qualquer arquivo, leia nesta ordem:

1. `docs/PROJECT_CONTEXT.md`
2. `docs/ROADMAP.md`
3. `index.html`
4. `inscricao.html`
5. `api/create-preference.js`
6. `api/payment-status.js`
7. `api/webhook.js`
8. `.env.example`
9. `vercel.json`

Considere `docs/PROJECT_CONTEXT.md` a memória operacional do projeto e `docs/ROADMAP.md` a fila de prioridades. Quando houver conflito com documentos antigos, preserve as decisões operacionais mais recentes.

## Contexto do produto

**Capital do Engano** é a casa editorial: arquivo queer independente sobre desejo, afeto, cultura, tecnologia, corpo, norma, mercado e cotidiano.

**Desejo que Pensa** é a rota/laboratório ao vivo dentro desse universo. Não é terapia, coach, autoajuda ou masterclass. É um espaço de elaboração coletiva com psicologia, psicanálise, filosofia e cultura gay.

Formato operacional atual do Lab:

- 4 encontros;
- 60 minutos cada;
- online e ao vivo;
- opções terça e quinta;
- próxima turma e reprise;
- valor total atual: **R$ 60**.

Handle público correto: `@ogustavosouzapauli`.

## Contexto visual

Preserve a estética já existente:

- zine queer editorial;
- revista independente;
- arquivo clandestino/dossiê;
- fundo preto texturizado;
- papel sujo/off-white;
- magenta elétrico, verde ácido, azul intenso e vermelho pontual;
- xerox, ruído, recortes, fita e imperfeição intencional;
- Archivo Black + Instrument Serif + IBM Plex Mono/Sans;
- sombras duras e composição editorial.

Não transformar o site em SaaS, landing page genérica, Canva limpo ou checkout corporativo.

## Arquitetura técnica atual

Frontend:

- HTML/CSS/JS estático;
- GitHub Pages como URL pública histórica;
- Vercel conectada ao repositório para backend e deploy técnico.

Backend serverless:

- `api/create-preference.js`
- `api/payment-status.js`
- `api/webhook.js`

Pagamento:

- Mercado Pago Checkout Pro;
- valor fixado no backend em R$ 60;
- confirmação somente por status real `approved`;
- dados de cartão nunca passam pelo site.

Base operacional:

- Google Apps Script via `REGISTRATION_WEBHOOK_URL`.

Variáveis esperadas:

- `MERCADO_PAGO_ACCESS_TOKEN`
- `SITE_URL`
- `PUBLIC_API_URL`
- `ALLOWED_ORIGINS`
- `REGISTRATION_WEBHOOK_URL`

Nunca escreva segredo real em arquivo versionado.

## Fluxo que deve ser preservado

Na seção Turmas da home:

### Etapa 1

O participante informa:

- nome;
- e-mail;
- WhatsApp;
- terça ou quinta;
- próxima turma ou reprise;
- consentimento.

### Etapa 2

O mesmo card mostra:

- resumo da inscrição;
- R$ 60;
- botão Mercado Pago;
- opção de corrigir dados.

A pessoa não deve pular diretamente para pagamento sem preencher a inscrição.

Preencher dados não confirma a vaga. Somente `approved` confirma.

## Prioridades técnicas atuais

Trabalhe primeiro nos itens P0 do `ROADMAP.md`:

1. persistir pré-inscrição com `payment_pending` antes do checkout;
2. idempotência por `payment_id`/`registration_id`;
3. validação de assinatura do webhook;
4. retorno pós-pagamento unificado;
5. estados completos de pagamento;
6. teste end-to-end.

Não priorize redesign cosmético antes desses pontos.

## Regras de alteração

- Não reescreva o site inteiro sem necessidade.
- Faça mudanças pequenas e rastreáveis.
- Preserve conteúdo e identidade visual que já funcionam.
- Evite duplicar funis ou formulários com a mesma função.
- Não exponha token, chave privada, senha ou dado bancário.
- Valide mobile.
- Trate erros de rede e estados pendentes.
- Nunca confie em query string ou retorno do navegador para confirmar pagamento; consulte o backend/Mercado Pago.
- Prefira branch + PR para mudanças de risco.
- Antes de merge, revise diff e confirme que o fluxo atual não quebrou.
- Após merge, valide deployment Vercel e endpoints.

## Critério de conclusão

Uma tarefa de pagamento/inscrição só está concluída quando:

1. frontend funciona;
2. backend valida entradas;
3. segredo permanece fora do cliente;
4. Mercado Pago responde corretamente;
5. status é verificado no servidor;
6. base recebe o estado correto;
7. chamadas repetidas não duplicam registros;
8. mobile continua utilizável;
9. build/deploy está saudável.

Ao iniciar uma tarefa, primeiro informe brevemente:

- o que entendeu;
- quais arquivos serão afetados;
- qual risco existe;
- como pretende validar.

Depois execute. Não peça confirmação para alterações reversíveis e claramente solicitadas; peça confirmação apenas quando houver decisão de produto realmente ambígua ou ação destrutiva.

---

## Prompt curto para retomada

> Leia `docs/PROJECT_CONTEXT.md` e `docs/ROADMAP.md` como source of truth. Trabalhe no repositório `capitaldoengano/desejoquepensa`. Preserve a identidade zine queer editorial e o fluxo inscrição → resumo → Mercado Pago → confirmação por `approved`. Não exponha segredos, não crie funil paralelo e priorize os itens P0 do roadmap antes de mudanças cosméticas.