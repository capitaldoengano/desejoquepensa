# Capital do Engano / Desejo que Pensa — contexto mestre

Última atualização operacional: 16/08/2026

Este arquivo é a memória operacional versionada do projeto. Antes de alterar estrutura, copy, fluxo de inscrição, pagamento ou arquitetura técnica, leia este documento e `docs/ROADMAP.md`.

## 1. Hierarquia de verdade

Quando houver conflito entre documentos antigos e o site atual, usar esta ordem:

1. código atual da branch `main`;
2. este `PROJECT_CONTEXT.md`;
3. `docs/ROADMAP.md`;
4. decisões mais recentes registradas em conversa/projeto;
5. documentos históricos, incluindo `desejo_que_pensa_MEGADOC.docx`.

O MEGADOC continua sendo referência conceitual e pedagógica importante, mas algumas definições operacionais mudaram. Exemplos: o documento histórico previa encontros de 2h e faixa de R$ 97–147; a versão operacional atual trabalha com 4 encontros de 60 minutos e inscrição total de R$ 60.

## 2. Arquitetura de marca

### Capital do Engano

É a casa editorial e a infraestrutura pública do projeto. Funciona como arquivo queer independente sobre desejo, afeto, cultura, tecnologia, corpo, norma, mercado e as ficções que organizam o cotidiano.

Não deve parecer um site institucional genérico nem uma landing page de infoproduto. A experiência é editorial, zine, arquivo vivo, dossiê afetivo e colagem crítica.

### Desejo que Pensa

É uma rota interna do Capital do Engano e o produto/laboratório ao vivo.

Posicionamento central:

- não é terapia;
- não é coach;
- não é autoajuda;
- não é masterclass de relacionamentos;
- é laboratório de subjetividade, desejo, vínculo e cultura gay;
- oferece linguagem e espaço de elaboração, não promessa de cura nem resposta pronta.

Frase estrutural do projeto: os posts funcionam como espelho; o Lab começa onde a rolagem termina.

## 3. Autoria e identidade pública

Responsável público principal: Gustavo Souza Pauli.

Handle atual e obrigatório em materiais públicos: `@ogustavosouzapauli`.

Não reintroduzir handles antigos como `@gustavosouzapauli`, `@chillhealer_` ou variantes.

Desejo que Pensa foi desenvolvido dentro do universo Capital do Engano, articulando psicologia, psicanálise, filosofia, cultura gay e experiência vivida.

## 4. Público e proposta

Público principal atual: homens gays/adultos LGBTQIA+ interessados em desejo, vínculo, masculinidades, apps, comparação, solidão, autoestima, sexo, autonomia e cultura gay, com abertura para elaboração crítica.

A comunicação deve evitar moralismo, diagnóstico fácil e linguagem de promessa. O projeto deve desorganizar certezas e produzir perguntas melhores.

Tom:

- humano;
- direto;
- ensaístico;
- crítico sem pose universitária;
- irônico quando couber;
- denso sem ficar hermético;
- nunca marketeiro ou motivacional.

## 5. Percurso pedagógico atual

Formato operacional atual:

- 4 encontros;
- 60 minutos por encontro;
- online e ao vivo;
- opções de turma em terça e quinta;
- possibilidade de próxima turma e reprise;
- investimento total atual: R$ 60.

Mapa atual exibido no site:

1. **Cartografia da Couraça** — defesa, corpo, apego, sofrimento minoritário.
2. **Máquinas de Desejar** — desejo, norma, cultura, algoritmo, prestígio.
3. **Narciso em Campo de Batalha** — comparação, inveja, rivalidade, espelhamento.
4. **Escrevivência do Afeto** — autoria, simbolização, produção de forma e saída da repetição.

O MEGADOC histórico usa alguns títulos diferentes, como “Gramáticas do Desejo” e “Fazer Forma do que Doeu”. Manter o conteúdo conceitual como referência, mas não substituir automaticamente os títulos atuais do site sem decisão explícita.

## 6. Identidade visual

Direção: zine queer editorial + revista independente + arquivo clandestino + dossiê investigativo + colagem afetiva.

Características:

- fundo preto texturizado;
- papéis sujos/off-white;
- magenta elétrico;
- verde ácido;
- azul intenso;
- vermelho pontual;
- xerox, fita, recortes, ruído, documentos, prints, tickets e marcas de uso;
- tipografia editorial pesada combinada a serifada expressiva e mono;
- sombras duras;
- sensação manual, imperfeita e intencional.

Evitar:

- Canva limpo;
- estética SaaS;
- gradiente corporativo;
- excesso de cards arredondados;
- IA plástica;
- repetição de poses/imagens;
- linguagem visual domesticada.

Fontes atuais do site: Archivo Black, IBM Plex Mono, IBM Plex Sans e Instrument Serif.

## 7. Site — estado atual

Repositório: `capitaldoengano/desejoquepensa`

Branch de produção: `main`.

Frontend público histórico/principal: GitHub Pages.

URL pública do GitHub Pages: `https://capitaldoengano.github.io/desejoquepensa/`

Projeto serverless/preview/produção técnica: Vercel.

URL Vercel: `https://desejoquepensa.vercel.app`

Arquivos centrais:

- `index.html` — home completa do Capital do Engano e fluxo de inscrição atual;
- `inscricao.html` — página de retorno/checkout legado e estados de pagamento;
- `api/create-preference.js` — cria preferência do Mercado Pago;
- `api/payment-status.js` — consulta status real do pagamento;
- `api/webhook.js` — recebe evento e registra pagamento aprovado;
- `.env.example` — nomes das variáveis, sem segredos;
- `vercel.json` — configuração das funções;
- `v1.5/assets/` — ativos visuais usados na home.

## 8. Fluxo de inscrição e pagamento atual

A seção antiga “mailing / turmas” foi transformada em fluxo de inscrição real.

### Etapa 1 — inscrição

Coleta:

- nome;
- e-mail;
- WhatsApp;
- terça ou quinta;
- próxima turma ou reprise;
- consentimento de uso dos dados para a inscrição.

### Etapa 2 — pagamento

Depois da validação dos dados, o próprio card muda de estado e mostra:

- participante;
- turma escolhida;
- contato;
- valor total de R$ 60;
- botão de pagamento Mercado Pago;
- opção de voltar e corrigir dados.

Ao clicar em pagar, o frontend chama `POST /api/create-preference` na Vercel e recebe uma URL oficial de Checkout Pro.

O backend cria `external_reference` no formato `DQP-...`, inclui os dados em `metadata`, fixa o valor em R$ 60 e encaminha o usuário ao Mercado Pago.

### Confirmação

A vaga não deve ser considerada confirmada porque o usuário voltou para o site. A fonte de verdade é o Mercado Pago.

O endpoint `api/payment-status.js` consulta o pagamento com o Access Token.

O webhook só registra como aprovado quando:

- `payment.status === approved`;
- `transaction_amount === 60`;
- `external_reference` começa com `DQP-`.

Depois disso, o backend envia os dados para a base do projeto via `REGISTRATION_WEBHOOK_URL`.

## 9. Infraestrutura e variáveis

Variáveis atualmente previstas na Vercel:

- `MERCADO_PAGO_ACCESS_TOKEN` — segredo, nunca versionar;
- `SITE_URL`;
- `PUBLIC_API_URL`;
- `ALLOWED_ORIGINS`;
- `REGISTRATION_WEBHOOK_URL`.

Nunca colocar em GitHub, HTML ou documentação pública:

- Access Token real;
- senha Mercado Pago;
- dados de cartão;
- senha bancária;
- credenciais privadas.

Dados bancários e chave Pix pessoal não fazem parte da arquitetura do site e não devem ser adicionados ao repositório.

## 10. Base de inscrições

Existe integração com Google Apps Script via `REGISTRATION_WEBHOOK_URL`.

Estado atual: o registro definitivo é disparado pelo webhook depois do pagamento aprovado. A etapa 1 ainda não persiste uma pré-inscrição `payment_pending` na base antes do redirecionamento. Isso está listado como prioridade no roadmap.

Campos mínimos recomendados para a base:

- registration_id;
- nome;
- email;
- whatsapp;
- turma/dia;
- interesse;
- payment_id;
- payment_status;
- valor;
- criado_em;
- pago_em;
- origem;
- UTM/referrer, quando disponível.

## 11. Decisões que não devem ser revertidas sem motivo

- Capital do Engano é a casa; Desejo que Pensa é uma rota/lab dentro dela.
- Não criar um segundo funil paralelo de mailing quando a intenção é inscrição paga.
- A inscrição deve levar naturalmente ao pagamento.
- O usuário deve conferir a turma antes de abrir o Mercado Pago.
- O valor atual é R$ 60 total.
- Pix e cartão são processados pelo Mercado Pago.
- O site não processa nem armazena dados de cartão.
- A confirmação depende de status real do Mercado Pago.
- Preservar a estética editorial/zine existente.
- Mudanças estruturais grandes devem ser feitas em branch/PR e validadas antes da produção quando houver risco.

## 12. Pendências técnicas conhecidas

1. Fazer teste end-to-end do checkout com ambiente de teste ou cobrança controlada.
2. Persistir pré-inscrição antes do redirecionamento para o Mercado Pago, com status `payment_pending`.
3. Tornar o registro idempotente/deduplicado por `payment_id` e/ou `registration_id`.
4. Implementar/verificar assinatura oficial do webhook (`x-signature`) como camada adicional de segurança.
5. Unificar a experiência de retorno: idealmente voltar para a própria seção de inscrição da home, ou definir `inscricao.html` explicitamente como página de confirmação.
6. Tratar estados `pending`, `rejected`, `cancelled`, `refunded` e pagamento expirado.
7. Criar confirmação operacional por e-mail/WhatsApp após aprovação.
8. Implementar limite de vagas por turma e fechamento automático quando lotada.
9. Adicionar analytics de conversão sem invadir privacidade.

## 13. Critério de qualidade para futuras alterações

Antes de publicar uma mudança, verificar:

- preserva a linguagem visual do site?
- melhora o fluxo sem duplicar função?
- continua legível no mobile?
- não expõe segredo?
- mantém a confirmação de pagamento no backend?
- evita promessas terapêuticas/comerciais exageradas?
- usa `@ogustavosouzapauli` quando houver handle público?
- não destrói conteúdo editorial para transformar a página em checkout genérico?

Se a resposta para qualquer ponto importante for “não”, corrigir antes do merge.