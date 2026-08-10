const SPREADSHEET_ID = '10CRuPakyxUGpKs5AD9JTEmJPSwf2T9FEA-HTRMHFa6k';
const ADMIN_EMAIL = 'gustavosouzapauli@gmail.com';
const SHEET_INSCRICOES = 'Inscrições';
const SHEET_ENVIOS = 'Envios';
const SHEET_CONFIG = 'Configurações';

function doGet() {
  return json_({
    ok: true,
    service: 'Desejo que Pensa',
    version: '1.4',
    spreadsheet: SPREADSHEET_ID
  });
}

function doPost(e) {
  try {
    const data = parsePayload_(e);
    const email = String(data.email || '').trim().toLowerCase();
    const turma = normalizeTurma_(data.turma);
    const interesse = normalizeInteresse_(data.interesse);
    const consentiu = data.consentiu === true || String(data.consentiu).toLowerCase() === 'true';
    const origem = String(data.origem || 'site').trim();

    if (!email || !email.includes('@')) return json_({ ok: false, error: 'email_invalido' });
    if (!turma) return json_({ ok: false, error: 'turma_invalida', recebido: data.turma || null });
    if (!interesse) return json_({ ok: false, error: 'interesse_invalido', recebido: data.interesse || null });
    if (!consentiu) return json_({ ok: false, error: 'consentimento_necessario' });

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_INSCRICOES);
    if (!sheet) throw new Error('A aba Inscrições não foi encontrada.');

    const now = new Date();
    sheet.appendRow([
      now,
      email,
      turma,
      interesse,
      'Sim',
      origem,
      'Interessado',
      'Pendente',
      '',
      ''
    ]);

    const row = sheet.getLastRow();
    try {
      sendConfirmation_(email, turma, interesse);
      sheet.getRange(row, 8).setValue('Enviada');
      sheet.getRange(row, 9).setValue(new Date());
      logEmail_(email, 'confirmação', 'Você entrou no Desejo que Pensa', 'Enviado', '');
    } catch (mailError) {
      sheet.getRange(row, 8).setValue('Erro');
      logEmail_(email, 'confirmação', 'Você entrou no Desejo que Pensa', 'Erro', String(mailError));
    }

    try { notifyAdmin_(email, turma, interesse); } catch (_) {}
    return json_({ ok: true, turma, interesse, recebido_em: now.toISOString() });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function parsePayload_(e) {
  if (!e) return {};

  // Formulário simples / URLSearchParams: caminho preferido para GitHub Pages.
  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  // Compatibilidade com versões antigas que enviavam JSON.
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (_) {
      const out = {};
      String(e.postData.contents).split('&').forEach(pair => {
        const parts = pair.split('=');
        if (!parts[0]) return;
        out[decodeURIComponent(parts[0])] = decodeURIComponent((parts.slice(1).join('=') || '').replace(/\+/g, ' '));
      });
      return out;
    }
  }
  return {};
}

function normalizeTurma_(value) {
  const v = String(value || '').trim().toLowerCase();
  if (['terca', 'terça', 'terça-feira', 'tuesday'].includes(v)) return 'terça';
  if (['quinta', 'quinta-feira', 'thursday'].includes(v)) return 'quinta';
  return '';
}

function normalizeInteresse_(value) {
  const v = String(value || '').trim().toLowerCase();
  if (['proxima turma', 'próxima turma', 'proxima', 'próxima'].includes(v)) return 'próxima turma';
  if (v === 'reprise') return 'reprise';
  return '';
}

function sendConfirmation_(email, turma, interesse) {
  const dia = turma === 'quinta' ? 'quinta-feira' : 'terça-feira';
  const interesseTexto = interesse === 'reprise' ? 'a reprise' : 'a próxima turma';
  const subject = 'Você entrou no Desejo que Pensa';
  const body = [
    'Recebi sua inscrição no Desejo que Pensa.',
    '',
    `Você marcou preferência por ${dia} e interesse em ${interesseTexto}.`,
    '',
    'Quando a turma correspondente estiver confirmada, você recebe por aqui o link do encontro e as informações necessárias.',
    '',
    'Sem coach, sem autoajuda e sem respostas prontas.',
    '',
    'Gustavo Souza Pauli',
    '@ogustavosouzapauli'
  ].join('\n');

  MailApp.sendEmail({ to: email, subject, body, name: 'Desejo que Pensa', replyTo: ADMIN_EMAIL });
}

function notifyAdmin_(email, turma, interesse) {
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: 'Nova inscrição — Desejo que Pensa',
    body: `Email: ${email}\nTurma: ${turma}\nInteresse: ${interesse}`,
    name: 'Desejo que Pensa — inscrições'
  });
}

function enviarAulaTerca() { enviarAulaPorTurma_('terça'); }
function enviarAulaQuinta() { enviarAulaPorTurma_('quinta'); }
function enviarReprise() { enviarSegmento_('reprise'); }

function enviarAulaPorTurma_(turma) {
  const config = getConfig_();
  const meet = turma === 'quinta' ? config.MEET_QUINTA : config.MEET_TERCA;
  if (!meet) throw new Error(`Preencha ${turma === 'quinta' ? 'MEET_QUINTA' : 'MEET_TERCA'} na aba Configurações.`);
  const dia = turma === 'quinta' ? 'quinta-feira' : 'terça-feira';
  const subject = `Desejo que Pensa — encontro de ${dia}`;
  const body = [`O encontro de ${dia} está confirmado.`, '', `Link: ${meet}`, '', 'Entre alguns minutos antes para testar áudio e câmera. Se não quiser abrir a câmera, tudo bem.', '', 'Até lá,', 'Gustavo Souza Pauli'].join('\n');
  sendSegment_(row => row.turma === turma, 'aula', subject, body);
}

function enviarSegmento_(interesse) {
  const subject = 'Desejo que Pensa — aviso de reprise';
  const body = ['A reprise do Desejo que Pensa está sendo organizada.', '', 'Você marcou interesse em receber esse aviso. Quando data e horário forem fechados, envio os detalhes por aqui.', '', 'Gustavo Souza Pauli'].join('\n');
  sendSegment_(row => row.interesse === interesse, 'reprise', subject, body);
}

function sendSegment_(predicate, type, subject, body) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_INSCRICOES);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;

  const seen = new Set();
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    const row = {
      email: String(r[1] || '').trim().toLowerCase(),
      turma: String(r[2] || '').trim().toLowerCase(),
      interesse: String(r[3] || '').trim().toLowerCase(),
      consentimento: String(r[4] || '').trim().toLowerCase()
    };
    if (!row.email || seen.has(row.email) || row.consentimento !== 'sim' || !predicate(row)) continue;
    try {
      MailApp.sendEmail({ to: row.email, subject, body, name: 'Desejo que Pensa', replyTo: ADMIN_EMAIL });
      sheet.getRange(i + 1, 9).setValue(new Date());
      logEmail_(row.email, type, subject, 'Enviado', '');
      seen.add(row.email);
    } catch (error) {
      logEmail_(row.email, type, subject, 'Erro', String(error));
    }
  }
}

function getConfig_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_CONFIG);
  const values = sheet.getDataRange().getValues();
  const out = {};
  for (let i = 1; i < values.length; i++) {
    const key = String(values[i][0] || '').trim();
    if (key) out[key] = values[i][1];
  }
  return out;
}

function logEmail_(email, type, subject, status, observation) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_ENVIOS);
  sheet.appendRow([new Date(), email, type, subject, status, observation || '']);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Desejo que Pensa')
    .addItem('Enviar aula — terça', 'enviarAulaTerca')
    .addItem('Enviar aula — quinta', 'enviarAulaQuinta')
    .addItem('Enviar aviso de reprise', 'enviarReprise')
    .addToUi();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
