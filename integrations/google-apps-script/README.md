# Desejo que Pensa — automação de inscrições

Este diretório contém o backend do formulário do site.

## O que faz

- recebe `email`, `turma`, `interesse`, `consentiu` e `origem` via `POST`;
- grava na planilha `Desejo que Pensa — Inscrições e Mailing`;
- envia confirmação automática ao inscrito;
- envia aviso de nova inscrição para `gustavosouzapauli@gmail.com`;
- registra cada disparo na aba `Envios`;
- permite disparar emails por terça, quinta ou reprise;
- lê os links das aulas na aba `Configurações`.

## Planilha

ID: `10CRuPakyxUGpKs5AD9JTEmJPSwf2T9FEA-HTRMHFa6k`

## Deploy obrigatório no Google

1. Abra a planilha `Desejo que Pensa — Inscrições e Mailing`.
2. Vá em **Extensões → Apps Script**.
3. Apague o conteúdo padrão de `Code.gs` e cole o conteúdo deste `Code.gs`.
4. Salve.
5. Clique em **Implantar → Nova implantação → Aplicativo da Web**.
6. Executar como: **Você**.
7. Quem tem acesso: **Qualquer pessoa**.
8. Autorize o acesso à planilha e ao envio de email.
9. Copie a URL terminada em `/exec`.
10. Substitua no `index.html` o valor de `WAITLIST_URL` por essa URL.

## Aulas

Na aba `Configurações`, preencha `MEET_TERCA` e/ou `MEET_QUINTA`.

Com o script vinculado à planilha, o menu **Desejo que Pensa** aparece ao abrir a planilha. Ele oferece:

- Enviar aula — terça
- Enviar aula — quinta
- Enviar aviso de reprise

## Newsletter

Posts e ensaios devem ser enviados pelo Substack. Não usar o endpoint privado `/api/v1/free` como garantia de inscrição. O caminho suportado é o formulário de inscrição incorporado fornecido pelo Substack em **Settings → Growth features**.
