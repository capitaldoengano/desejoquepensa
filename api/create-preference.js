const MP_API = 'https://api.mercadopago.com';
const PRICE = 60;

function cors(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || 'https://capitaldoengano.github.io').split(',').map(s => s.trim());
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) return res.status(503).json({ error: 'payment_not_configured' });

  const { name, email, whatsapp, turma } = req.body || {};
  if (!name || !email || !whatsapp) return res.status(400).json({ error: 'missing_fields' });
  const registrationId = `DQP-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const site = process.env.SITE_URL || 'https://capitaldoengano.github.io/desejoquepensa';
  const api = process.env.PUBLIC_API_URL || '';

  const preference = {
    items: [{ id: 'desejo-que-pensa', title: 'Desejo que Pensa — inscrição', quantity: 1, currency_id: 'BRL', unit_price: PRICE }],
    payer: { name: String(name).slice(0, 100), email: String(email).slice(0, 160) },
    external_reference: registrationId,
    metadata: { registration_id: registrationId, name, email, whatsapp, turma: turma || 'proxima turma' },
    back_urls: {
      success: `${site}/inscricao.html?checkout=success`,
      pending: `${site}/inscricao.html?checkout=pending`,
      failure: `${site}/inscricao.html?checkout=failure`
    },
    auto_return: 'approved',
    notification_url: api ? `${api}/api/webhook` : undefined,
    statement_descriptor: 'DESEJO QUE PENSA'
  };

  const r = await fetch(`${MP_API}/checkout/preferences`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(preference)
  });
  const data = await r.json();
  if (!r.ok) return res.status(502).json({ error: 'mercado_pago_error', details: data });
  return res.status(200).json({ registrationId, preferenceId: data.id, checkoutUrl: data.init_point });
}
