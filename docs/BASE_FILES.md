# Arquivos-base — Capital do Engano / Desejo que Pensa

Atualizado em 16/08/2026.

Use esta lista para iniciar sessões de Codex ou fazer handoff técnico.

## Código canônico

| Arquivo | Função | Observação |
|---|---|---|
| `index.html` | Home completa + seção Turmas + fluxo inscrição → resumo → pagamento | Source of truth do frontend atual |
| `inscricao.html` | Retorno/estados de checkout e página auxiliar | Não deve virar funil concorrente da home |
| `api/create-preference.js` | Cria preferência Mercado Pago Checkout Pro | Valor R$ 60 fixado no backend |
| `api/payment-status.js` | Consulta pagamento pelo ID | Fonte para validar status retornado |
| `api/webhook.js` | Recebe notificação e registra `approved` na base | Precisa evoluir com assinatura/idempotência |
| `.env.example` | Contrato das variáveis de ambiente | Nunca substituir placeholders por segredo real no GitHub |
| `vercel.json` | Configuração das funções serverless | Backend Vercel |
| `v1.5/assets/` | Imagens e recursos visuais da home | Preservar identidade editorial |

## Documentação canônica

| Arquivo | Função |
|---|---|
| `docs/PROJECT_CONTEXT.md` | Memória operacional do projeto |
| `docs/ROADMAP.md` | Prioridades e fases de evolução |
| `docs/PROMPT_CODEX.md` | Prompt pronto para retomar trabalho com agente técnico |
| `docs/BASE_FILES.md` | Este manifesto |

## Fonte conceitual histórica

`desejo_que_pensa_MEGADOC.docx`

O MEGADOC contém identidade, arquitetura pedagógica, módulos, exercícios, roteiro aberto, estratégia e base bibliográfica. Ele é referência de conteúdo, não source of truth para preço, duração e fluxo técnico atuais.

Conflitos conhecidos:

- MEGADOC: 4 encontros de 2h; operação atual: 4 encontros de 60 min.
- MEGADOC: faixa inicial R$ 97–147; operação atual: R$ 60 total.
- MEGADOC usa títulos históricos em módulos II e IV; o site atual usa “Máquinas de Desejar” e “Escrevivência do Afeto”.
- MEGADOC contém handle antigo; materiais atuais devem usar `@ogustavosouzapauli`.

## URLs operacionais

Frontend GitHub Pages:

`https://capitaldoengano.github.io/desejoquepensa/`

Vercel/backend:

`https://desejoquepensa.vercel.app`

Repositório:

`capitaldoengano/desejoquepensa`

## Regra de handoff

Ao entregar o projeto a outro agente ou desenvolvedor, enviar no mínimo:

1. `docs/PROMPT_CODEX.md`;
2. `docs/PROJECT_CONTEXT.md`;
3. `docs/ROADMAP.md`;
4. acesso ao repositório na branch `main`;
5. nomes das Environment Variables, nunca os valores secretos.

Não é necessário copiar credenciais para o prompt. O agente deve trabalhar com as variáveis já configuradas no ambiente.