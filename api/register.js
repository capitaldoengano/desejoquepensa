function cors(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || 'https://capitaldoengano.github.io')
    .split(',')
    .map(value => value.trim());
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const signupUrl = process.env.REGISTRATION_WEBHOOK_URL;
  if (!signupUrl) return res.status(503).json({ ok: false, error: 'registration_not_configured' });

  const data = req.body || {};
  const payload = {
    nome: String(data.nome || '').trim().slice(0, 120),
    email: String(data.email || '').trim().toLowerCase().slice(0, 160),
    whatsapp: String(data.whatsapp || '').trim().slice(0, 40),
    instagram: String(data.instagram || '').trim().slice(0, 80),
    cidade: String(data.cidade || '').trim().slice(0, 100),
    turma: String(data.turma || '').trim().slice(0, 40),
    interesse: String(data.interesse || '').trim().slice(0, 40),
    consentiu: data.consentiu === true,
    origem: String(data.origem || 'capital-do-engano').trim().slice(0, 100)
  };

  if (!payload.nome || !payload.email.includes('@') || !payload.whatsapp || !payload.turma || !payload.interesse || !payload.consentiu) {
    return res.status(400).json({ ok: false, error: 'invalid_registration' });
  }

  try {
    const upstream = await fetch(signupUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000)
    });
    const text = await upstream.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error('invalid_registration_response');
    }

    if (!upstream.ok || result?.ok !== true) {
      return res.status(502).json({ ok: false, error: result?.error || 'registration_rejected' });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('Registration proxy failed:', error);
    return res.status(502).json({ ok: false, error: 'registration_unavailable' });
  }
}
