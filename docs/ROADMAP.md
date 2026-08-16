# Roadmap — Capital do Engano / Desejo que Pensa

Atualizado em 16/08/2026.

Este roadmap separa produto, operação e site. O objetivo é evitar que melhorias visuais avancem enquanto o fluxo de inscrição/pagamento ainda tiver lacunas operacionais.

## Estado atual resumido

### Concluído

- Capital do Engano consolidado como casa editorial do projeto.
- Desejo que Pensa integrado como laboratório/rota interna.
- Home v1.5 com identidade zine/editorial.
- Percurso dos 4 encontros publicado.
- CTA “Quero participar” levando para a seção de turmas.
- Seção de turmas transformada em fluxo de duas etapas.
- Coleta de nome, e-mail, WhatsApp, dia e tipo de inscrição.
- Resumo de escolha antes do pagamento.
- Valor operacional fixado em R$ 60.
- Mercado Pago Checkout Pro integrado por backend serverless.
- Vercel configurada e conectada ao GitHub.
- Endpoint de criação de preferência.
- Endpoint de consulta de status.
- Webhook que valida pagamento aprovado, valor e referência.
- Registro de pagamento aprovado encaminhado para a base via Google Apps Script.
- Segredos separados em Environment Variables.
- Deploy automático da `main` na Vercel funcionando.

### Em validação

- primeiro teste end-to-end real/controlado do pagamento;
- comportamento do retorno depois de Pix/cartão;
- gravação correta na base após `approved`;
- experiência mobile da nova etapa de pagamento.

---

# P0 — Fechar o circuito de inscrição

Prioridade máxima antes de divulgar pagamento em escala.

## P0.1 Pré-inscrição persistente

Hoje os dados da Etapa 1 seguem para a criação da preferência e ficam em `metadata`, mas a base só recebe o participante depois do pagamento aprovado.

Implementar:

`registration_created` → `payment_pending` → `approved` / `rejected` / `expired` / `cancelled`.

Objetivo: saber quem tentou se inscrever, mesmo quando abandonou o checkout, sem marcar vaga como confirmada.

## P0.2 Idempotência

A base deve impedir duplicidade caso o Mercado Pago reenvie o mesmo webhook.

Chaves preferenciais:

- `payment_id` único;
- `registration_id` único.

## P0.3 Segurança do webhook

Adicionar validação da assinatura/notificação oficial do Mercado Pago (`x-signature`) além da consulta atual da transação pela API.

A consulta direta do pagamento permanece como fonte de verdade.

## P0.4 Retorno unificado

Decidir uma única experiência pós-checkout.

Opção preferida:

Mercado Pago → `index.html?checkout=...#mailing` → seção Turmas muda para estado de confirmação.

Alternativa aceitável:

manter `inscricao.html` exclusivamente como página de confirmação, deixando claro que não é um segundo formulário concorrente.

Evitar manter dois fluxos independentes de inscrição.

## P0.5 Estados de pagamento

Tratar visualmente:

- approved;
- pending / in_process;
- rejected;
- cancelled;
- expired;
- refunded / charged_back quando aplicável.

Nenhum estado diferente de `approved` deve confirmar vaga.

## P0.6 Teste controlado

Executar teste com:

1. criação de preferência;
2. abertura do checkout;
3. pagamento/teste;
4. retorno ao site;
5. recebimento do webhook;
6. consulta de status;
7. registro na base;
8. prevenção de duplicidade.

Só depois marcar checkout como “produção validada”.

---

# P1 — Operação da turma

## P1.1 Base administrativa

Estruturar planilha/base com colunas:

- registration_id;
- nome;
- email;
- whatsapp;
- dia;
- tipo de turma;
- status da inscrição;
- payment_id;
- status do pagamento;
- valor;
- criado_em;
- pago_em;
- origem;
- UTM/referrer;
- confirmação enviada;
- observações.

Criar visão simples de:

- vagas confirmadas;
- pagamentos pendentes;
- tentativas abandonadas;
- turma terça;
- turma quinta;
- reprise.

## P1.2 Confirmação do participante

Após `approved`:

- página de confirmação clara;
- mensagem com dia/horário;
- instrução sobre onde receberá o link;
- política básica de ausência/cancelamento;
- contato de suporte.

Começar manualmente se necessário; automatizar só quando o fluxo estiver estável.

## P1.3 Limite de vagas

Definir capacidade real por turma.

Quando atingir o limite:

- bloquear pagamento daquela turma;
- oferecer outra data;
- permitir lista de espera separada da inscrição paga.

## P1.4 Informações operacionais

Centralizar no site:

- datas vigentes;
- horário;
- duração;
- valor;
- modalidade;
- o que está incluído;
- política de confirmação.

Evitar que informações antigas do MEGADOC vazem para a comunicação atual.

---

# P2 — Produto Desejo que Pensa

## P2.1 Consolidar versão 2026 do percurso

Criar documento canônico com os títulos atuais:

1. Cartografia da Couraça;
2. Máquinas de Desejar;
3. Narciso em Campo de Batalha;
4. Escrevivência do Afeto.

Mapear o conteúdo do MEGADOC histórico para essa versão sem perder bibliografia, exercícios e densidade.

## P2.2 Kit do participante

Padronizar:

- caderno pós-encontro;
- referências comentadas;
- filmes/livros/música/arte;
- exercícios de elaboração;
- aviso de que o Lab não é atendimento clínico.

## P2.3 Kit do facilitador

Manter:

- manuscrito/teleprompter;
- tempo por bloco;
- perguntas disparadoras;
- alternativas para turma acelerada/retraída;
- notas éticas e de enquadre.

## P2.4 Pós-Lab

Criar fechamento estruturado:

- avaliação curta;
- depoimento opcional com consentimento;
- interesse em próximos laboratórios;
- indicação de temas;
- convite para comunidade/canal pertinente sem transformar o Lab em funil agressivo.

---

# P3 — Site editorial

## P3.1 Separar inscrição de newsletter

Se houver newsletter/mailing editorial, ela deve voltar como função própria, fora do formulário de vaga paga.

Regra:

- “Quero receber textos/chamadas” = mailing.
- “Quero uma vaga na turma” = inscrição + pagamento.

Nunca misturar as duas intenções no mesmo botão principal.

## P3.2 Arquivo vivo

Evoluir a área editorial com:

- posts/categorias;
- páginas de referência;
- linhas temáticas;
- links reais do Instagram;
- indexação por tema.

## P3.3 SEO e compartilhamento

Revisar:

- title/description por rota;
- Open Graph;
- imagem de compartilhamento;
- canonical;
- sitemap quando houver mais páginas;
- metadata do Desejo que Pensa.

## P3.4 Acessibilidade

Checklist:

- contraste;
- foco visível;
- labels;
- navegação por teclado;
- reduced motion;
- alt text útil;
- mensagens de erro associadas aos campos;
- leitura mobile.

## P3.5 Performance

- otimizar assets pesados;
- WebP/AVIF quando fizer sentido;
- dimensões explícitas de imagem;
- lazy loading fora do hero;
- evitar fontes/JS redundantes.

---

# P4 — Métricas e crescimento

## P4.1 Métricas mínimas

Sem vigilância excessiva, acompanhar:

- visita à seção Turmas;
- início da Etapa 1;
- avanço para Etapa 2;
- abertura do Mercado Pago;
- pagamento aprovado;
- abandono;
- origem/UTM.

Funil:

`visita → inscrição iniciada → pagamento iniciado → approved → presença`.

## P4.2 Conteúdo → Lab

Manter a lógica editorial:

post → reconhecimento → aprofundamento → Lab.

Não transformar cada post em anúncio. O valor do Capital do Engano depende de continuar sendo um arquivo com vida própria.

## P4.3 Novas experiências

Só depois do Lab principal estar operacionalmente estável:

- encontros únicos temáticos;
- workshops;
- reprises;
- edições especiais;
- produtos de leitura/cadernos;
- possíveis ciclos avançados.

---

# P5 — Infraestrutura futura

Avaliar apenas quando houver demanda real:

- banco de dados dedicado em vez de planilha;
- painel administrativo;
- domínio próprio;
- e-mail transacional;
- automações de lembrete;
- controle de cupons/bolsas;
- checkout com produtos diferentes;
- gestão de reembolso/cancelamento.

Não antecipar complexidade. O sistema atual deve primeiro provar que consegue vender R$ 60, confirmar corretamente e organizar uma turma sem trabalho manual caótico.

---

# Próximas 5 ações recomendadas

1. Implementar pré-inscrição `payment_pending` antes de abrir o Mercado Pago.
2. Adicionar idempotência e assinatura do webhook.
3. Fazer teste end-to-end completo.
4. Unificar retorno do pagamento com a seção Turmas da home.
5. Estruturar a planilha/base administrativa para operação das turmas.

Essas cinco ações têm prioridade sobre novas animações, novas páginas ou expansão de conteúdo.